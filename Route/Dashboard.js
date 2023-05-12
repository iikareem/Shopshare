const express = require('express');
const router = express.Router();
const DashboardController = require('../Controller/DashboardController');
const AuthController = require('../Controller/AuthController');



router.get('/',AuthController.protect,AuthController.restrictTo("admin"),DashboardController.MainDashboard); // Main Dashboard Design
router.get('/profile',DashboardController.ProfileDashboard); // Profile Dashboard Design
router.get('/Users',DashboardController.UsersDashboard); // Users Dashboard Design
router.get('/map-google',DashboardController.MapsDashboard); // Maps Dashboard Design
router.get('/Delete/:id',DashboardController.DeleteProduct); // Delete Product

router.get('/Users/Block/:id',DashboardController.BlockUser);

router.get('/Users/Unblock/:id',DashboardController.UnblockUser);


router.get('/Users/Remove/:id',DashboardController.RemoveUser);

router.get('*',DashboardController.ErrorDashboard); // Maps Dashboard Design











module.exports = router;