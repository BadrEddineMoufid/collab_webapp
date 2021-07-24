const jwt = require('jsonwebtoken');

const generateAccessToken = (userId)=>{
    //console.log(userId);
    return jwt.sign(userId, process.env.ACCESS_TOKEN_KEY,{expiresIn: process.env.ACCESS_TOKEN_EXP_TIME.toString()});
}



module.exports.generateAccessToken = generateAccessToken;
