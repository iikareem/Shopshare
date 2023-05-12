const express = require('express');
const router = express.Router();
const ProductsController = require('../Controller/ProductController');
const AuthController = require('../Controller/AuthController');

// http://127.0.0.1:5000/catalog

router.get('/',AuthController.protect, ProductsController.Catalog); // CATALOG PAGE DESIGN


router.get('/:Category',AuthController.protect ,ProductsController.CatalogCategory); // CATALOG PAGE DESIGN But By Category


router.get('/Detail/:id',AuthController.protect ,ProductsController.ProductDetail); // Product Detail PAGE DESIGN













module.exports = router;