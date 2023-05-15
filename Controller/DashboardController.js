const PRODUCT = require('../Model/ProductSchema');
const USERS = require('../Model/UserSchema');
const mongoose = require("mongoose");


exports.MainDashboard = async (req,res) => {
    try {
        let NumOfProducts = await PRODUCT.count();
        let NumOfUsers = await USERS.count();
        let Dashboard = "MainDashboard";
        let Products = await PRODUCT.aggregate([
            {$project: {
                    user: {$substr: ["$user", 0, 20]},
                    Ad_Title: {$substr: ["$Ad_Title", 0, 50 ]},
                    Phone: {$substr: ["$Phone", 0, 20]},
                    Product_Price: {$substr: ["$Product_Price", 0, 15]},
                    createdAt: {$substr: ["$createdAt", 0, 10]},
                }}
        ])

        // console.log(Products);

        res.render('AdminDashboardContent/MainDashboard', {// content
            NumOfProducts,
            NumOfUsers,
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
    let Users = await USERS.find();
    // console.log(Users);
    res.render('AdminDashboardContent/UsersDashboard', { // content
        Dashboard,
        Users,
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


exports.BlockUser = async (req,res) => {
    try {
        const updatedProduct = await USERS.findByIdAndUpdate(req.params.id, { status: false }, { new: true });
        res.redirect("/dashboard/users");
    } catch (error) {
        console.log('An error occurred:', error);
    }
}

exports.UnblockUser = async (req,res) => {
    try {
        const updatedProduct = await USERS.findByIdAndUpdate(req.params.id, { status: true }, { new: false });
        res.redirect("/dashboard/users");
    } catch (error) {
        console.log('An error occurred:', error);
    }
}

exports.RemoveUser = async (req,res) => {
    try {
        await USERS.deleteOne({_id: req.params.id});
        res.redirect("/dashboard/users");
    } catch (error) {
        console.log('An error occurred:', error);
    }
}