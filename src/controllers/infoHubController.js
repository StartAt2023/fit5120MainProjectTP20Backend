const pool = require('../config/db'); 

exports.getAllInfoHubData = async (req, res) => {
  try {
    const query = `
      SELECT id, comment, time
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

exports.giveInforHubComment = async (req, res) => {
  const { title, description, category, link } = req.body;
  try {
    const query = `
      INSERT INTO info_hub (id, comment, time)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const values = [title, description, category, link];
    const { rows } = await pool.query(query, values);

    res.status(201).json({ message: 'Comment added successfully', id: rows[0].id });
  } catch (err) {
    console.error('Error adding Info Hub comment:', err.message);
    res.status(500).json({ message: 'Failed to add Info Hub comment', error: err.message });
  }
}