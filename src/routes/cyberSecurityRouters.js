const express = require('express');
const router = express.Router();
const cyberSecurityController = require('../controllers/cyberSecurityController'); 

router.get('/cycberData', cyberSecurityController.getCyberData);

module.exports = router;