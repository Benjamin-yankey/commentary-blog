const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../../commentary_blog.db"),
  (err) => {
    if (err) {
      console.error("Database connection error:", err);
    } else {
      console.log("Connected to SQLite database");
      initDatabase();
    }
  }
);

function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(500),
        bio TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        status VARCHAR(20) DEFAULT 'published',
        image_url VARCHAR(500),
        image_alt VARCHAR(200),
        author_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) UNIQUE NOT NULL,
        icon_url VARCHAR(500),
        color VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS post_categories (
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, category_id)
      )
    `);

    // Insert sample categories
    const categories = [
      ['Technology', 'https://api.iconify.design/mdi/laptop.svg', '#3B82F6'],
      ['Travel', 'https://api.iconify.design/mdi/airplane.svg', '#10B981'],
      ['Food', 'https://api.iconify.design/mdi/food.svg', '#F59E0B'],
      ['Lifestyle', 'https://api.iconify.design/mdi/home-heart.svg', '#EC4899'],
      ['Opinion', 'https://api.iconify.design/mdi/comment-text.svg', '#8B5CF6']
    ];

    categories.forEach(cat => {
      db.run("INSERT OR IGNORE INTO categories (name, icon_url, color) VALUES (?, ?, ?)", cat);
    });
  });
}

const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (sql.trim().toUpperCase().startsWith("SELECT")) {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve({ rows });
      });
    } else {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ rows: [{ id: this.lastID }] });
      });
    }
  });
};

module.exports = { query };
