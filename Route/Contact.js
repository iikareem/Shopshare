const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/AuthController');
const HomeController = require('../Controller/HomeController');


router.get('/',HomeController.Contactus); // Register PAGE DESIGN


module.exports = router;
