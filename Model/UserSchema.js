const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    Full_Name: {
        type: String,
        required: [true, 'Please tell us your first name!']
    },
    Phone: {
        type: Number,
        required: [true, 'Please tell us your Number!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    role : {
        type : String,
        enum : ['Member', 'Admin' , "Blocked" ],
        default : 'Member'
    },
    address : {
        type : String
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            //  only works on CREATE and SAVE Dont Forgeeeeeeet !!!!!!!
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    },
    status :{
        type: Boolean,
        default: true,
        select: true
    }

},{collection: 'Users'});

// hena ana b3ml crypt llPassword abl ma yt3ml Leha save fe el database 3shan ma ynf3 tro7 as a plain text
userSchema.pre('save', async function(next){

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);

    this.passwordConfirm = undefined;

});



// hena ana b3ml compare between el plaintext ely da5lha el user wel hashedpassword ely fel database we brg3
// leh true or false
userSchema.methods.comparePassword = async function(plainTextPassword,hashedPassword){
    return await bcrypt.compare(plainTextPassword,hashedPassword);
}


module.exports = mongoose.model('User', userSchema);




