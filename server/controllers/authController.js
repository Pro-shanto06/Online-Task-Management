const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
  
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, msg: 'User already exists' });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ success: false, msg: 'Username taken' });
    }

   
    user = new User({
      fullname,
      username,
      email,
      password
    });

  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ success: true, msg: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials. Password incorrect.' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error signing JWT token:', err);
        return res.status(500).json({ success: false, msg: 'Error signing token. Please try again later.' });
      }
      res.json({ success: true, token, user: payload.user, msg: 'Login successful' });
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, msg: 'Server Error. Please try again later.' });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ success: true, msg: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ success: false, msg: 'Server Error. Please try again later.' });
  }
};

module.exports = { registerUser, loginUser, logoutUser };