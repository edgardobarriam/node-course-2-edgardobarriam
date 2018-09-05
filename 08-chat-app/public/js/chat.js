var socket = io();

function autoScrollChat() {
  // Selectors
  var messages = $('#messages');
  var newMessage  = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function()  {
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function(error) {
    if (error) {
      alert(error);
      window.location.href = '/'
    } else {
      console.log('No error');
    }
  });
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  autoScrollChat();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  autoScrollChat();
});

socket.on('updateUserList', function(users) {
 var ol = $('<ol></ol>');

 users.forEach(function(user) {
   ol.append($('<li></li>').text(user));
 });

 $('#users').html(ol);
});


socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function() {
    // Callback
    messageTextBox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition( function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send location');
  });
});