// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config/');
const User = require('../models/userModel');

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  };
  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '30d' }); 
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  // Retrieve user profile based on the token
  const { user } = req;

  try {
    const userProfile = await User.findById(user.id);

    if (!userProfile) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, getUserProfile };
