const bcrypt = require("bcryptjs");
const pool = require("../config/database-sqlite");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if user exists
    let userExists;
    try {
      userExists = await pool.query(
        "SELECT * FROM users WHERE email = ? OR username = ?",
        [email, username],
      );
    } catch (err) {
      console.error("Database query error (check exists):", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (userExists && userExists.rows && userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user
    let result;
    try {
      result = await pool.query(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, passwordHash],
      );
    } catch (err) {
      console.error("Database query error (insert user):", err);
      return res.status(500).json({ error: "Database error" });
    }

    const userId = (result && result.rows && result.rows[0] && result.rows[0].id) || 1;
    const token = generateToken(userId, username);

    res.status(201).json({ 
      message: "User registered successfully",
      token,
      user: { id: userId, username }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let result;
    try {
      result = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
    } catch (err) {
      console.error("Database query error (login):", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!result || !result.rows || result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.username);

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
