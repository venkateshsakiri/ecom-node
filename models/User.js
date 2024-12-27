const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    bio: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    avatar:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
},{timestamps:true})

module.exports =mongoose.model('Users',users);