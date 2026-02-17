const { Pool } = require("pg");
require("dotenv").config();

/**
 * PostgreSQL Data Source Configuration
 * Uses 'pg' Pool for efficient connection management.
 * Environment variables are used for production flexibility.
 */
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "commentary_blog",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

/**
 * Database Schema Initialization
 * Automatically creates necessary tables and sample data on startup.
 * Using SERIAL for PostgreSQL primary keys and ON CONFLICT for idempotency.
 */
const initDatabase = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(500),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create posts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        image_url VARCHAR(500),
        image_alt VARCHAR(200),
        status VARCHAR(20) DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        icon_url VARCHAR(500),
        color VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create post_categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS post_categories (
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, category_id)
      )
    `);

    // Insert sample categories if they don't exist
    await pool.query(`
      INSERT INTO categories (name, icon_url, color) 
      VALUES 
        ('Technology', 'https://api.iconify.design/mdi/laptop.svg', '#3B82F6'),
        ('Travel', 'https://api.iconify.design/mdi/airplane.svg', '#10B981'),
        ('Food', 'https://api.iconify.design/mdi/food.svg', '#F59E0B'),
        ('Lifestyle', 'https://api.iconify.design/mdi/home-heart.svg', '#EC4899'),
        ('Opinion', 'https://api.iconify.design/mdi/comment-text.svg', '#8B5CF6')
      ON CONFLICT (name) DO NOTHING
    `);

    console.log("Postgres Database initialized successfully with categories");
  } catch (err) {
    console.error("Database initialization error:", err);
  }
};

initDatabase();

module.exports = {
  query: (text, params) => pool.query(text, params)
};
