const express = require('express');
const router = express.Router();
const cyberSecurityController = require('../controllers/studentFocusController'); 

router.get('/studentFocus', cyberSecurityController.getAllStudentData);

module.exports = router;