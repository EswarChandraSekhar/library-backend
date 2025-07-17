const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userProfileController');

router.get('/profile', getUserProfile); // Example: /api/user/profile?email=abc@gmail.com

module.exports = router;
