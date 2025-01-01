const mongoose = require('mongoose');

const address = new mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    apartment: {
        type: String
    },
    pincode: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    isShow: {
        type: Boolean
    }


},{timestamps:true})

module.exports = mongoose.model('Address',address);