// Intended path: /backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'client'],
      default: 'client',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
