const jwt = require("jsonwebtoken");

const generateToken = (userId, username) => {
  return jwt.sign(
    { id: userId, username },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;
