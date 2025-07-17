const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/generate', matchController.generateMatches);

module.exports = router;
