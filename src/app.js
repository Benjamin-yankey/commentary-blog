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

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Serve static files from the React app in production
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

module.exports = app;
