const express = require('express');
const router = express.Router();
const cyberSecurityController = require('../controllers/cyberSecurityController'); // 引入对应的控制器

// 获取所有评论
router.get('/comments', cyberSecurityController.getAllComments);

module.exports = router;