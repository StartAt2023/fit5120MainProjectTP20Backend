const express = require('express');
const router = express.Router();
const infoHubController = require('../controllers/infoHubController'); 


router.post('/give-comment', infoHubController.giveInforHubComment);


router.get('/comment-list', infoHubController.getAllInfoHubData);

module.exports = router;