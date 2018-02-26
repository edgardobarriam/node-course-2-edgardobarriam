const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server =http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket emit from admin text welcome
  socket.on('newUserJoin', (message) => {
    socket.emit('welcomeUser', {
      text: 'Welcome new user'
    });
    socket.broadcast.emit('createUserNotification', {
      text: 'A new user joined!'
    });
  });
  // socket broadcast from admin  new user joined
  socket.on('createMessage', (message) => {
    console.log('create message ', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

  /*   socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    }); */
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

server.listen(port,() => {
  console.log(`Server started on port ${port}`);
})