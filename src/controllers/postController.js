const pool = require("../config/database-sqlite");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const result = await pool.query(
      "INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)",
      [title, content, authorId]
    );

    res.status(201).json({
      message: "Post created successfully",
      post: result && result.rows ? result.rows[0] : null,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT p.*, u.username FROM posts p 
       JOIN users u ON p.author_id = u.id 
       ORDER BY p.created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const countResult = await pool.query("SELECT COUNT(*) as count FROM posts", []);
    const total = (countResult && countResult.rows && countResult.rows[0]) ? parseInt(countResult.rows[0].count) : 0;

    res.json({
      posts: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT p.*, u.username FROM posts p 
       JOIN users u ON p.author_id = u.id 
       WHERE p.id = ?`,
      [id]
    );

    if (!result || !result.rows || result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createPost, getAllPosts, getPostById };
