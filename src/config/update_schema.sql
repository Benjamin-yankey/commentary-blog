-- Add image_url column to posts table
ALTER TABLE posts ADD COLUMN image_url VARCHAR(500);
ALTER TABLE posts ADD COLUMN image_alt VARCHAR(200);
ALTER TABLE posts ADD COLUMN excerpt TEXT;
ALTER TABLE posts ADD COLUMN status VARCHAR(20) DEFAULT 'published';

-- Add avatar_url to users table
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500);
ALTER TABLE users ADD COLUMN bio TEXT;

-- Add categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL,
  icon_url VARCHAR(500),
  color VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add post_categories junction table
CREATE TABLE IF NOT EXISTS post_categories (
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Insert sample categories
INSERT OR IGNORE INTO categories (name, icon_url, color) VALUES
  ('Technology', 'https://api.iconify.design/mdi/laptop.svg', '#3B82F6'),
  ('Travel', 'https://api.iconify.design/mdi/airplane.svg', '#10B981'),
  ('Food', 'https://api.iconify.design/mdi/food.svg', '#F59E0B'),
  ('Lifestyle', 'https://api.iconify.design/mdi/home-heart.svg', '#EC4899'),
  ('Opinion', 'https://api.iconify.design/mdi/comment-text.svg', '#8B5CF6');
