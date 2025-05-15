const pool = require('../config/db'); 

exports.getCyberData = async (req, res) => {
  try {
    const query = `
      SELECT 
        attack_type,
        ROUND(SUM(data_compromised_GB), 2) AS total_data_compromised_GB
      FROM cybersecurity_data
      GROUP BY attack_type
      ORDER BY total_data_compromised_GB DESC;
    `;

    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve cybersecurity data summary', error: err.message });
  }
};
