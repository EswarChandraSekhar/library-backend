const express = require('express');
const { auth} = require('../middlewares/auth')
const router = express.Router();
const { getUserProfile } = require('../controllers/userProfileController');

router.get('/profile', auth, getUserProfile); // Example: /api/user/profile?email=abc@gmail.com

module.exports = router;
