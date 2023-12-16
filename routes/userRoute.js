// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { protect  } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of protecting a route
router.get('/protected', protect, (req, res) => {
  res.json({ success: true, message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
