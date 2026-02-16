const pool = require("../config/database-sqlite");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Missing user info" });
    }
    
    const authorId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    let result;
    try {
      result = await pool.query(
        "INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)",
        [title, content, authorId]
      );
    } catch (err) {
      console.error("Database error (create post):", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({
      message: "Post created successfully",
      post: result && result.rows ? result.rows[0] : { title, content, author_id: authorId },
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

    let result;
    try {
      result = await pool.query(
        `SELECT p.*, u.username FROM posts p 
         JOIN users u ON p.author_id = u.id 
         ORDER BY p.created_at DESC 
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );
    } catch (err) {
      console.error("Database error (get all posts):", err);
      return res.status(500).json({ error: "Database error" });
    }

    let countResult;
    try {
      countResult = await pool.query("SELECT COUNT(*) as count FROM posts", []);
    } catch (err) {
      console.warn("Database error (count posts):", err);
    }
    
    const total = (countResult && countResult.rows && countResult.rows[0]) ? parseInt(countResult.rows[0].count) : 0;

    res.json({
      posts: (result && result.rows) ? result.rows : [],
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

    let result;
    try {
      result = await pool.query(
        `SELECT p.*, u.username FROM posts p 
         JOIN users u ON p.author_id = u.id 
         WHERE p.id = ?`,
        [id]
      );
    } catch (err) {
      console.error("Database error (get post by id):", err);
      return res.status(500).json({ error: "Database error" });
    }

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
