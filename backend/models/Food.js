const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'protein',
        'vegetables',
        'fruits',
        'grains',
        'dairy',
        'snacks',
        'beverages',
        'breakfast',
        'other',
      ],
      default: 'other',
    },
    servingSize: {
      amount: {
        type: Number,
        default: 100,
      },
      unit: {
        type: String,
        default: 'g',
      },
    },
    nutrition: {
      calories: {
        type: Number,
        required: true,
      },
      protein: {
        type: Number,
        default: 0,
      },
      carbs: {
        type: Number,
        default: 0,
      },
      fats: {
        type: Number,
        default: 0,
      },
      fiber: {
        type: Number,
        default: 0,
      },
      sugar: {
        type: Number,
        default: 0,
      },
      sodium: {
        type: Number,
        default: 0,
      },
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search functionality
foodSchema.index({ name: 'text', tags: 'text' });

module.exports = mongoose.model('Food', foodSchema);