// Intended path: /backend/models/Product.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    detailedDescription: {
      type: String,
      required: true,
    },
    woodType: {
      type: String,
      required: true,
    },
    originStory: {
      type: String,
      required: true,
    },
    careDetails: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String], // URLs / paths to product images
      default: [],
    },
    category: {
      type: String,
      enum: ['Woodworking', 'Woodcarving', 'Home Decor', 'Accessories', 'Other'],
      default: 'Other',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-generate a URL friendly slug from the product name before saving
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
