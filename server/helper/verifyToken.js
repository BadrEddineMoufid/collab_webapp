const jwt = require('jsonwebtoken');

const TAG = "verifyToken middleware";

module.exports= (req, res, next)=>{
    //get user token from request headers
    
    const token = req.headers["authorization"]
    
    if (!token) {
        console.log(`⚠ ${TAG}: token not provided`);
        return res.status(401).json({error:"Access denied. No token provided."})
    
    }


    //verifiying token
    //split the array that contains the token, decoding token 
    try{
        const decoded = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_KEY);
        //passing the decoded data from token in request to next midlware
        req.decoded = decoded;
        
        //debug
        console.log(`✔ ${TAG} userId: ${decoded.userId}`);

        //go to next midlware
        next();

    }catch(err){
        console.log(`⚠ ${TAG} error: ${err.message}`);
        res.status(403).json({error:'Invalid Token'});
        
    }
}



