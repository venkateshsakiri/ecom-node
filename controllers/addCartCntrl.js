const addCart = require('../models/addCart');
const Products = require('../models/Products');
const User = require('../models/User');

module.exports = {
    addToCart:addToCart,
    getAllCartItems:getAllCartItems,
    deleteCartItem:deleteCartItem
}

function addToCart(req,res){
    async function addToCart(){
        try{
            const isExistProduct = await addCart.findOne({productId:req.body.productId,userId:req.body.userId});
            const isExistUser = await User.findById(req.body.userId);
            if(isExistProduct){
                res.json({
                    code:200,
                    data:'',
                    message:'Product already exist in cart'
                })
            }else{

                if(!isExistUser){
                    res.json({
                        code:200,
                        data:'',
                        message:'User id not found !'
                    })
                }else{
                    const result = await addCart.insertMany(req.body);
                    if(result){
                        res.json({
                            code:200,
                            data:result,
                            message:'Product added to cart Successfully!'
                        })
                    }else{
                        res.json({
                            code:200,
                            data:'',
                            message:'Product id not found!'
                        })
                    }
                }
            }
        }catch (err) {
            res.json({
                code: 400,
                data: null,
                message: "Exception error occurred",
            });
        }
    }addToCart().then(function(){}).catch(err=>{
        res.json({
            code: 500,
            data: null,
            message: "Internal server error",
          });
    })
}


function getAllCartItems(req,res){
    async function getAllCartItems(){
        try{
            const isExistProduct = await addCart.find({userId:req.params.id});
            const dataList = [];
            for (const ele of isExistProduct) {
                let product = await Products.findById(ele.productId);
                dataList.push({cartId:ele._id,products:product});
            }
            if(isExistProduct){
                res.json({
                    code:200,
                    data:dataList,
                    message:'Product fetched successfully!'
                })
            }else{
                res.json({
                    code:200,
                    data:'',
                    message:'User Id not found !'
                })
            }
        }catch (err) {
            console.log(err)
            res.json({
                code: 400,
                data: null,
                message: "Exception error occurred",
            });
        }
    }getAllCartItems().then(function(){}).catch(err=>{
        res.json({
            code: 500,
            data: null,
            message: "Internal server error",
          });
    })
}


function deleteCartItem(req,res){
    async function deleteCartItem(){
        try{
            const isExistProduct = await addCart.findByIdAndDelete(req.params.id);
            if(isExistProduct){
                res.json({
                    code:200,
                    data:'',
                    message:'Product deleted successfully!'
                })
            }else{
                res.json({
                    code:200,
                    data:'',
                    message:'User Id not found !'
                })
            }
        }catch (err) {
            console.log(err)
            res.json({
                code: 400,
                data: null,
                message: "Exception error occurred",
            });
        }
    }deleteCartItem().then(function(){}).catch(err=>{
        res.json({
            code: 500,
            data: null,
            message: "Internal server error",
          });
    })
}