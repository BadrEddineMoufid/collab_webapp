const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const app = express()
//env config
require('dotenv').config();

//import routes
const authRoute = require("./routes/auth")

//PORT 
const PORT = process.env.PORT || 6000;

//midlwares

app.use(morgan('dev'));
app.use(express.json());


//routes
app.use(cors()); 


app.use('/api/v1/',authRoute)



app.listen(PORT, ()=>console.log(`🚀 server up and running on PORT ${PORT}`));