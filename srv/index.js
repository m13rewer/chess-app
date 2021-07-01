const http = require('http');
const server = http.createServer();
const io = require("socket.io") (server, {
    
    cors: {
        origin: "https://main.dwta905zctald.amplifyapp.com",
        methods: ["GET", "POST"],
    }
        
});

const openGames = [];

let connectedUsers = [];

function matchMaking(auth, socketID) {
    if(openGames.length === 0 || (openGames.length > 0 && openGames[0].player2)) {
        const gameObj = 
            {
                player1: 
                    {
                        username: auth.username,
                        socketID: socketID,
                        color: 'white'
                    },
                player2: null,
                room: auth.username
            };

        openGames.unshift(gameObj);
        return gameObj;
    }

    if(openGames.length > 0 && !openGames[0].player2) {
        const matchObj = openGames[0];
        matchObj.player2 = 
            {
                username: auth.username,
                socketID: socketID,
                color: 'black'
            };

        openGames.shift();
            
        return matchObj;
    }
}

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
  });

io.on('connection', async (socket) => {
    console.log('a user connected');
    
    
    const auth = socket.handshake.auth;
    const socketID = socket.id;
    socket.userID = auth.username;
    console.log(auth);
    console.log(socket.userID);


    socket.onAny((event, ...args) => {
        console.log("onAny()");
        console.log(event, args);
    });

    socket.on("private message", ({ content, to, room }) => {
        console.log(to);
        console.log('private message');

        socket.to(room).to(to).emit("private message", {
          content,
          from: socket.id,
        });
    });

    if(auth !== undefined && !connectedUsers.includes(auth.username)) {
        console.log("auth");
        const match = matchMaking(auth, socketID);
        const player2 = match.player2;
        socket.matchObj = match;
        
        connectedUsers.unshift(auth.username);
        console.log(connectedUsers);
        console.log(match);
        socket.join(match.room);

        if(player2 === null) return;
        console.log(match.room)
        socket.join(match.room);

        io.to(match.room).emit("chat message", {
            content: match,
            from: player2.socketID
        });
    }

    socket.on('disconnect', (reason) => {
        console.log('disconnect');
        console.log(socket.matchObj);
        const room = socket.matchObj.room;
        connectedUsers = connectedUsers.filter(element => element !== socket.userID);
        console.log(connectedUsers);
        io.to(room).emit("end game");
        
    });

});

server.listen(3000, () => {
    console.log('listening on *:3000');
});