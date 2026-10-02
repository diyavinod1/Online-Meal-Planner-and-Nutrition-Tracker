const express = require('express');
const router = express.Router();
const {
  createMeal,
  getMealsByDate,
  getMealsByRange,
  updateMeal,
  deleteMeal,
  getNutritionAnalytics,
} = require('../controllers/mealController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.post('/', createMeal);
router.get('/date/:date', getMealsByDate);
router.get('/range', getMealsByRange);
router.get('/analytics', getNutritionAnalytics);
router.put('/:id', updateMeal);
router.delete('/:id', deleteMeal);

module.exports = router;