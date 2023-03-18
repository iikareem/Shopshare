// In an event-driven application, there is generally a main loop that listens for events,
// and then triggers a callback function when one of those events is detected.
// path el brnamg bykon mbny 3la al request ll user not line by line

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const ProductsRoute =  require('./Route/Products');
const DashboardRoute =  require('./Route/Dashboard');
const connectDB = require('./Database/dbconnect');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});

// Express is a node js web application framework that provides broad features for building web
// and mobile applications. It is used to build a single page, multipage, and hybrid web application.
// Express Provides a simple Routing for requests made by client
// Without Express u have to write ur own code to build a routing component which is time consuming
// Companies That Are Using Express JS
//  Netflix
//  IBM
//  ebay
//  Uber
const app = express()

// You NEED express.json() and express.urlencoded() for POST and PUT requests,
// because in both these requests you are sending data (in the form of some data object)
// to the server and you are asking the server
// to accept or store that data (object),
// which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

app.use(express.urlencoded({extended: true}))
app.use(express.json());


connectDB();

app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use('/',ProductsRoute);
app.use('/Dashboard',DashboardRoute);



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Running on port ${port}`)
})