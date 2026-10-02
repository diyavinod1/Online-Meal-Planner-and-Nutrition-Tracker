const Meal = require('../models/Meal');

// @desc    Create a new meal
// @route   POST /api/meals
// @access  Private
const createMeal = async (req, res) => {
  try {
    const { date, mealType, foodItems, notes, mood } = req.body;

    if (!date || !mealType || !foodItems || foodItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide date, meal type, and at least one food item',
      });
    }

    const meal = await Meal.create({
      userId: req.user.id,
      date,
      mealType,
      foodItems,
      notes,
      mood,
    });

    res.status(201).json({
      success: true,
      message: 'Meal added successfully',
      data: meal,
    });
  } catch (error) {
    console.error('Create meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating meal',
      error: error.message,
    });
  }
};

// @desc    Get meals for a specific date
// @route   GET /api/meals/date/:date
// @access  Private
const getMealsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId: req.user.id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ createdAt: 1 });

    // Calculate daily totals
    const dailyTotals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      sugar: 0,
    };

    meals.forEach((meal) => {
      dailyTotals.calories += meal.totalNutrition.calories;
      dailyTotals.protein += meal.totalNutrition.protein;
      dailyTotals.carbs += meal.totalNutrition.carbs;
      dailyTotals.fats += meal.totalNutrition.fats;
      dailyTotals.fiber += meal.totalNutrition.fiber;
      dailyTotals.sugar += meal.totalNutrition.sugar;
    });

    res.status(200).json({
      success: true,
      data: {
        meals,
        dailyTotals,
      },
    });
  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching meals',
    });
  }
};

// @desc    Get meals for a date range (weekly view)
// @route   GET /api/meals/range
// @access  Private
const getMealsByRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide start and end dates',
      });
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId: req.user.id,
      date: {
        $gte: start,
        $lte: end,
      },
    }).sort({ date: 1, createdAt: 1 });

    // Group meals by date
    const mealsByDate = {};
    meals.forEach((meal) => {
      const dateKey = meal.date.toISOString().split('T')[0];
      if (!mealsByDate[dateKey]) {
        mealsByDate[dateKey] = {
          meals: [],
          totals: {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
          },
        };
      }
      mealsByDate[dateKey].meals.push(meal);
      mealsByDate[dateKey].totals.calories += meal.totalNutrition.calories;
      mealsByDate[dateKey].totals.protein += meal.totalNutrition.protein;
      mealsByDate[dateKey].totals.carbs += meal.totalNutrition.carbs;
      mealsByDate[dateKey].totals.fats += meal.totalNutrition.fats;
    });

    res.status(200).json({
      success: true,
      data: mealsByDate,
    });
  } catch (error) {
    console.error('Get meals range error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching meals',
    });
  }
};

// @desc    Update a meal
// @route   PUT /api/meals/:id
// @access  Private
const updateMeal = async (req, res) => {
  try {
    let meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
    }

    // Check ownership
    if (meal.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this meal',
      });
    }

    meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Meal updated successfully',
      data: meal,
    });
  } catch (error) {
    console.error('Update meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating meal',
    });
  }
};

// @desc    Delete a meal
// @route   DELETE /api/meals/:id
// @access  Private
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
    }

    // Check ownership
    if (meal.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this meal',
      });
    }

    await meal.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Meal deleted successfully',
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting meal',
    });
  }
};

// @desc    Get nutrition analytics
// @route   GET /api/meals/analytics
// @access  Private
const getNutritionAnalytics = async (req, res) => {
  try {
    const { days = 7 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    startDate.setHours(0, 0, 0, 0);

    const meals = await Meal.find({
      userId: req.user.id,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    // Calculate analytics
    const analytics = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      averageCalories: 0,
      daysTracked: 0,
      dailyBreakdown: {},
    };

    const dateSet = new Set();

    meals.forEach((meal) => {
      const dateKey = meal.date.toISOString().split('T')[0];
      dateSet.add(dateKey);

      if (!analytics.dailyBreakdown[dateKey]) {
        analytics.dailyBreakdown[dateKey] = {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
        };
      }

      analytics.totalCalories += meal.totalNutrition.calories;
      analytics.totalProtein += meal.totalNutrition.protein;
      analytics.totalCarbs += meal.totalNutrition.carbs;
      analytics.totalFats += meal.totalNutrition.fats;

      analytics.dailyBreakdown[dateKey].calories += meal.totalNutrition.calories;
      analytics.dailyBreakdown[dateKey].protein += meal.totalNutrition.protein;
      analytics.dailyBreakdown[dateKey].carbs += meal.totalNutrition.carbs;
      analytics.dailyBreakdown[dateKey].fats += meal.totalNutrition.fats;
    });

    analytics.daysTracked = dateSet.size;
    analytics.averageCalories = analytics.daysTracked > 0
      ? Math.round(analytics.totalCalories / analytics.daysTracked)
      : 0;

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
    });
  }
};

module.exports = {
  createMeal,
  getMealsByDate,
  getMealsByRange,
  updateMeal,
  deleteMeal,
  getNutritionAnalytics,
};