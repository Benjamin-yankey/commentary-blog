const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

// Get comments for a post (Public)
router.get("/post/:postId", commentController.getCommentsByPostId);

// Create a comment (Protected)
router.post("/post/:postId", authMiddleware, commentController.createComment);

// Delete a comment (Protected)
router.delete("/:commentId", authMiddleware, commentController.deleteComment);

module.exports = router;
