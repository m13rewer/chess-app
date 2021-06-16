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
let i = 0;

app.get('/game', (req, res) => {
    console.log(req);
    if(openGames.length > 0) {
        openGames[0].player2 = "";
        openGames[0].black = "";
        return;
        
    }

    openGames[0] = 
        {
            player1: "",
            player2: null,
            white: "",
            black: null

        }
    
    //closedGames[i] = openGames[0];
    
    res.send(
        {
            gameIndex: i,
            player1: "",
            player2: ""

        });

    //i++;
});

function matchMaking(auth, socketID) {
    if(openGames.length === 0) {
        const gameObj = 
            {
                player1: 
                    {
                        username: auth.username,
                        socketID: socketID,
                        color: white
                    },
                player2: null
            };

        openGames.unshift(gameObj);
        return gameObj;
    }

    if(openGames.length > 0) {
        openGames[0].player2 = 
            {
                username: auth.username,
                socketID: socketID,
                color: black
            };
            
        return openGames[0];
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

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.userID);
    
    const auth = socket.handshake.auth;
    const socketID = socket.id;
    console.log(auth);

    if(auth !== undefined) {
        const match = matchMaking(auth, socketID);
        const player2 = match.player2;
        const player1 = match.player1;
        console.log(match);

        if(player2 === null) return;

        socket.join(player1.socketID);

        io.to(player1.socketID).emit("chat message", {
            content: match,
            from: socketID
        });

        // socket.to(player2.socketID).emit("chat message", {
        //     content: match,
        //     from: player1.socketID
        // });
        
    }

    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
          content: content,
          from: socket.id,
        });
      });
});

server.listen(3000, '127.0.0.1',() => {
    console.log('listening on *:3000');
});
