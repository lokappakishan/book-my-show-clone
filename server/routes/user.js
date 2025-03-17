const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const User = require('../models/user');

userRouter.post('/register', async (req, res) => {
  try {
    // Extract
    const { name, email, password, role, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash password
    const saltRounds = 10;
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (hashError) {
      return res.status(500).json({
        success: false,
        message: 'Error while hashing password',
      });
    }

    // Create user with defaults
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      isAdmin: isAdmin ?? false,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    //Extract the req details
    const { email, password } = req.body;

    //Fetch the user details
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User not found , register',
      });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Wrong password try again',
      });
    }

    res.status(200).json({ success: true, message: 'Logged in Successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error trying to login',
    });
  }
});

module.exports = userRouter;
