const jwt = require("jsonwebtoken");

/**
 * JWT Authentication Middleware
 * Intercepts requests to protected routes and verifies the Bearer token.
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token", message: error.message });
  }
};

module.exports = authMiddleware;
