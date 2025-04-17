const express = require('express');
const router = express.Router();
const quizMbtiController = require('../controllers/quizMbtiController'); // 确保路径正确

// 校验答案的 POST 路由
router.post('/validate-answers', quizMbtiController.validateAnswers);

// 获取所有问题的 GET 路由
router.get('/questions', quizMbtiController.getAllMBTIQuestions);

module.exports = router;