// Intended path: /backend/seed.js
// Run with: node seed.js  (make sure MONGO_URI is set / .env is loaded)
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Driftwood Wave Wall Art',
    shortDescription: 'Hand-carved wave sculpture made from reclaimed driftwood.',
    detailedDescription:
      'A statement piece carved to capture the curl of a Saint Helena Bay wave, finished with natural oils to protect the grain.',
    woodType: 'Reclaimed driftwood, sustainably sourced along the Western Cape coastline.',
    originStory:
      'Collected after winter storms along the bay, this piece began as washed-up driftwood before being shaped by hand in our studio.',
    careDetails: 'Dust with a soft cloth. Avoid direct sunlight and moisture. Re-oil yearly.',
    price: 650,
    images: ['/placeholder.jpg'],
    category: 'Woodcarving',
  },
  {
    name: 'Wildflower Serving Board',
    shortDescription: 'Zero-waste offcut serving board with a floral hand-burned motif.',
    detailedDescription:
      'Made from offcuts left over from larger projects, finished with a food-safe oil and a hand-burned wildflower design.',
    woodType: 'Camphor wood offcuts.',
    originStory: 'Part of our zero-waste policy - every offcut is repurposed rather than discarded.',
    careDetails: 'Hand wash only. Oil monthly with food-safe mineral oil.',
    price: 320,
    images: ['/placeholder.jpg'],
    category: 'Home Decor',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);

    console.log('Sample products inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
