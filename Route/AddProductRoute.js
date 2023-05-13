const express = require('express');
const router = express.Router();
const ProductsController = require("../Controller/ProductController");
const AuthController = require("../Controller/AuthController");



router.get('/',ProductsController.AddProduct); // // Add Product PAGE DESIGN

router.post('/add',AuthController.protect,ProductsController.AddProductToDataBase); // ADD PRODUCT TO DATABASE















module.exports = router;