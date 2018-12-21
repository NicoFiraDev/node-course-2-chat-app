var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a'),
      template = $('#message-template').html(),
      html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  // var formattedTime = moment(message.createdAt).format('h:mm a'),
  //     li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  // var li = $('<li></li>'),
  //     a  = $('<a target="_blank">My current location</a>');

  var formattedTime = moment(message.createdAt).format('h:mm a'),
      template      = $('#location-message-template').html(),
      html          = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
      });

    $('#messages').append(html);

  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
   e.preventDefault();

   var messageTextbox = $('[name=message]');

   socket.emit('createMessage', {
     from: 'User',
     text: messageTextbox.val()
   }, function(){
     messageTextbox.val('');
   });
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});

// andresdiazbuelvas@gmail.com

// Nombre completo, cc, celular y nivel de ingles y hv.
