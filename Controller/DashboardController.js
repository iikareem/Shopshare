const PRODUCT = require('../Database/ProductSchema');
const mongoose = require("mongoose");


exports.MainDashboard = async (req,res) => {
    res.render('AdminDashboardContent/MainDashboard', { // content
        layout: '../views/layout/Dashboard_Layout' // page design
    })
}

exports.ProfileDashboard = async (req,res) => {
    res.render('AdminDashboardContent/ProfileDashboard', { // content
        layout: '../views/layout/Dashboard_Layout' // page design
    })
}
exports.UsersDashboard = async (req,res) => {
    res.render('AdminDashboardContent/UsersDashboard', { // content
        layout: '../views/layout/Dashboard_Layout' // page design
    })
}
exports.MapsDashboard = async (req,res) => {
    res.render('AdminDashboardContent/MapsDashboard', { // content
        layout: '../views/layout/Dashboard_Layout' // page design
    })
}

exports.ErrorDashboard = async (req,res) => {
    res.render('AdminDashboardContent/ErrorDashboard', { // content
        layout: '../views/layout/ErrorDashboard_Layout' // page design
    })
}