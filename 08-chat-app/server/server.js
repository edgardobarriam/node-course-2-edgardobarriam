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

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});