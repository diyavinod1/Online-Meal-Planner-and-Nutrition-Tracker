const express = require('express');
const router = express.Router();
const {
  createProgress,
  getProgress,
  getLatestProgress,
  deleteProgress,
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.post('/', createProgress);
router.get('/', getProgress);
router.get('/latest', getLatestProgress);
router.delete('/:id', deleteProgress);

module.exports = router;