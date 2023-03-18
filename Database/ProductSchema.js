const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    user: {
        type: String,
        default: "UNKNOWN"
    },
    Ad_Title: {
        type: String,
        required: true,
    },
    Brand: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
        Description: {
        type: String,
        required: true,
    },
    Specifications: {
        type: String,
        required: true,
    },
    IMAGE_LABEL: {
        type: String,
        required: true,

    },IMAGES_Slide1:
        {
        type: String,
        required: true,
    },

    IMAGES_Slide2: {
        type: String,
    },

    IMAGES_Slide3: {
        type: String,
    },

    Product_Price: {
        type: Number,
        required: true,
    },
    Phone: {
        type: Number,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

}, {collection: 'Products'});

module.exports = mongoose.model('Products', ProductSchema);

