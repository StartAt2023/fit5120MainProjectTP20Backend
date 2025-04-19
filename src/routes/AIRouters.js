const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/feedback', aiController.generateAIFeedback);

module.exports = router;
