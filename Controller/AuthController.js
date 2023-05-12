const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const User = require('../Model/UserSchema');
const cookieParser = require('cookie-parser');
const fs = require('fs');



const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user,statusCode,res) =>{

    try {
        const token = signToken(user._id);
        const cookieOption = {
            expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly : true
        }
        //  cookieOption.secure = true;
        res.cookie('jwt', token, cookieOption);
    }
    catch (err){
        res.status(404).json({
            message: "Error send token",
            ErrorMessage: err
        })
    }

}

exports.signup = async (req, res, next) => {

    try{

        console.log(req.body);
        const newUser = await User.create(req.body);

        createSendToken(newUser,201,res);
        res.redirect('/login');
    }
    catch (err){
        res.status(404).json({
            message: "Error for Sign up",
            ErrorMessage: err
        })
    }


};


exports.login = async (req,res,next) =>{

    try {
        const {email,password} = req.body;
        console.log(req.body);

        // If email or password doesnt exist
        if (!email || !password){
            return res.status(404).json({
                message: "Please provide email or password"
            })
        }

        // If user is exists && password gebhom mn el database
        const user = await User.findOne({email}).select('+password');

        if (!user){
            return res.status(404).json({
                message: "There is no email or password is incorrect"
            })
        }


        // Entered Password // Database-encrypted Password
        const compare = await user.comparePassword(password, user.password);


        if (!compare){
            return res.status(404).json({
                message: "There is no email or password is incorrect"
            })
        }

        createSendToken(user,200,res);


        if (!user.status){

            return fs.readFile('public/error/Blocked.html', (err, data) => {
                if (err) {
                    // Handle the error if the file couldn't be read
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                } else {
                    // Set the response header
                    res.setHeader('Content-Type', 'text/html');
                    // Send the HTML content
                    res.end(data);
                }
            });
        }

        return res.redirect('/home');
    }
    catch (err){
        res.status(404).json({
            message: "Error for Sign in",
            ErrorMessage: err
        })
    }
};


exports.protect = async (req, res, next) => {

    // 1) Getting token and check of it's there

    const cookieValue = req.cookies.jwt;


    if (!cookieValue) {
        return fs.readFile('public/error/NotSignedIn.html', (err, data) => {
            if (err) {
                // Handle the error if the file couldn't be read
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                // Set the response header
                res.setHeader('Content-Type', 'text/html');
                // Send the HTML content
                res.end(data);
            }
        });
    };

    // 2) Verification token
    // PAYLOAD: DATA
     const decoded = await promisify(jwt.verify)(cookieValue, process.env.JWT_SECRET);


    const currentUser = await User.findById(decoded.id);



    console.log(currentUser);

    if (!currentUser) {
        return fs.readFile('public/error/NotSignedIn.html', (err, data) => {
            if (err) {
                // Handle the error if the file couldn't be read
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                // Set the response header
                res.setHeader('Content-Type', 'text/html');
                // Send the HTML content
                res.end(data);
            }
        });
    }


    // GRANT ACCESS TO PROTECTED ROUTE
    // req.user property is commonly used to store information about the currently authenticated user.
    // By assigning the value of currentUser to req.user,
    // the application is indicating that the user associated with the current request is currentUser.
    req.user = currentUser;


    next();
};

exports.restrictTo = (...roles) =>{
    return (req,res,next) =>{

        if (!roles.includes(req.user.role)){
            return fs.readFile('public/error/Restricted.html', (err, data) => {
                if (err) {
                    // Handle the error if the file couldn't be read
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                } else {
                    // Set the response header
                    res.setHeader('Content-Type', 'text/html');
                    // Send the HTML content
                    res.end(data);
                }
            });
        }
        next();
    }
}


exports.SignOut = async (req, res, next) => {

    res.clearCookie('jwt');
    res.redirect('/home');

};

exports.CheckBlocked = async (req, res, next) => {



};





