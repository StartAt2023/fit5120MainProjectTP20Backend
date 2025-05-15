const pool = require('../config/db');

exports.getAllStudentData = async (req, res) => {
  try {
    const query = `
      SELECT
        CASE
          WHEN hours_of_screen_time < 3 THEN '0-3'
          WHEN hours_of_screen_time >= 3 AND hours_of_screen_time < 6 THEN '3-6'
          WHEN hours_of_screen_time >= 6 AND hours_of_screen_time < 9 THEN '6-9'
          ELSE '9+'
        END AS screen_bin,
        CASE
          WHEN hours_of_sleep < 5 THEN '<5'
          WHEN hours_of_sleep >= 5 AND hours_of_sleep < 6 THEN '5-6'
          WHEN hours_of_sleep >= 6 AND hours_of_sleep < 8 THEN '6-8'
          ELSE '8+'
        END AS sleep_bin,
        ROUND(AVG(focus_rating), 2) AS average_focus
      FROM student_screen_focus_2025
      GROUP BY screen_bin, sleep_bin
      ORDER BY screen_bin, sleep_bin;
    `;

    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve student focus heatmap data', error: err.message });
  }
};
