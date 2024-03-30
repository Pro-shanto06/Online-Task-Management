// routes/dashboardRoutes.js

const express = require('express');
const router = express.Router();
const { getUserDashboard } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware to protect routes requiring authentication
router.use(authMiddleware);

// Get user dashboard data
router.get('/', getUserDashboard);

module.exports = router;
