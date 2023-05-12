const express = require('express');
const router = express.Router();

const AuthController = require('../Controller/AuthController');
const LoginController = require('../Controller/LoginController');


router.get('/',LoginController.LoginDesgin); // Login PAGE DESIGN


router.post('/',AuthController.login); // Login PAGE DESIGN



module.exports = router;