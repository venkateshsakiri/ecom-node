const Category = require('../models/Category');

module.exports = {
    addCategory:addCategory,
    getCategory:getCategory
}

function addCategory(req,res){
    async function addCategory() {
        try{
            const category = new Category({
                name:req.body.name,
                description:req.body.description
            })
            const isExistCategory = await Category.findOne({name:req.body.name});
            if(isExistCategory){
                res.json({
                    code: 200,
                    data: null,
                    message: 'Category already exist'
                })
            }else{
                let results = await Category.insertMany(category);
                if(results){
                    res.json({
                        code: 200,
                        data: results,
                        message: 'Category added successfully'
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
    }addCategory().then(function(){})
}

function getCategory(req,res){
    async function getCategory(){
        try{
            const categories = await Category.find({});
            if(categories){
                res.json(categories)
            }else{
                res.json([])
            }
        }catch(err){
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }getCategory().then(function(){}).catch(err=>{
        res.json({
            code: 500,
            data: null,
            message: 'Internal server error'
        });
    })
}