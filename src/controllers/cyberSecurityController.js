const pool = require('../config/db'); // 引入 PostgreSQL 连接池

exports.getAllComments = async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM cybersecurity_data;
    `;
    const { rows: comments } = await pool.query(query);

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve comments', error: err.message });
  }
};