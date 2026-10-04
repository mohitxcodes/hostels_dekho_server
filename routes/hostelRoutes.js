const express = require('express');
const router = express.Router();
const {
  getHostels,
  getHostelBySlug,
  createHostel,
  updateHostel,
  deleteHostel,
} = require('../controllers/hostelController');

router.route('/').get(getHostels).post(createHostel);
router.route('/:slug').get(getHostelBySlug).put(updateHostel).delete(deleteHostel);

module.exports = router;
