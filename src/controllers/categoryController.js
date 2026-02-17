const pool = require("../config/database");

/**
 * Get all categories
 */
const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, icon_url, color FROM categories ORDER BY name ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllCategories
};
