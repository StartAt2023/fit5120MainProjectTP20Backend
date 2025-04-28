const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController'); // ✅ 改这里，controller要指向commentController.js

// 获取所有评论
router.get('/', commentController.getAllComments);

// 新增一条评论
router.post('/', commentController.addComment);

module.exports = router;
