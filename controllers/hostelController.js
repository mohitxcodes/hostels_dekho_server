const Hostel = require('../models/Hostel');

// @desc    Get all hostels (with optional filters)
// @route   GET /api/hostels
const getHostels = async (req, res) => {
  try {
    const { city, gender, verified, page = 1, limit = 20 } = req.query;

    // Build dynamic filter
    const filter = {};
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (gender) filter.gender = gender;
    if (verified !== undefined) filter.verified = verified === 'true';

    const skip = (Number(page) - 1) * Number(limit);

    const [hostels, total] = await Promise.all([
      Hostel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Hostel.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: hostels.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: hostels,
    });
  } catch (error) {
    console.error('Error fetching hostels:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch hostels', error: error.message });
  }
};

// @desc    Get single hostel by slug
// @route   GET /api/hostels/:slug
const getHostelBySlug = async (req, res) => {
  try {
    const hostel = await Hostel.findOne({ slug: req.params.slug });

    if (!hostel) {
      return res.status(404).json({ success: false, message: 'Hostel not found' });
    }

    res.json({ success: true, data: hostel });
  } catch (error) {
    console.error('Error fetching hostel:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch hostel', error: error.message });
  }
};

// @desc    Create a new hostel
// @route   POST /api/hostels
const createHostel = async (req, res) => {
  try {
    const { slug, name, city, gender, verified, description, images } = req.body;

    // Check for duplicate slug
    const existing = await Hostel.findOne({ slug });
    if (existing) {
      return res.status(409).json({ success: false, message: `Hostel with slug "${slug}" already exists` });
    }

    const hostel = await Hostel.create({
      slug,
      name,
      city,
      gender,
      verified,
      description,
      images,
    });

    res.status(201).json({ success: true, message: 'Hostel created successfully', data: hostel });
  } catch (error) {
    console.error('Error creating hostel:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: 'Validation failed', errors: messages });
    }

    res.status(500).json({ success: false, message: 'Failed to create hostel', error: error.message });
  }
};

// @desc    Update a hostel
// @route   PUT /api/hostels/:slug
const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!hostel) {
      return res.status(404).json({ success: false, message: 'Hostel not found' });
    }

    res.json({ success: true, message: 'Hostel updated successfully', data: hostel });
  } catch (error) {
    console.error('Error updating hostel:', error);
    res.status(500).json({ success: false, message: 'Failed to update hostel', error: error.message });
  }
};

// @desc    Delete a hostel
// @route   DELETE /api/hostels/:slug
const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findOneAndDelete({ slug: req.params.slug });

    if (!hostel) {
      return res.status(404).json({ success: false, message: 'Hostel not found' });
    }

    res.json({ success: true, message: 'Hostel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hostel:', error);
    res.status(500).json({ success: false, message: 'Failed to delete hostel', error: error.message });
  }
};

module.exports = {
  getHostels,
  getHostelBySlug,
  createHostel,
  updateHostel,
  deleteHostel,
};
