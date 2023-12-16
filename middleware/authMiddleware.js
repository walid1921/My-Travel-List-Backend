// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user ID to the request for future use in protected routes
      req.userId = decoded.userId;

      next(); // Move to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ success: false, message: 'No token provided' });
  }
});

// Middleware to generate a JWT after login
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

module.exports = { protect, generateToken };
