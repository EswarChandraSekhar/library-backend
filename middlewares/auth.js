const User = require('./../models/User')
const jwt = require('jsonwebtoken')



exports.auth = async (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers['authorization']); // 🔍 Add this line

    let token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new Error("No token provided");

    let user_obj = jwt.verify(token, process.env.JWT_SECRET_CODE);
    req.user = user_obj;
    next();
  } catch (e) {
    console.error("Auth Error:", e.message); // 🔍 Log actual error
    res.status(400).json({
      status: 'fail',
      message: 'Invalid token!'
    });
  }
};


exports.admin = async (req,res,next)=>{
    try{
        let token = req.headers['authorization']?.split(' ')[1]
        let user_obj = jwt.verify(token,process.env.JWT_SECRET_CODE)
        if(user_obj.role === 'admin'){
            req.user = user_obj;
            next()
        }
        else{
          res.status(400).json({
            status:'fail',
            messgae:"Access Denied!"
            })   
        }
    }
    catch(e){
        res.status(400).json({
            status:'fail',
            messgae:"Invalid token!"
        })
    }
}