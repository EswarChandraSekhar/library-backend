const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/User')



exports.register = async (req,res)=>{
    try{
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let phoneNumber = req.body.phoneNumber;
        let email = req.body.email;
        let password = req.body.password; 

        let user_data = await User.findOne({email})
        if(user_data !== null){
            res.status(400).json({status: 'fail',message:'User email already exist!'})
            return;
        }
        let user_data1 = await User.findOne({phoneNumber})
        if(user_data1 !== null){
            res.status(400).json({status: 'fail',message:'User phonenumber already exist!'})
            return;
        }
        //validations done
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password,salt)
        
        let obj = await User.create({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword
        })
        if(obj){
            let token = jwt.sign({email: email},process.env.JWT_SECRET_CODE,{expiresIn: '7d'})
            res.status(201).json({
                status: 'success',
                message:'User created successfully!',
                token: token,
                username: firstName + ' ' + lastName,
                email: email,
                phoneNumber: phoneNumber
            })
        }
        else{
            res.status(500).json({
                status: 'fail',
                message: 'Something went wrong!'
            })
        }
    }
    catch(e){
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }
}

exports.login = async (req,res)=>{
    try{
        let email = req.body.email;
        let password  = req.body.password;
        let user_obj = await User.findOne({email})
        if(user_obj === null){
            res.status(400).json({
                status: 'fail',
                message:'User does not exist!'
            })
            return;
        }
        let matched = await bcrypt.compare(password, user_obj.password)
        if(matched){
            let token = jwt.sign({email},process.env.JWT_SECRET_CODE,{expiresIn:'7d'})
            res.status(200).json({
                status: 'success',
                message:'User verified successfully!',
                token: token,
                username: user_obj.firstName + ' ' + user_obj.lastName,
                email: email,
                phoneNumber: user_obj.phoneNumber
            })
        }
        else{
            res.status(400).json({
                status: 'fail',
                message:'email/password Incorrect!'
            })
        }
    }
    catch(e){
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong!'
        })
    }
}