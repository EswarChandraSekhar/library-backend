const express = require('express')
const {register,login} = require('./../controllers/auth')
const jwt = require('jsonwebtoken')


const router = express.Router()


//register 
router.post('/register',register  )


//login
router.post('/login', login)

router.post('/verify-token', async (req, res) => {
   
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            valid: false,
            message: 'No token provided or format invalid'
        });
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
        return res.status(200).json({
            valid: true,
            user: decoded
        });
    } catch (error) {
        return res.status(401).json({
            valid: false,
            message: 'Invalid or expired token',
            error: error.message
        });
    }
})


module.exports = router;