// Intended path: /backend/routes/gallery.js
const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');

// @desc    Get all public gallery items (supports optional ?category= filter)
// @route   GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const items = await GalleryItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching gallery items', error: error.message });
  }
});

module.exports = router;
