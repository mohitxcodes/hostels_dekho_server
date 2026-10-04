const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [blogs, total] = await Promise.all([
      Blog.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Blog.countDocuments(),
    ]);

    res.json({
      success: true,
      count: blogs.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: blogs,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs', error: error.message });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog', error: error.message });
  }
};

// @desc    Create a new blog
// @route   POST /api/blogs
const createBlog = async (req, res) => {
  try {
    const { slug, title, description, imageUrl } = req.body;

    // Check for duplicate slug
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(409).json({ success: false, message: `Blog with slug "${slug}" already exists` });
    }

    const blog = await Blog.create({
      slug,
      title,
      description,
      imageUrl,
    });

    res.status(201).json({ success: true, message: 'Blog created successfully', data: blog });
  } catch (error) {
    console.error('Error creating blog:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: 'Validation failed', errors: messages });
    }

    res.status(500).json({ success: false, message: 'Failed to create blog', error: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:slug
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ success: false, message: 'Failed to update blog', error: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:slug
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog', error: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};
