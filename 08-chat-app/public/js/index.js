var socket = io();

socket.on('connect', function()  {
  alert('connected to server');

  socket.emit('createMessage', {
    from: 'Edgardo',
    text: 'Hola! :D'
  });
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});

socket.on('disconnect', function() {
  alert('disconnected from server');
});