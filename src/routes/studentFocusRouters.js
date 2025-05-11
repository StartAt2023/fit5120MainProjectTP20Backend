const express = require('express');
const router = express.Router();
const cyberSecurityController = require('../controllers/studentFocusController'); 

router.get('/time', cyberSecurityController.getAllComments);

module.exports = router;