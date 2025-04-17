const express = require('express');
const router = express.Router();
const quizQuestionController = require('../controllers/quizQuestionController');

// 获取所有问题
router.get('/questions', quizQuestionController.getAllQuizQuestions);

// 校验答案
router.post('/validate-answers', quizQuestionController.validateQuizAnswers);

module.exports = router;