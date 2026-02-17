const pool = require("../config/database");
const logger = require("../monitoring/logger");

// Helper function to get random image from LoremFlickr
const getRandomPostImage = (category = 'blog') => {
  return `https://loremflickr.com/800/600/${category}?random=${Math.random()}`;
};

// Helper function to generate avatar from DiceBear
const generateAvatar = (username) => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`;
};

// Create post with image
const createPost = async (req, res) => {
  try {
    const { title, content, category, image_url, image_alt } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Missing user info" });
    }
    
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    if (title.length < 5 || title.length > 200) {
      return res.status(400).json({ error: 'Title must be 5-200 characters' });
    }

    if (content.length < 50) {
      return res.status(400).json({ error: 'Content must be at least 50 characters' });
    }

    const finalImageUrl = image_url || getRandomPostImage(category || 'blog');
    const finalImageAlt = image_alt || `${title} - Blog Post Image`;
    const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');

    const result = await pool.query(
      "INSERT INTO posts (title, content, excerpt, author_id, image_url, image_alt, status) VALUES ($1, $2, $3, $4, $5, $6, 'published') RETURNING id",
      [title, content, excerpt, userId, finalImageUrl, finalImageAlt]
    );

    const postId = result.rows[0].id;
    logger.info('Post created', { postId, userId });

    res.status(201).json({
      message: 'Post created successfully',
      post: { id: postId, title, created_at: new Date() }
    });
  } catch (error) {
    logger.error('Create post error', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT 
        p.id, 
        p.title, 
        p.excerpt, 
        p.image_url,
        p.image_alt,
        p.created_at,
        u.username,
        u.avatar_url
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.status = 'published'
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query("SELECT COUNT(*) as count FROM posts WHERE status = 'published'");
    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    const posts = result.rows.map(post => ({
      ...post,
      avatar_url: post.avatar_url || generateAvatar(post.username)
    }));

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: totalCount,
        postsPerPage: limit
      }
    });
  } catch (error) {
    logger.error('Get posts error', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        p.*,
        u.username,
        u.avatar_url,
        u.bio
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.id = $1 AND p.status = 'published'`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = result.rows[0];
    post.avatar_url = post.avatar_url || generateAvatar(post.username);

    res.json({ post });
  } catch (error) {
    logger.error('Get post error', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getRandomPostImage,
  generateAvatar
};
