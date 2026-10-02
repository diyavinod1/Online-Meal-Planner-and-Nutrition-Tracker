const WaterIntake = require('../models/WaterIntake');

// @desc    Get water intake for a specific date
// @route   GET /api/water/:date
// @access  Private
const getWaterIntake = async (req, res) => {
  try {
    const { date } = req.params;
    
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    let waterIntake = await WaterIntake.findOne({
      userId: req.user.id,
      date: targetDate,
    });

    // If no record exists, create one
    if (!waterIntake) {
      waterIntake = await WaterIntake.create({
        userId: req.user.id,
        date: targetDate,
        glasses: 0,
        milliliters: 0,
        goal: 8,
      });
    }

    res.status(200).json({
      success: true,
      data: waterIntake,
    });
  } catch (error) {
    console.error('Get water intake error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching water intake',
    });
  }
};

// @desc    Update water intake
// @route   PUT /api/water/:date
// @access  Private
const updateWaterIntake = async (req, res) => {
  try {
    const { date } = req.params;
    const { glasses, milliliters, goal } = req.body;

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const updateData = {};
    if (glasses !== undefined) updateData.glasses = glasses;
    if (milliliters !== undefined) updateData.milliliters = milliliters;
    if (goal !== undefined) updateData.goal = goal;

    const waterIntake = await WaterIntake.findOneAndUpdate(
      {
        userId: req.user.id,
        date: targetDate,
      },
      updateData,
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Water intake updated successfully',
      data: waterIntake,
    });
  } catch (error) {
    console.error('Update water intake error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating water intake',
    });
  }
};

// @desc    Increment water intake
// @route   POST /api/water/:date/increment
// @access  Private
const incrementWater = async (req, res) => {
  try {
    const { date } = req.params;
    
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    let waterIntake = await WaterIntake.findOne({
      userId: req.user.id,
      date: targetDate,
    });

    if (!waterIntake) {
      waterIntake = await WaterIntake.create({
        userId: req.user.id,
        date: targetDate,
        glasses: 1,
        milliliters: 250,
        goal: 8,
      });
    } else {
      waterIntake.glasses += 1;
      waterIntake.milliliters += 250;
      await waterIntake.save();
    }

    res.status(200).json({
      success: true,
      message: 'Water glass added',
      data: waterIntake,
    });
  } catch (error) {
    console.error('Increment water error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding water',
    });
  }
};

module.exports = {
  getWaterIntake,
  updateWaterIntake,
  incrementWater,
};