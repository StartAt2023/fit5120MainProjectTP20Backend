const express = require('express');
const router = express.Router();
const { submitScreenUsage } = require('../controllers/screenUsageController');

// Route to handle screen usage data submission
// POST /api/usage
router.post('/', submitScreenUsage);

// Export the router to be used in other parts of the application
module.exports = router;