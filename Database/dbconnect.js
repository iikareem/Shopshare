const mongoose = require('mongoose');
mongoose.set('strictQuery' , false);


const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.DATABASE);
        console.log("connected")
    }
    catch (err){
        console.log(err);
    }
}

module.exports = connectDB;