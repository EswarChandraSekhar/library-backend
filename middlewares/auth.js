const jwt  = require('jsonwebtoken')

exports.auth = async (req,res,next)=>{
    try{
        let token = req.headers('Authorization')?.split(' ')[1]
        if(token){
            let verified = jwt.verify(token,process.env.JWT_SECRET_CODE)
            req.user = verified;
            next()
        }
        else{
            res.status(403).json({status:'fail',message:'Access Denied!'})
            return;
        }
    }
    catch(e){
        res.status(400).json({status:'fail', message: 'Invalid Token' });
    }
}