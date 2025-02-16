const Products = require('../models/Products');
// const fileUpload = require('.././googleDrive');
// const uploadBase64ToFirebase = require('.././firebase')

module.exports = {
    postProducts:postProducts,
    getAllProducts:getAllProducts,
    deleteProductById:deleteProductById
}

function postProducts(req,res){
    async function postProducts() {
        try{

            // let imageUrl = null;
            // if (req.body.image) {
            //     try {
            //         // const fileId = await fileUpload(req.body.image);
            //         // const fileId = await uploadBase64ToFirebase(req.body.image,req.body.name);
            //         imageUrl = fileId;
            //     } catch (uploadError) {
            //         return res.status(500).json({
            //             error: 'Image upload failed',
            //             details: uploadError.message
            //         });
            //     }
            // }

            const product = new Products({
                code:req.body.code,
                name:req.body.name,
                description:req.body.description,
                category:req.body.category?.name,
                inventoryStatus:req.body.inventoryStatus?.label,
                image:req.body.image,
                rating:req.body.rating,
                price:req.body.price,
                quantity:req.body.quantity
            })
            // fileUpload(req.body.image);
            const isExistProduct = await Products.findOne({code:req.body.code});
            if(isExistProduct){
                res.json({
                    code: 200,
                    data: null,
                    message: 'Product already exist'
                })
            }else{
                const result = await product.save();
                if(result){
                    res.json({
                        code: 200,
                        data: result,
                        message: 'Product added successfully!!'
                    })
                }else{
                    res.json({
                        code: 200,
                        data: null,
                        message: 'Required fields are missing'
                    })
                }
            }
        }catch(err){
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }postProducts().then(function(){}).catch(err=>{
        res.json({
            code:500,
            data:null,
            message:'Internal server error'
        })
    })
}

function getAllProducts(req,res){
    async function getAllProducts(){
        try{
            const allProducts = await Products.find({});
            if(allProducts && allProducts.length > 0){
                res.json({
                    code:200,
                    data:allProducts,
                    size:allProducts.length,
                    message:'Products fetched successfully!!'
                })
            }else{
                res.json({
                    code:200,
                    data:[],
                    size:allProducts.length,
                    message:'No Products found!'
                })
            }
        }catch(err){
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }getAllProducts().then(function(){}).catch(err=>{
        res.json({
            code:500,
            data:null,
            message:'Internal server error'
        })
    })
}

function deleteProductById(req,res){
    async function deleteProductById(){
        try{
            const isExistingProduct = await Products.findByIdAndDelete(req.params.id);
            if(isExistingProduct){
                res.json({
                    code:200,
                    data:'',
                    message:'Product deleted successfully!'
                })
            }else{
                res.json({
                    code:200,
                    data:'',
                    message:'Product Id not found !'
                })
            }
        }catch(err){
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }deleteProductById().then(function(){}).catch(err=>{
        res.json({
            code:500,
            data:null,
            message:'Internal server error'
        })
    })
}