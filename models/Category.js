const mongoose = require('mongoose');

const category = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
},{timestamps:true})

module.exports = mongoose.model('Category',category)