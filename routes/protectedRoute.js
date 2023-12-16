
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/protected', protect, (req, res) => {
  res.json({ success: true, data: 'Protected route data' });
});

module.exports = router;
