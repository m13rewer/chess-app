const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io") (server, {
    
    cors: {
        origin: "http://localhost:3006",
        methods: ["GET", "POST"],
    }
        
});

const openGames = [];
const closedGames = [];
let connectedUsers = [];
// let i = 0;

// app.get('/game', (req, res) => {
//     console.log(req);
//     if(openGames.length > 0) {
//         openGames[0].player2 = "";
//         openGames[0].black = "";
//         return;
        
//     }

//     openGames[0] = 
//         {
//             player1: "",
//             player2: null,
//             white: "",
//             black: null

//         }
    
//     res.send(
//         {
//             gameIndex: i,
//             player1: "",
//             player2: ""

//         });
// });

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

function startGame(socketID1, socketID2) {
    //socket.
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
        //const player1 = match.player1;
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

server.listen(3000, '127.0.0.1',() => {
    console.log('listening on *:3000');
});