const express = require('express');
const router = express.Router();
const DashboardController = require('../Controller/DashboardController');



router.get('/',DashboardController.MainDashboard); // Main Dashboard Design
router.get('/profile',DashboardController.ProfileDashboard); // Profile Dashboard Design
router.get('/Users',DashboardController.UsersDashboard); // Users Dashboard Design
router.get('/map-google',DashboardController.MapsDashboard); // Maps Dashboard Design
router.get('/Delete/:id',DashboardController.DeleteProduct); // Maps Dashboard Design

router.get('*',DashboardController.ErrorDashboard); // Maps Dashboard Design











module.exports = router;