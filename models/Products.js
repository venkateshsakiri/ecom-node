const mongoose = require('mongoose');

const product = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    inventoryStatus: {
        type: String,
    },
    rating: {
        type: Number,
    },
    image: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity: {
        type: String,
    }
},{timestamps:true});

module.exports = mongoose.model('Products',product);