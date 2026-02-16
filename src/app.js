const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Routes will be added here
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
