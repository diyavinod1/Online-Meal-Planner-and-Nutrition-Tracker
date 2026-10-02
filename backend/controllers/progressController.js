const Progress = require('../models/Progress');

// @desc    Create progress entry
// @route   POST /api/progress
// @access  Private
const createProgress = async (req, res) => {
  try {
    const { date, weight, measurements, bodyFatPercentage, notes } = req.body;

    if (!date || !weight) {
      return res.status(400).json({
        success: false,
        message: 'Please provide date and weight',
      });
    }

    const progress = await Progress.create({
      userId: req.user.id,
      date,
      weight,
      measurements,
      bodyFatPercentage,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Progress recorded successfully',
      data: progress,
    });
  } catch (error) {
    console.error('Create progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error recording progress',
    });
  }
};

// @desc    Get progress history
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    const { days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const progress = await Progress.find({
      userId: req.user.id,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
    });
  }
};

// @desc    Get latest progress
// @route   GET /api/progress/latest
// @access  Private
const getLatestProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error('Get latest progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching latest progress',
    });
  }
};

// @desc    Delete progress entry
// @route   DELETE /api/progress/:id
// @access  Private
const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress entry not found',
      });
    }

    if (progress.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this entry',
      });
    }

    await progress.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Progress entry deleted',
    });
  } catch (error) {
    console.error('Delete progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting progress',
    });
  }
};

module.exports = {
  createProgress,
  getProgress,
  getLatestProgress,
  deleteProgress,
};