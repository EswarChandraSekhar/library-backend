const {login,register} = require('./../controllers/auth')
const {auth} = require('./../middlewares/auth')
const {loginValidation,registerValidation,validate} = require('./../middlewares/validators')
const express = require('express')
const router = express.Router()


//login
router.post('/login', loginValidation,validate,login)

//register
router.post('/register', registerValidation,validate,register)

module.exports = router;
