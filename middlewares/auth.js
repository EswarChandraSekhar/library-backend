const User = require('./../models/User')
const jwt = require('jsonwebtoken')



exports.auth = async (req,res,next)=>{
    try{
        let token = req.headers('Authorization')?.split(' ')[1]
        let valid = jwt.verify(token,process.env.JWT_SECRET_CODE)
        req.user = valid;
        next()
    }
    catch(e){
        res.status(400).json({
            status:'fail',
            messgae:"Invalid token!"
        })
    }
}