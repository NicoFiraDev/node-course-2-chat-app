const http        = require('http'),
      express     = require('express'),
      socketIO    = require('socket.io'),
      path        = require('path'),
      publicPath  = path.join(__dirname, '../public'),
      port        = process.env.PORT || 3000,
{generateMessage} = require('./utils/message');

var app     = express(),
    server  = http.createServer(app),
    io      = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});



server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
