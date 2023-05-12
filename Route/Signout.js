const express = require('express');
const router = express.Router();

const AuthController = require('../Controller/AuthController');




router.get('',AuthController.SignOut);









module.exports = router;