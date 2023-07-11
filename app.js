const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);
const io = socketIO(server);  // Create socket using server instance

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('messageFromServer', {data: 'Welcome to the socketio server'});
    socket.emit('message',{text: 'Welcome to the chat app'});
    

});