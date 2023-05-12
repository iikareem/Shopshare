const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/AuthController');
const RegisterController = require('../Controller/RegisterController');


router.get('/',RegisterController.Register); // Register PAGE DESIGN

router.post('/add',AuthController.signup); // Added Register To Database

module.exports = router;