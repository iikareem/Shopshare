const express = require('express');
const router = express.Router();
const ProductsController = require("../Controller/ProductController");



router.get('/',ProductsController.AddProduct); // // Add Product PAGE DESIGN

router.post('/add',ProductsController.AddProductToDataBase); // ADD PRODUCT TO DATABASE















module.exports = router;