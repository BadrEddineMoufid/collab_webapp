const express = require('express')
const morgan = require('morgan')
const app = express()

require('dotenv').config();

//import routes
const authRoute = require("./routes/auth")


const PORT = process.env.PORT || 6000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/',authRoute)



app.listen(PORT, ()=>console.log(`🚀 server up and running on PORT ${PORT}`));