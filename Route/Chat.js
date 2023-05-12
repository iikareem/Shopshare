const express = require('express');
const router = express.Router();
const ProductsController = require("../Controller/ProductController");



router.get('/',ProductsController.Chatting); // // Add Product PAGE DESIGN






module.exports = router;