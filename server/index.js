const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const authRoutes = require('./auth');

const app = express();

app.use(cors({
  origin: '*', // Allow all domains including Vercel and localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`--- Server Intelligence Active ---`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`Network Access: http://YOUR_IP_ADDRESS:${PORT}`);
  console.log(`----------------------------------`);
});
