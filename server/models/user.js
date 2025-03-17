const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'is required'],
    trim: true,
    minLength: [3, 'Name must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  role: {
    type: String,
    required: [true, 'is required'],
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
