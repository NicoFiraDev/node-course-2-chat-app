const http        = require('http'),
      express     = require('express'),
      socketIO    = require('socket.io'),
      path        = require('path'),
      publicPath  = path.join(__dirname, '../public'),
      port        = process.env.PORT || 3000,
      {generateMessage, generateLocationMessage} = require('./utils/message'),
      {isRealString} = require('./utils/validation'),
      {Users}     = require('./utils/users');


var app     = express(),
    server  = http.createServer(app),
    io      = socketIO(server),
    users   = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }

  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
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
