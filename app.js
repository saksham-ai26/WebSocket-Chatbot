const express = require('express');
const socketIO = require('socket.io');
const natural = require('natural');
const classifier = new natural.BayesClassifier();

classifier.addDocument('Hello','greeting');
classifier.addDocument('what is your name?','name_inquiry');
classifier.addDocument('I am fine.','response_inquiry');
classifier.addDocument('What are you doing?','status');
classifier.addDocument('Goodbye','leave');
classifier.addDocument('hehe','default');
classifier.addDocument('something garbage','default');
classifier.addDocument('dummy message','default');
classifier.addDocument('message','default');



classifier.train();


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
    const classification = classifier.classify(message)
 switch(classification){
    case 'greeting':
        return 'Hello how can I assist you?';

    case 'response_inquiry':
        return 'That\'s good to know, anything else I can help you with?'; 
    
    case 'status':
        return 'Nothing much, just talking to you';

    case 'name_inquiry':
        return 'My name is Saksham\'s Chatbot.How are you?'
      
    case 'leave':
        return 'Goodbye, have a nice day!'
    
    case 'default':
        return 'Hey I am sorry as I can\'t yet process this message as I am still in the learning phase.'
 }
}
