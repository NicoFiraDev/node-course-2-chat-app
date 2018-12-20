const http      = require('http'),
      express   = require('express'),
      socketIO  = require('socket.io'),
      path = require('path'),
      publicPath = path.join(__dirname, '../public'),
      port = process.env.PORT || 3000;

var app     = express(),
    server  = http.createServer(app),
    io      = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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
