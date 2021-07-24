const Joi = require('@hapi/joi');

//register validation
const registerValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
            .messages({"string.pattern.base":"password must have 8-30 char and numbers"}),
        name: Joi.string().min(6).max(40).required()

    })

    return schema.validate(data);
}

//login validation template
const loginValidation = data => {
   
    const schema = Joi.object( {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required()
    })

    return schema.validate(data);
   
}

const passwordValidation = data =>{
    const schema = Joi.object({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required().messages({"string.pattern.base":"password must have 8-30 char and numbers"})
    })

    return schema.validate(data)
}

//recipe validation
const recipeValidation = data =>{
    const schema = Joi.object({
        recipe_id: Joi.number().required(),
        recipe_title: Joi.string().required(),
        recipe_image_url: Joi.string().uri().required()
    })

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.recipeValidation = recipeValidation;
module.exports.passwordValidation = passwordValidation;