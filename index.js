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
    const { name, email, phone } = req.body;
    
    // Create new lead
    const newLead = new Lead({
      name,
      email,
      phone
    });

    await newLead.save();

    res.status(201).json({ message: 'Lead saved successfully', lead: newLead });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ message: 'Failed to save lead', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
