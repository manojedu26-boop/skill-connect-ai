const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const authRoutes = require('./auth');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); 

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'SkillSwap Backend is running',
    supabase_connected: !!process.env.SUPABASE_URL,
    supabase_url: process.env.SUPABASE_URL ? `${process.env.SUPABASE_URL.substring(0, 15)}...` : 'Not Connected'
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
