const User = require('../models/User');
const Users = require('../models/User');

module.exports = {
    registerUser:registerUser,
    loginUser:loginUser
}

function registerUser(req,res){
    async function registerUser(){
        try{
            const user = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
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
            const user = await User.findOne({email:req.body.email});
            if(!user){
                res.json({
                    data: null,
                    message: 'user not found'
                })
            }else if(user.password !== req.body.password){
                res.json({
                    data: null,
                    message: 'password incorrect'
                })
            }else{
                res.json({
                    applicationType:'CHAT',
                    message:"logged in Successfully!",
                    status:"SUCCESS",
                    user:{
                        UserRole:user.name === 'admin'? 'ADMIN' : 'CUSTOMER',
                        email:user.email,
                        id:user.id,
                        password:user.password,
                        name:user.name
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