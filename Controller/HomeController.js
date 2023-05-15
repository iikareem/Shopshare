const PRODUCT = require('../Model/ProductSchema');
const path = require("path");
const fs = require('fs');





exports.Home = async (req,res) => {

    try{
        let user;
        const Products = await PRODUCT.find();
        const ProductsNumber = await PRODUCT.count();

        if (req.user){
             user = req.user.Full_Name;
        }
        else {
            user = undefined;
        }

            res.render("HomePage/HomeContent", { // content
            Products,
                ProductsNumber,
              user,
             layout: "HomePage/HomeLayout",  // layout
            });


    }
    catch (err){
    }


}


exports.AboutUs = async (req,res) => {
    let user;
    if (req.user){
        user = req.user.Full_Name;
    }
    else {
        user = undefined;
    }

    res.render("HomePage/AboutContact/AboutContent", { // content
        user,
        layout: "HomePage/AboutContact/AboutContactLayout",  // layout
    });

}

exports.Contactus = async (req,res) => {


    let user;
    if (req.user){
        user = req.user.Full_Name;
    }
    else {
        user = undefined;
    }

    res.render("HomePage/AboutContact/ContactContent", { // content
        user,
        layout: "HomePage/AboutContact/AboutContactLayout",  // layout
    });



}