const express = require('express');
const router = express.Router();
const ProductsController = require('../Controller/ProductController');
const DashboardController = require('../Controller/DashboardController');


router.get('/catalog',ProductsController.Catalog); // CATALOG PAGE DESIGN
router.get('/Product_Detail/:id',ProductsController.ProductDetail); // Product Detail PAGE DESIGN
router.get('/Add_Product',ProductsController.AddProduct); // // Add Product PAGE DESIGN
router.post('/product/add',ProductsController.AddProductToDataBase); // ADD PRODUCT TO DATABASE








module.exports = router;