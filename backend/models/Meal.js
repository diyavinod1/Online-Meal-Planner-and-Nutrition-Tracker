const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema(
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
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snacks'],
      required: true,
    },
    foodItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        unit: {
          type: String,
          default: 'serving',
        },
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
      },
    ],
    totalNutrition: {
      calories: {
        type: Number,
        default: 0,
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
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    mood: {
      type: String,
      enum: ['energetic', 'normal', 'tired', 'hungry', 'satisfied'],
      default: 'normal',
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total nutrition before saving
mealSchema.pre('save', function (next) {
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    sugar: 0,
  };

  this.foodItems.forEach((item) => {
    totals.calories += item.calories * item.quantity;
    totals.protein += item.protein * item.quantity;
    totals.carbs += item.carbs * item.quantity;
    totals.fats += item.fats * item.quantity;
    totals.fiber += item.fiber * item.quantity;
    totals.sugar += item.sugar * item.quantity;
  });

  this.totalNutrition = totals;
  next();
});

// Compound index for efficient queries
mealSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('Meal', mealSchema);