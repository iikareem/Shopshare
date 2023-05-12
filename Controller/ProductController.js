const PRODUCT = require('../Model/ProductSchema');
const mongoose = require("mongoose");
const path = require('path');
const socket = require('socket.io');


exports.Catalog = async (req,res) => {
    // pagination
    const FirstName= req.user.first_name;
    let perPage = 8;
    let page = req.query.page || 1;
    try {
        PRODUCT.aggregate([
            {$project: {
                    Ad_Title: {$substr: ["$Ad_Title", 0, 20]},
                    Product_Price: {$substr: ["$Product_Price", 0, 100 ]},
                    Electronics: {$substr: ["$Phone", 0, 100]},
                    Category: {$substr: ["$Category", 0, 30]},
                    Description: {$substr: ["$Description", 0, 60]},
                    IMAGE_LABEL: {$substr: ["$IMAGE_LABEL", 0, 200]},}
            } // { $sort: { createdAt: -1 }}
        ])

            // 8 * 1 - 8 = 0
            .skip(perPage * page - perPage)
            .limit(perPage) // 8
            .exec(function (err, Products) {

            console.log(Products);


        res.render("ProductsContent/ProductCatalog_Content", { // content
        Products,
            FirstName,
        layout: "../views/layout/ProductsCatalog_Layout",  // layout
                });
            });


    } catch (err) {
        console.log(err);
    }
};

exports.CatalogCategory = async (req,res) =>{

    const FirstName= req.user.first_name;
    const Products = await PRODUCT.find({Category : req.params.Category});

    try {
        res.render("ProductsContent/ProductCatalog_Content", { // content
            Products,
            FirstName,
            layout: "../views/layout/ProductsCatalog_Layout", // layout
        });
    }
    catch (err){
        console.log(err);
    }

}

exports.ProductDetail = async (req,res) => {

    // console.log( req.params);
    const Product = await PRODUCT.findById({_id: req.params.id})
        .lean();

    if (Product) {
        res.render('ProductsContent/ProductDetails_Content', {
            Product,
            layout: '../views/layout/Product_Details_Layout'
        })
    } else {
        res.send("Something Went Wrong.")
    }

}

exports.AddProduct = async (req,res) => {
    res.render('ProductsContent/AddProduct_Content', { // content
        layout: '../views/layout/AddProduct_Layout' // page design
    })
}


exports.AddProductToDataBase = async (req,res) => {
try {
    // console.log(req.body)
    await PRODUCT.create(req.body);
    res.redirect("/Catalog");
}
catch (error) {
    // console.log(req.body);
    console.log(error);
}

}


exports.Chatting = async (req,res) => {
    res.sendFile(path.join(__dirname, '../public/Chat/index.html'));

}




