const pool = require("../config/database");
const logger = require("../monitoring/logger"); // Assuming generic logger exists, or console.log usage

// Get all comments for a post
const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await pool.query(
      `SELECT 
        c.id, 
        c.content, 
        c.created_at, 
        u.username, 
        u.avatar_url 
       FROM comments c
       JOIN users u ON c.author_id = u.id
       WHERE c.post_id = $1
       ORDER BY c.created_at ASC`,
      [postId]
    );

    // Helper to generate avatar if missing
    const comments = result.rows.map(comment => ({
          ...comment,
          avatar_url: comment.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(comment.username)}`
        }));

    res.json(comments);
  } catch (error) {
    console.error("Get comments error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const authorId = req.user.id; // User from auth middleware

    if (!content || content.trim() === "") {
        return res.status(400).json({ error: "Comment content is required" });
    }

    const result = await pool.query(
      `INSERT INTO comments (content, post_id, author_id)
       VALUES ($1, $2, $3)
       RETURNING id, content, created_at`,
      [content, postId, authorId]
    );

    const newComment = result.rows[0];
    
    // Fetch author details to return complete object
    const authorResult = await pool.query(
        "SELECT username, avatar_url FROM users WHERE id = $1", 
        [authorId]
    );
    const author = authorResult.rows[0];

    res.status(201).json({
      ...newComment,
      username: author.username,
      avatar_url: author.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(author.username)}`
    });

  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    // Check if comment exists and belongs to user
    const check = await pool.query("SELECT author_id FROM comments WHERE id = $1", [commentId]);
    
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    
    if (check.rows[0].author_id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Delete comment
    await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getCommentsByPostId,
  createComment,
  deleteComment
};
