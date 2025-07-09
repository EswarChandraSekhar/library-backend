const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/User')

exports.login = async function(req,res){
    try{
        let {email,password} = req.body;
        let user = await User.findOne({email})
        if(user){
            let matched = await bcrypt.compare(password, user.password)
            if(matched){
                let token = jwt.sign({email:user.email},process.env.JWT_SECRET_CODE,{expiresIn:'7d'})
                res.status(200).json({
                    status: 'success',
                    message:'Login verified successfully!',
                    token
                })
            }
            else{
               res.status(400).json({
                    status:'fail',
                    message:"Username or Password are incorrect!"
                }) 
            }
        }
        else{
            res.status(400).json({
                status:'fail',
                message:"User does not exist"
            })
        }
    }
    catch(e){
         res.status(500).json({
            status:"fail",
            message:'Something went wrong!'
        })
    }
}

exports.register = async function(req,res){
    try{
        let {username,email,password } = req.body;
        let user = await User.findOne({email: email})
        if(user){
            res.status(400).json({
                status:'fail',
                message:'User already exist!'
            })
            return;
        }
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)
        let new_user = await User.create({username,email, password: hashedPassword})
        if(new_user){
            let token = jwt.sign({email},process.env.JWT_SECRET_CODE,{expiresIn:'7d'})
            res.status(201).json({
                status:'success',
                message:'User Registered Successfully!',
                token
            })
        }
        else{
             res.status(400).json({
                status:'fail',
                message:'Somethign went wrong!'
            })
            return;
        }
    }
    catch(e){
        res.status(500).json({
            status:"fail",
            message:'Something went wrong!'
        })
    }
}