const express = require('express');
const router = express.Router();
const HomeController = require('../Controller/HomeController');
const AuthController = require('../Controller/AuthController');



router.get('',AuthController.welcome,HomeController.AboutUs); // Abouts us PAGE DESIGN



module.exports = router;