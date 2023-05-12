const mongoose = require('mongoose');
mongoose.set('strictQuery' , false);


const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.DATABASE);
        console.log("Connected To Database")
    }
    catch (err){
        console.log(err);
    }
}

module.exports = connectDB;