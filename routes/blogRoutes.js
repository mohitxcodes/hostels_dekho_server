const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

router.route('/').get(getBlogs).post(createBlog);
router.route('/:slug').get(getBlogBySlug).put(updateBlog).delete(deleteBlog);

module.exports = router;
