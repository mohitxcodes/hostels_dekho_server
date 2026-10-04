const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Lead = require('./models/Lead');
const hostelRoutes = require('./routes/hostelRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hostel_dekho')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/hostels', hostelRoutes);

app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone } = req.body;
    
    // Create new lead
    const newLead = new Lead({
      name,
      phone
    });

    await newLead.save();

    res.status(201).json({ message: 'Lead saved successfully', lead: newLead });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ message: 'Failed to save lead', error: error.message });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads', error: error.message });
  }
});

const Admin = require('./models/Admin');

app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      res.json({ success: true, token: 'fake-jwt-token-12345' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Seed default admin if none exists
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({ username: 'admin', password: 'password123' });
      console.log('Default admin created (username: admin, password: password123)');
    }
  } catch (err) {
    console.error('Failed to seed admin:', err);
  }
});
