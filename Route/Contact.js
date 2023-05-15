const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/AuthController');
const HomeController = require('../Controller/HomeController');


router.get('/',AuthController.welcome,HomeController.Contactus); // Contact us PAGE DESIGN


module.exports = router;
