const ProductDetails = require("../models/productDetails");
const Product = require('../models/Products');

module.exports = {
  addProductDetails: addProductDetails,
  getProductDetailsById:getProductDetailsById
};

function addProductDetails(req,res) {
  async function addProductDetails() {
    try {
        const isProductExist = await Product.findById(req.body.productId);
        if(isProductExist){
            const result = await ProductDetails.insertMany(req.body);
            if(result){
                res.json({
                    code:200,
                    data:result,
                    message:"Product posted successfully!!"
                })
            }
        }else{
            res.json({
                code:200,
                data:null,
                message:"No Product id found!"
            })
        }
    } catch (err) {
      res.json({
        code: 400,
        data: null,
        message: "Exception error occurred",
      });
    }
  }
  addProductDetails().then(function () {}).catch((err) => {
      res.json({
        code: 500,
        data: null,
        message: "Internal server error",
      });
    });
}

function getProductDetailsById(req,res) {
  async function getProductDetailsById() {
    try {
        const isProductDetailsExist = await ProductDetails.findOne({productId:req.params.id});
        if(isProductDetailsExist){
            // const result = await ProductDetails.insertMany(req.body);
            res.json({
                code:200,
                data:isProductDetailsExist,
                message:"Product Details fetched successfully!!"
            })
        }else{
            res.json({
                code:200,
                data:null,
                message:"No Product id found!"
            })
        }
    } catch (err) {
      res.json({
        code: 400,
        data: null,
        message: "Exception error occurred",
      });
    }
  } getProductDetailsById().then(function () {}).catch((err) => {
      res.json({
        code: 500,
        data: null,
        message: "Internal server error",
      });
    });
}
