const express = require('express');
const socketIO = require('socket.io');
const natural = require('natural');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.emit('message', { text: 'Connected' });

  socket.on('message', (message) => {
    const response = generateResponse(message.text);
    socket.emit('message', { text: response });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

function generateResponse(message) {
  // Tokenize the input message
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(message);

  // Add your chatbot logic here using NLP
  // This is a simple example that checks for specific keywords
  if (tokens.includes('hi') || tokens.includes('hello')) {
    return 'Hello there!';
  } else if (tokens.includes('bye')) {
    return 'Goodbye!';
  } else {
    return ('I\'m sorry, I didn\'t understand.');
  }
}
