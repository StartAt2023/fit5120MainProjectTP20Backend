const express = require('express');
const router = express.Router();
const cyberSecurityController = require('../controllers/cyberSecurityController'); 

router.get('/comments', cyberSecurityController.getAllComments);

module.exports = router;