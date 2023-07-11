const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);
const io = socketIO(server);  // Create socket using server instance

app.use(express.static('public'));
