const pool = require('../config/db'); // 引入 PostgreSQL 连接池

// Controller function to handle screen usage data submission
exports.submitScreenUsage = async (req, res) => {
  try {
    const data = req.body;

    // Validate if the request body is empty
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: 'Request body is empty or invalid' });
    }

    // Insert the screen usage data into the database
    const query = `
      INSERT INTO screen_usage (user_id, screen_time, activity, timestamp)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      data.user_id,
      data.screen_time,
      data.activity,
      data.timestamp || new Date() // Use current timestamp if not provided
    ];

    const { rows } = await pool.query(query, values);

    // Return a success response with the saved data
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      // Handle unique constraint violations (if applicable)
      return res.status(400).json({ message: 'Duplicate entry', error: err.detail });
    }

    // Log the error and return a 500 Internal Server Error response
    console.error('Error saving screen usage:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};