const mongoose = require('mongoose');

const addCart = new mongoose.Schema({
    productId: {
        type: String
    },
    productDetailsId: {
        type: String
    },
    userId: {
        type: String
    }

},{timestamps:true})

module.exports = mongoose.model('AddCart',addCart);