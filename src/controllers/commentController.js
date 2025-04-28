const pool = require('../config/db');
require('dotenv').config();

// 获取所有评论
exports.getAllComments = async (req, res) => {
  try {
    const query = `
      SELECT comment_id, article_id, comment_content, created_at
      FROM comments
      ORDER BY comment_id ASC;
    `;
    const { rows: comments } = await pool.query(query);

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve comments', error: err.message });
  }
};

// 新增一条评论
exports.addComment = async (req, res) => {
  try {
    const { article_id, comment_content } = req.body;

    const query = `
      INSERT INTO comments (article_id, comment_content, created_at)
      VALUES ($1, $2, NOW())
      RETURNING comment_id;
    `;
    const values = [article_id, comment_content];
    const { rows } = await pool.query(query, values);

    res.status(201).json({ message: 'Comment added successfully', comment_id: rows[0].comment_id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};
