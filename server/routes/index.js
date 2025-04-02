const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const appRoutes = require('./apps');
const keywordRoutes = require('./keywords');
const reviewRoutes = require('./reviews');
const categoryRoutes = require('./categories');
const analyticsRoutes = require('./analytics');
const userRoutes = require('./users');

// API status endpoint
router.get('/status', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  });
});

// Register route modules
router.use('/auth', authRoutes);
router.use('/apps', appRoutes);
router.use('/keywords', keywordRoutes);
router.use('/reviews', reviewRoutes);
router.use('/categories', categoryRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/users', userRoutes);

module.exports = router;
