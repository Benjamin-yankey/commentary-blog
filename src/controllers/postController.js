const pool = require("../config/database-sqlite");
const logger = require("../monitoring/logger");

// Helper function to get random Unsplash image
const getRandomPostImage = (category = 'blog') => {
  return `https://source.unsplash.com/800x600/?${category}`;
};

// Helper function to generate avatar
const generateAvatar = (username) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&size=200`;
};

// Create post with image
const createPost = async (req, res) => {
  try {
    const { title, content, category, image_url, image_alt } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Missing user info" });
    }
    
    const userId = req.user.id;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    if (title.length < 5 || title.length > 200) {
      return res.status(400).json({ error: 'Title must be 5-200 characters' });
    }

    if (content.length < 50) {
      return res.status(400).json({ error: 'Content must be at least 50 characters' });
    }

    // If no image provided, generate one based on category
    const finalImageUrl = image_url || getRandomPostImage(category || 'blog');
    const finalImageAlt = image_alt || `${title} - Blog Post Image`;

    // Generate excerpt (first 150 characters)
    const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');

    let result;
    try {
      result = await pool.query(
        "INSERT INTO posts (title, content, excerpt, author_id, image_url, image_alt, status) VALUES (?, ?, ?, ?, ?, ?, 'published')",
        [title, content, excerpt, userId, finalImageUrl, finalImageAlt]
      );
    } catch (err) {
      logger.error('Create post database error', err);
      return res.status(500).json({ error: "Database error" });
    }

    const postId = result && result.rows && result.rows[0] ? result.rows[0].id : null;
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

// Get all posts with images and author info
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let result;
    try {
      result = await pool.query(
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
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );
    } catch (err) {
      logger.error('Get posts database error', err);
      return res.status(500).json({ error: "Database error" });
    }

    let countResult;
    try {
      countResult = await pool.query("SELECT COUNT(*) as count FROM posts WHERE status = 'published'", []);
    } catch (err) {
      logger.warn('Count posts database error', err);
    }
    
    const totalCount = (countResult && countResult.rows && countResult.rows[0]) ? parseInt(countResult.rows[0].count) : 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Ensure all users have avatars
    const posts = (result && result.rows ? result.rows : []).map(post => ({
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

// Get single post with full details
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    let result;
    try {
      result = await pool.query(
        `SELECT 
          p.*,
          u.username,
          u.avatar_url,
          u.bio
         FROM posts p
         JOIN users u ON p.author_id = u.id
         WHERE p.id = ? AND p.status = 'published'`,
        [id]
      );
    } catch (err) {
      logger.error('Get post by ID database error', err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!result || !result.rows || result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = result.rows[0];
    
    // Ensure avatar exists
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
