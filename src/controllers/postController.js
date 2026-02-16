const pool = require("../config/database");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const result = await pool.query(
      "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, authorId]
    );

    res.status(201).json({
      message: "Post created successfully",
      post: result.rows[0],
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
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query("SELECT COUNT(*) FROM posts");
    const total = parseInt(countResult.rows[0].count);

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
    res.status(500).json({ error: "Server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT p.*, u.username FROM posts p 
       JOIN users u ON p.author_id = u.id 
       WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createPost, getAllPosts, getPostById };
