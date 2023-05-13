const PRODUCT = require('../Model/ProductSchema');
const path = require("path");
const fs = require('fs');





exports.Home = async (req,res) => {

    try{
        // console.log("HI")
        const Products = await PRODUCT.find();

            // console.log(Products);
            res.render("HomePage/HomeContent", { // content
            Products,
             layout: "HomePage/HomeLayout",  // layout
            });


    }
    catch (err){

    }


}


exports.AboutUs = async (req,res) => {

    fs.readFile('public/About/Aboutus.html', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });

}

exports.Contactus = async (req,res) => {
    fs.readFile('public/Contact_us/Contactus.html', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });

}