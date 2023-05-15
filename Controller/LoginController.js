const path = require("path");
const fs = require('fs');

exports.LoginDesgin = async (req,res) => {

    fs.readFile('public/Register/login.html', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });

};