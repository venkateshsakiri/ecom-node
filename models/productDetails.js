const mongoose = require('mongoose');

const details = new mongoose.Schema({
    productId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    images:{
        type:Array,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    ratings:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model('Product_Details',details);