const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler'); 
const { generateToken } = require('../middleware/authMiddleware');


//! Register a user
const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password } = req.body;

  // Check if the user with the given email already exists
  const existingUser = await User.findOne({ email });

  
  if (existingUser) {
    res.status(400).json({ success: false, message: 'User with this email already exists' });
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Sign a JWT and send it in the response
  const token = generateToken(newUser._id);

  res.status(201).json({ success: true, token });
});


//! Login a user
const loginUser = asyncHandler(async (req, res) => {
  const {email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  const userName = user.username


  if (!user) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
    return;
  }

  // Check if the provided password matches the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
    return;
  }

  // Sign a JWT and send it in the response
  const token = generateToken(user._id);

  res.status(200).json({ success: true, token, userName });
});

module.exports = { registerUser, loginUser };

