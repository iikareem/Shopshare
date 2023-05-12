const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const AddRoute =  require('./Route/AddProductRoute');
const ProductsRoute =  require('./Route/Products');
const DashboardRoute =  require('./Route/Dashboard');
const UsersRoute =  require('./Route/Users');
const ChatRoute =  require('./Route/Chat');
const HomeRoute =  require('./Route/Home');
const AboutRoute =  require('./Route/Aboutus');
const RegisterRoute =  require('./Route/Register');
const LoginRoute =  require('./Route/Login');
const SignOutRoute =  require('./Route/Signout');
const ContactRoute =  require('./Route/Contact');
const connectDB = require('./Model/dbconnect');
const SetupSocket = require('./Utils/Chatting');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const app = express();





const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`Running on port ${port}`)
})


app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(cookieParser());



connectDB();

app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');



// Rawan
app.use('/Home',HomeRoute);
app.use('/AboutUs',AboutRoute);
app.use('/Contactus',ContactRoute);


// Andrew
app.use('/Register',RegisterRoute);
app.use('/Login',LoginRoute);


app.use('/Signout',SignOutRoute);



app.use('/Catalog',ProductsRoute);
app.use('/Add-Product',AddRoute);
app.use('/ChatNow',ChatRoute);
app.use('/Dashboard',DashboardRoute);
app.use('/User',UsersRoute);


SetupSocket(server);









