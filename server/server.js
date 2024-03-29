const express = require('express')
const http = require('http')
const morgan = require('morgan')
const cors = require('cors');
const socketio = require('socket.io')
const {userJoin,userLeave,getRoomUsers} = require('./helper/users')
const formatMessage = require('./helper/messages')
const { getRoomFiles } = require('./helper/room');
require('dotenv').config();

//import routes
const authRoute = require("./routes/auth")
const uploadRoute = require('./routes/upload');


//env stuff 
const PORT = process.env.PORT || 7000;
const botName = process.env.BOTNAME || 'SERVER';


//express, socket io stuff
const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors:{origin:'*'}
})


//midlwares, json, query, form parsers and logger
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//routes
app.use(cors());
app.use('/api/v1/',authRoute)
app.use('/api/v1/', uploadRoute)


const users = {};

const socketToRoom = {};


//DONE: setup socketio stuff 
//TODO: use diffrent namespace for chat and vidconf in socket connection 
io.on('connection', socket => {
  console.log(`🔗 WS ${socket.id} connected`)


	//video conf 
	socket.on("join VidConf", roomID => {
		console.log('joinned vidConf');

		if (users[roomID]) {
			const length = users[roomID].length;
			//temporary bs logic limit user to 4 
			if (length === 4) {
				socket.emit("room full");
				return;
			}
			users[roomID].push(socket.id);
		} else {
			users[roomID] = [socket.id];
		}
		socketToRoom[socket.id] = roomID;

		const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
		
		console.log(usersInThisRoom)

		socket.emit("all users", usersInThisRoom);
	});

	socket.on("sending signal", payload => {
			io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
	});

	socket.on("returning signal", payload => {
			io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
	});

	socket.on('disconnect', () => {
		console.log(`WS ${socket.id} disconnected from /vid-conf`);
		console.log(users);
		const roomID = socketToRoom[socket.id];
		let room = users[roomID];
		if (room) {
				room = room.filter(id => id !== socket.id);
				users[roomID] = room;
				const usersLeft = users[roomID]
				socket.emit("all users", usersLeft)
		}

		

	});


	/** Chat socket events  **/
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to COLLAB'));

    // Broadcast when a user connects
    socket.broadcast.to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    //DONE: send room files when user joins room 
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
      files: getRoomFiles(user.room)
    });


    
  });

  // Listen for chatMessage
  socket.on('chatMessage', data => {

    console.log("received data from client: ", data)
    let {username, text, roomname} = data;

    // get user and room the emit msg to user's room
    // const user = getCurrentUser(username);
    
    let out = formatMessage(username, text)
    console.log("emited data to room ", out)


    io.to(roomname).emit('message', out);
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    
		console.log(`🔌 WS ${socket.id} disconnected `)

		//maybe delete room files from mem when all users leave the room === check if all users left room before deleting hhh
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











