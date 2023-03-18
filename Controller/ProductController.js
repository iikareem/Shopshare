const PRODUCT = require('../Database/ProductSchema');
const mongoose = require("mongoose");


exports.Catalog = async (req,res) => {
    let perPage = 8;
    let page = req.query.page || 1;

    try {

        PRODUCT.aggregate([
            {$sort: {createdAt: 1}},
        ])
            // 8 * 2 - 8 = 8
            .skip(perPage * page - perPage)
            .limit(perPage) // 8
            .exec(function (err, Products) {
                    res.render("ProductCatalog_Content", { // content
                        Products,
                        layout: "../views/layout/ProductsCatalog_Layout", // layout
                });
            });

    } catch (err) {
        console.log(err);
    }
};

exports.CatalogCategory = async (req,res) =>{
    const Products = await PRODUCT.find({Category : req.params.Category});

    try {
        res.render("ProductCatalog_Content", { // content
            Products,
            layout: "../views/layout/ProductsCatalog_Layout", // layout
        });
    }
    catch (err){
        console.log(err);
    }

}

exports.ProductDetail = async (req,res) => {
    const Product = await PRODUCT.findById({_id: req.params.id})
        .lean();

    if (Product) {
        res.render('ProductDetails_Content', {
            Product,
            layout: '../views/layout/Product_Details_Layout'
        })
    } else {
        res.send("Something Went Wrong.")
    }

}

exports.AddProduct = async (req,res) => {
    res.render('AddProduct_Content', { // content
        layout: '../views/layout/AddProduct_Layout' // page design
    })
}


exports.AddProductToDataBase = async (req,res) => {
try {
    await PRODUCT.create(req.body)
    console.log(req.body);
    res.redirect("/catalog");
}
catch (error) {
    // console.log(req.body);
    console.log(error);
}

}


