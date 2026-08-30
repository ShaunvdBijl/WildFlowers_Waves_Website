// Intended path: /backend/models/GalleryItem.js
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: ['Woodworking', 'Woodcarving', 'Home Decor', 'Accessories', 'Other'],
      default: 'Other',
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
