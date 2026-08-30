// Intended path: /backend/routes/adminGallery.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const GalleryItem = require('../models/GalleryItem');

// @route   POST /api/admin/gallery
// @desc    Save a new gallery item. Expects imageUrl already hosted (e.g. uploaded
//          to Firebase Storage / S3 client-side) - this endpoint stores the metadata.
// @access  Private (admin only)
router.post('/gallery', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { title, imageUrl, description, category } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ message: 'title and imageUrl are required.' });
    }

    const item = await GalleryItem.create({ title, imageUrl, description, category });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: 'Error saving gallery item', error: error.message });
  }
});

// @route   GET /api/admin/gallery
// @desc    List all gallery items (admin view, includes management metadata)
// @access  Private (admin only)
router.get('/gallery', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery items', error: error.message });
  }
});

// @route   DELETE /api/admin/gallery/:id
// @desc    Remove a gallery item
// @access  Private (admin only)
router.delete('/gallery/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const deleted = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Gallery item not found' });
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery item', error: error.message });
  }
});

module.exports = router;
