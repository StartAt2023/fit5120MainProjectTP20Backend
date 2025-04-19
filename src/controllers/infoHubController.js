const pool = require('../config/db'); 

exports.getAllInfoHubData = async (req, res) => {
  try {
    const query = `
      SELECT id, title, description, category, link
      FROM info_hub
      ORDER BY id ASC;
    `;
    const { rows: infoHubData } = await pool.query(query);

    res.status(200).json(infoHubData);
  } catch (err) {
    console.error('Error retrieving Info Hub data:', err.message);
    res.status(500).json({ message: 'Failed to retrieve Info Hub data', error: err.message });
  }
};