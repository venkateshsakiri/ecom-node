const Coupons = require("../models/coupons");

module.exports = {
  postCoupons: postCoupons,
  getAllCoupons:getAllCoupons
};

function postCoupons(req,res) {
  async function postCoupons() {
    try {
        const coupons = await Coupons.findOne({code:req.body.code});
        if(coupons){
            res.json({
                code:200,
                data:null,
                message:'Coupon already exist'
            })
        }else{
            const result = await Coupons.insertMany(req.body);
            if(result){
                res.json({
                    code:200,
                    data:result,
                    message:'Coupon posted successfully!!'
                })
            }else{

            }
        }
    } catch (err) {
        res.json({
            code: 400,
            data: null,
            message: 'Exception error occurred'
        })
    }
  }
  postCoupons().then(function () {}).catch((err) => {
      res.json({
        code: 500,
        data: null,
        message: "Internal server error",
      });
    });
}


function getAllCoupons(req,res) {
  async function getAllCoupons() {
    try {
        const coupons = await Coupons.find({});
        if(coupons){
            res.json({
                code:200,
                data:coupons,
                message:'Coupon fetched successfully!'
            })
        }else{
            if(result){
                res.json({
                    code:200,
                    data:[],
                    message:'No Coupon found!'
                })
            }else{

            }
        }
    } catch (err) {
        res.json({
            code: 400,
            data: null,
            message: 'Exception error occurred'
        })
    }
  }getAllCoupons().then(function () {}).catch((err) => {
    res.json({
    code: 500,
    data: null,
    message: "Internal server error",
    });
  });
}
