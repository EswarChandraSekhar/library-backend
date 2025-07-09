const {body, validationResult} = require('express-validator')


exports.registerValidation = [
    body('username').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min:6})
]

exports.loginValidation = [
    body('email').isEmail(),
    body('password').exists()
]

exports.validate = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({error: errors.array()})
        return;
    }
    next();
}