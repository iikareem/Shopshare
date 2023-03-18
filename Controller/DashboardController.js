const PRODUCT = require('../Database/ProductSchema');
const mongoose = require("mongoose");


exports.MainDashboard = async (req,res) => {
    try {
        let NumOfProducts = await PRODUCT.count();
        let Dashboard = "MainDashboard";
        let Products = await PRODUCT.aggregate([
            {$project: {
                    user: {$substr: ["$user", 0, 10]},
                    Ad_Title: {$substr: ["$Ad_Title", 0, 50 ]},
                    Phone: {$substr: ["$Phone", 0, 20]},
                    Product_Price: {$substr: ["$Product_Price", 0, 15]},
                    createdAt: {$substr: ["$createdAt", 0, 10]},
                }}
        ])
        res.render('AdminDashboardContent/MainDashboard', {// content
            NumOfProducts,
            Products,
            Dashboard,
            layout: '../views/layout/Dashboard_Layout' // page design
        })
    }
    catch (err){
        console.log(err);
    }
}

exports.ProfileDashboard = async (req,res) => {
    let Dashboard = "ProfileDashboard";

    res.render('AdminDashboardContent/ProfileDashboard', { // content
        Dashboard,
        layout: '../views/layout/Dashboard_Layout' // page design
    })
}
exports.UsersDashboard = async (req,res) => {
    let Dashboard = "Users";

    res.render('AdminDashboardContent/UsersDashboard', { // content
        Dashboard,
        layout: '../views/layout/Dashboard_Layout' // page design
    })
}
exports.MapsDashboard = async (req,res) => {
    let Dashboard = "Maps";

    res.render('AdminDashboardContent/MapsDashboard', { // content
        Dashboard,
        layout: '../views/layout/Dashboard_Layout' // page design
    })
}

exports.ErrorDashboard = async (req,res) => {
    res.render('AdminDashboardContent/ErrorDashboard', { // content
        layout: '../views/layout/ErrorDashboard_Layout' // page design
    })
};

exports.DeleteProduct = async (req,res) => {
    try {
        await PRODUCT.deleteOne({_id: req.params.id});
        res.redirect("/dashboard");

    }
    catch (err){
        console.log(err);
    }
}