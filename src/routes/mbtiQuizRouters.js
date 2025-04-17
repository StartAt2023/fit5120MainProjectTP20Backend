const express = require('express');
const router = express.Router();
const quizMbtiController = require('../controllers/quizMbtiController'); 


router.post('/validate-answers', quizMbtiController.validateAnswers);


router.get('/questions', quizMbtiController.getAllMBTIQuestions);

module.exports = router;