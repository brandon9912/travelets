const jwt = require("jsonwebtoken");

// Token lifetime in seconds
const TOKEN_EXPIRE = parseInt(process.env.TOKEN_EXPIRE, 10) || 3600;

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: TOKEN_EXPIRE });

module.exports = { signToken, TOKEN_EXPIRE };
