import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3006');

function subscribeToGameLiftServer(cb) {
    socket.on('message', msg => cb(null, msg));
    socket.emit('subscribeToGameLiftServer', 1000);
} 
export { subscribeToGameLiftServer }