const express = require('express');
const router = express.Router();
const {admin}  = require('../middlewares/auth')
const matchController = require('../controllers/matchController');

router.get('/generate',admin, matchController.generateMatches);

module.exports = router;
