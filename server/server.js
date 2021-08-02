const express = require('express')
const http = require('http')
const morgan = require('morgan')
const cors = require('cors');
const socketio = require('socket.io')
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./helper/users')
const formatMessage = require('./helper/messages')

//env config
require('dotenv').config();

//PORT 
const PORT = process.env.PORT || 7000;
const botName = process.env.BOTNAME || 'server';

//express, socket io stuff
const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors:{origin:'*'}
})

//import routes
const authRoute = require("./routes/auth")

//midlwares
app.use(morgan('dev'));
app.use(express.json());


//routes
app.use(cors());
app.use('/api/v1/',authRoute)


//DONE: setup socketio stuff 


// Run when client connects
io.on('connection', socket => {
    console.log('new WS connection')


    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
  
      socket.join(user.room);
  
      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to COLLAB'));
  
      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage(botName, `${user.username} has joined the chat`)
        );
  
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    });
  
    // Listen for chatMessage
    socket.on('chatMessage', msg => {

        console.log(msg)
        //determin user using socket id and get current user the emit msg to user's room
        const user = getCurrentUser(socket.id);
       
        let out = formatMessage(user.username, msg)
        console.log(out)


        io.to(user.room).emit('message', out);
    });
  
    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
  
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        );
  
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      }
    });
  });



server.listen(PORT, ()=>console.log(`🚀 server up and running on PORT ${PORT}`));











