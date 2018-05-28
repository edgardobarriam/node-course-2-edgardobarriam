const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000

var app = express();
app.use(express.static(PUBLIC_PATH));

var server = http.createServer(app);

var io = socketIO(server);
io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage: ', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});