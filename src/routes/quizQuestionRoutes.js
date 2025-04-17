const express = require('express');
const router = express.Router();
const quizQuestionController = require('../controllers/quizQuestionController');

router.get('/questions', quizQuestionController.getAllQuizQuestions);

router.post('/validate-answers', quizQuestionController.validateQuizAnswers);

module.exports = router;