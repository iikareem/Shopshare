const path = require("path");
const fs = require('fs');
const USER = require('../Model/UserSchema');
const User = require("../Model/UserSchema");


exports.Register = async (req,res) => {

    fs.readFile('public/Register/Register.html', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });
}

