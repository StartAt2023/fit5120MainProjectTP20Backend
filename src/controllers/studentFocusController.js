const pool = require('../config/db');

// 获取所有评论
exports.getAllStudentData = async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM student_screen_focus_2025;
    `;
    const { rows: comments } = await pool.query(query);

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve SF', error: err.message });
  }
};