const httpServer = require("http").createServer();
const io = require('socket.io')(httpServer, {
    cors: {
      origin: "http://localhost:3006/",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
        client.emit('timer', new Date());
      }, interval);
    });
  });

const port = 8000;
io.listen(port);
console.log('listening on port ', port);