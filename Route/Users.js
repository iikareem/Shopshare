const express = require('express');
const router = express.Router();

const AuthController = require('../Controller/AuthController');




router.post('/signup', AuthController.signup );
router.post('/login', AuthController.login );

router.get('/test',AuthController.protect);













module.exports = router;