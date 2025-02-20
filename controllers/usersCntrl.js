const Users = require('../models/User');

module.exports = {
    registerUser:registerUser,
    loginUser:loginUser,
    upDateUser:upDateUser,
    getAllUsers:getAllUsers
}

function registerUser(req,res){
    async function registerUser(){
        try{
            const user = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                bio:'',
                city:'',
                state:'',
                avatar:'',
                status:'N'

            })
            let existingEmail = await Users.findOne({ email: req.body.email, name: req.body.name });
            if(existingEmail){
                res.json({
                    code: 200,
                    data: null,
                    message: 'Email already exist'
                })
            }else{
                let results = await Users.insertMany(user);
                if (results) {
                    res.json({
                        code: 200,
                        data: results,
                        message: 'user registered successfully'
                    })
                } else {
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
    }registerUser().then(function(){})
}

function loginUser(req,res){
    async function loginUser() {
        try{
            const user = await Users.findOne({email:req.body.email});
            if(!user){
                res.json({
                    data: null,
                    message: 'user not found'
                })
            }else if(user.status === 'N'){
                res.json({
                    data: null,
                    message: 'Pending from Admin Approval'
                })
            }
            else if(user.password !== req.body.password){
                res.json({
                    data: null,
                    message: 'password incorrect'
                })
            }else if((user.password === req.body.password) && (user.status === 'Y')){
                res.json({
                    applicationType:'CHAT',
                    message:"logged in Successfully!",
                    status:"SUCCESS",
                    user:{
                        UserRole:(user.name === 'admin' || user.name === 'Admin')? 'ADMIN' : 'CUSTOMER',
                        email:user.email,
                        id:user.id,
                        password:user.password,
                        name:user.name,
                        bio:user.bio,
                        city:user.city,
                        state:user.state,
                        avatar:user.avatar
                    }
                })
            }
        }catch(err){
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }loginUser().then(function(){})

}

function upDateUser(req,res){
    async function upDateUser(){
        try{
            const user = await Users.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            if(user){
                res.json({
                    code: 200,
                    data: user,
                    message: 'Account has been updated !!'
                })
            }else{
                res.json({
                    code: 200,
                    data: null,
                    message: 'Account has not found.'
                })
            }
        }catch(err){
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }upDateUser().then(function(){}).catch(err=>{
        res.json({
            code: 500,
            data: null,
            message: 'Internal server error'
        });
    })

}

function getAllUsers(req,res){
    async function getAllUsers(){
        try{
            const users = await Users.find({});
            if(users){
                res.json({
                    code:200,
                    data:users,
                    message:'customers fetched successfully!!'
                })
            }

        }catch(err){
            res.json({
                code: 400,
                data: null,
                message: 'Exception error occurred'
            })
        }
    }getAllUsers().then(function(){}).catch(err=>{
        res.json({
            code: 500,
            data: null,
            message: 'Internal server error'
        });
    })
}