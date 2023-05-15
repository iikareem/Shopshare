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
            expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1 * 60 * 60 * 1000),
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

        const newUser = await User.create({
            email : req.body.email,
            Full_Name : req.body.Full_Name,
            password : req.body.password,
            passwordConfirm : req.body.passwordConfirm,
            Phone: req.body.Phone,
            address : req.body.address
        });

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
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                } else {
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            });
        }

        req.user = user;
        return res.redirect('/');
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
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    };

    // 2) Verification token
    // PAYLOAD: DATA
     const decoded = await promisify(jwt.verify)(cookieValue, process.env.JWT_SECRET);


    const currentUser = await User.findById(decoded.id);



    // console.log(currentUser);

    if (!currentUser) {
        return fs.readFile('public/error/NotSignedIn.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }



    req.user = currentUser;


    next();
};

exports.restrictTo = (...roles) =>{
    return (req,res,next) =>{

        if (!roles.includes(req.user.role)){
            return fs.readFile('public/error/Restricted.html', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                } else {
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            });
        }
        next();
    }
}


exports.SignOut = async (req, res, next) => {
    res.clearCookie('jwt');
    res.redirect('/');

};


exports.welcome = async (req, res, next) => {

    // 1) Getting token and check of it's there
    if (req.cookies && req.cookies.jwt) {
        const cookieValue = req.cookies.jwt;

        // 2) Verification token
        // PAYLOAD: DATA
        const decoded = await promisify(jwt.verify)(cookieValue, process.env.JWT_SECRET);


        const currentUser = await User.findById(decoded.id);


        req.user = currentUser;


        next();

    } else {
        req.user = undefined;
        next();
    }



};






