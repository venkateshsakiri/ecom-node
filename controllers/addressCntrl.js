const Address = require('../models/Address');

module.exports = {
    postAddress:postAddress
}

function postAddress(req,res){
    async function postAddress(){
        try{

        }catch (err) {
            res.json({
                code: 400,
                data: null,
                message: "Exception error occurred",
            });
        }
    }postAddress().then(function(){}).catch(err=>{
        res.json({
            code: 500,
            data: null,
            message: "Internal server error",
        });
    })
}