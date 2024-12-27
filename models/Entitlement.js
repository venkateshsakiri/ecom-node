const mongoose = require('mongoose');

const entitlement = new mongoose.Schema({
    name: {
        type: String
    },
    role: {
        type: String
    },
    key: {
        type: String,
        required: true
    },
},{timestamps:true});

module.exports = mongoose.model('Entitlements',entitlement);