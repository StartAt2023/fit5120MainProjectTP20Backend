const express = require('express');
const router = express.Router();
const screenUsageController = require('../controllers/screenUsageController');

router.get('/stats', screenUsageController.getScreenUsageStats);

module.exports = router;
