const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PUBLIC_PATH = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000

var app = express();
app.use(express.static(PUBLIC_PATH));

var server = http.createServer(app);

var io = socketIO(server);
io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat App',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has connected!',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);
    socket.broadcast.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});