const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Token missing!" });
    }

    if (!req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token!" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};

module.exports = isAuth;
