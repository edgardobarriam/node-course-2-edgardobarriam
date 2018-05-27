var socket = io();

socket.on('connect', function()  {
  alert('connected to server');

});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});

socket.on('disconnect', function() {
  alert('disconnected from server');
});