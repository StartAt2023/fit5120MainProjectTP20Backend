const express = require('express');
const router = express.Router();
const cyberSecurityController = require('../controllers/cyberSecurityController'); 

router.get('/comments', cyberSecurityController.getCyberData);

module.exports = router;