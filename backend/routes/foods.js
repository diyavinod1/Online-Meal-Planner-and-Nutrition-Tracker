const express = require('express');
const router = express.Router();
const {
  searchFoods,
  getFoodsByCategory,
  createFood,
  getCustomFoods,
  deleteFood,
} = require('../controllers/foodController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.get('/search', searchFoods);
router.get('/category/:category', getFoodsByCategory);
router.get('/custom', getCustomFoods);
router.post('/', createFood);
router.delete('/:id', deleteFood);

module.exports = router;