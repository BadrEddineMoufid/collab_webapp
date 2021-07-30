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
const io = socketio(server)

//import routes
const authRoute = require("./routes/auth")

//midlwares

app.use(morgan('dev'));
app.use(express.json());


//routes
app.use(cors());
app.use('/api/v1/',authRoute)


//TODO: setup socketio stuff 


io.on('connection', socket =>{
    console.log('new ws connection')
})



server.listen(PORT, ()=>console.log(`🚀 server up and running on PORT ${PORT}`));