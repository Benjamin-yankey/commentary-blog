const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API Route handlers
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

/**
 * Production Static Content Handlers
 * Serves the React build folder and provides a catch-all route for SPA navigation (react-router).
 */
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

module.exports = app;
