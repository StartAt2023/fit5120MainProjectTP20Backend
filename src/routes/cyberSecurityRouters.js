const express = require('express');
const router = express.Router();
const cyberSecurityController = require('../controllers/cyberSecurityController'); 

router.get('/cyberData', cyberSecurityController.getCyberData);

module.exports = router;