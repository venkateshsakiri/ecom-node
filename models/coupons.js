const mongoose =  require('mongoose');

const coupons = new mongoose.Schema({
    name:{
        type:String
    },
    code:{
        type:String,
        unique:true
    },
    expiryDate:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('Coupons',coupons);