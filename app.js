const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const ProductsRoute =  require('./Route/Products');
const DashboardRoute =  require('./Route/Dashboard');
const connectDB = require('./Database/dbconnect');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});


const app = express()


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