const http        = require('http'),
      express     = require('express'),
      socketIO    = require('socket.io'),
      path        = require('path'),
      publicPath  = path.join(__dirname, '../public'),
      port        = process.env.PORT || 3000,
      {generateMessage, generateLocationMessage} = require('./utils/message');


var app     = express(),
    server  = http.createServer(app),
    io      = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});



server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});





// socket.broadcast.emit('newMessage', {
//   from: message.from,
//   text: message.text,
//   createdAt: new Date().getTime()
// });
