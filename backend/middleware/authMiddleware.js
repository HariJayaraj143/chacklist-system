const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token and authenticate users.
 */
const authMiddleware = (req, res, next) => {
  try {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }


    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = { id: decoded.id };

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
