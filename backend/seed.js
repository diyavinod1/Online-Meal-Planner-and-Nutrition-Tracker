require('dotenv').config();
const mongoose = require('mongoose');
const Food = require('./models/Food');
const foodData = require('./data/foodData');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
    await Food.deleteMany({ isCustom: false });
    await Food.insertMany(foodData.map(food => ({ ...food, isCustom: false })));
    console.log(`✅ Successfully seeded ${foodData.length} foods`);
    console.log('🍛 Includes South Indian, North Indian, Indian staples, snacks, fruits and beverages.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exitCode = 1;
  }
}

seedDatabase();
