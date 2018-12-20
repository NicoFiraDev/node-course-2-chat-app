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
    from: 'Nico',
    text: 'Can we meet up at 6?',
    createdAt: 123
  });

  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});



server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
