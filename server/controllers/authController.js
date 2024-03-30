// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, msg: 'User already exists' });
    }

    // Check if username already exists
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ success: false, msg: 'Username taken' });
    }

    // Create new user
    user = new User({
      fullname,
      username,
      email,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.status(201).json({ success: true, msg: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials. User not found.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials. Password incorrect.' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        email: user.email, // Include other user information as needed
        // Add more user data here if required
      }
    };

    // Sign JWT token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error signing JWT token:', err);
        return res.status(500).json({ success: false, msg: 'Error signing token. Please try again later.' });
      }
      // Send response with token and user data
      res.json({ success: true, token, user: payload.user, msg: 'Login successful' });
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, msg: 'Server Error. Please try again later.' });
  }
};

const logoutUser = (req, res) => {
  try {
    // Clear the authentication token from the client's browser
    res.clearCookie('token');
    res.json({ success: true, msg: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ success: false, msg: 'Server Error. Please try again later.' });
  }
};

module.exports = { registerUser, loginUser, logoutUser };