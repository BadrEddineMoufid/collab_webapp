const router = require('express').Router()
const bcrypt = require('bcryptjs')
const knex = require('../knex/knex')

const {loginValidation,registerValidation} = require('../helper/validation')
const {generateAccessToken} = require('../helper/generateTokens')



router.post('/login',  async (req, res) => {

    //validating user input 
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).json({error: "invalid email or password"})

    //getting values from req body
    const {email, password} = req.body

    try {
        //verifiying email and password
        //if returned array is empty then the user doesn't exist in dataBase
        const user = await knex("users").select('*').where('email',email)
        if(user.length === 0) return res.status(400).json({error: 'invalid email'})

        const validPassword = await bcrypt.compare(password, user[0].hash)
        if(!validPassword) return res.status(400).json({error: 'invalid password'})
        
        //debug
        //user.forEach(elm => console.log(elm))
        //console.dir for logging nested elem in arrays or JSON.stringify

        //token
        const accessToken = generateAccessToken({userId: user[0].id})
                    
        res.json({
            token:accessToken,
            user: {name: user[0].user_name, email: user[0].email}
        })
       

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'server error'})
    }


    


})





router.post('/register', async (req, res) => {

    //validating input with Joi
    const {error} = registerValidation(req.body);
    
    if (error) return res.status(400).json({error: error.message})
    

    //destructuring input from req.body
    const {email, password, name} = req.body;

    try {
        //checking if email exists
        const emailExist = await knex('users').select('*').where('email',email)
        if(emailExist.length !== 0) return res.status(403).json({error: 'email exists'})
        
        //generating salt and hashed password   
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //debug
        //console.log('hashed pasword: ' + hashedPassword)
        
        //save user to db
        const user = await knex('users').returning(['user_name', 'email', 'id']).insert({user_name:name, email, hash:hashedPassword})
        
        
        
        //token
        const accessToken = generateAccessToken({userId: user[0].id})
                    
        
        res.json({
            token: accessToken,
            user: {name: user[0].user_name, email: user[0].email}
        })
        

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'server error'})
    }
   
})


module.exports = router;