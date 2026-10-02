const mongoose = require('mongoose');

const waterIntakeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    glasses: {
      type: Number,
      default: 0,
      min: 0,
      max: 20,
    },
    milliliters: {
      type: Number,
      default: 0,
    },
    goal: {
      type: Number,
      default: 8, // 8 glasses per day
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one record per user per day
waterIntakeSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('WaterIntake', waterIntakeSchema);