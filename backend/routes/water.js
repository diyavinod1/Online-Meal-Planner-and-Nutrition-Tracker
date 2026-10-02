const express = require('express');
const router = express.Router();
const {
  getWaterIntake,
  updateWaterIntake,
  incrementWater,
} = require('../controllers/waterController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.get('/:date', getWaterIntake);
router.put('/:date', updateWaterIntake);
router.post('/:date/increment', incrementWater);

module.exports = router;