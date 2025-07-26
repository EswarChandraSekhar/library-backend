const express = require('express');
const router = express.Router();
const {admin}  = require('../middlewares/auth')
const matchController = require('../controllers/matchController');

router.get('/generate',admin, matchController.generateMatches);

router.post('/confirm-match',admin, matchController.confirmMatch);

router.get('/overview', matchController.getOverview);

module.exports = router;
