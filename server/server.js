const express = require('express')
const http = require('http')
const morgan = require('morgan')
const cors = require('cors');
const socketio = require('socket.io')

//env config
require('dotenv').config();

//PORT 
const PORT = process.env.PORT || 6000;

//express stuff
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


io.on('connection', socket =>{
    console.log('new ws connection')

    socket.on('chatMessage', payload =>{
        
        console.log("Message received server side: ", payload)
        
        io.emit('message', payload)
    })
})



server.listen(PORT, ()=>console.log(`🚀 server up and running on PORT ${PORT}`));