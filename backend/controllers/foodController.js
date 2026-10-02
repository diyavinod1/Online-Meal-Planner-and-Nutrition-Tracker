const Food = require('../models/Food');

// @desc    Search foods
// @route   GET /api/foods/search
// @access  Private
const searchFoods = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query',
      });
    }

    const foods = await Food.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
      ],
    }).limit(20);

    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error('Search foods error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching foods',
    });
  }
};

// @desc    Get foods by category
// @route   GET /api/foods/category/:category
// @access  Private
const getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const foods = await Food.find({ category }).limit(50);

    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error('Get foods by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching foods',
    });
  }
};

// @desc    Create custom food
// @route   POST /api/foods
// @access  Private
const createFood = async (req, res) => {
  try {
    const { name, category, servingSize, nutrition, tags } = req.body;

    if (!name || !nutrition || !nutrition.calories) {
      return res.status(400).json({
        success: false,
        message: 'Please provide food name and calorie information',
      });
    }

    const food = await Food.create({
      name,
      category,
      servingSize,
      nutrition,
      tags,
      isCustom: true,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Custom food created successfully',
      data: food,
    });
  } catch (error) {
    console.error('Create food error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A food with this name already exists',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating food',
      error: error.message,
    });
  }
};

// @desc    Get user's custom foods
// @route   GET /api/foods/custom
// @access  Private
const getCustomFoods = async (req, res) => {
  try {
    const foods = await Food.find({
      isCustom: true,
      createdBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error('Get custom foods error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching custom foods',
    });
  }
};

// @desc    Delete custom food
// @route   DELETE /api/foods/:id
// @access  Private
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: 'Food not found',
      });
    }

    // Check if user created this custom food
    if (!food.isCustom || food.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this food',
      });
    }

    await food.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Food deleted successfully',
    });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting food',
    });
  }
};

module.exports = {
  searchFoods,
  getFoodsByCategory,
  createFood,
  getCustomFoods,
  deleteFood,
};