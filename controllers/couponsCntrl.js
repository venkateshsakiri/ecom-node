const Coupons = require("../models/coupons");

module.exports = {
  postCoupons: postCoupons,
  getAllCoupons:getAllCoupons,
  getCouponsByCode:getCouponsByCode
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
function getCouponsByCode(req,res) {
  async function getCouponsByCode() {
    try {
        const coupon = await Coupons.findOne({code:req.params.id});
        if(coupon){
            // Get today's date
            const today = new Date();

            const inputDateString = coupon.expiryDate;
            const [day, month, year] = inputDateString.split('/').map(Number);
            const inputDate = new Date(year, month - 1, day); // month is 0-indexed

            // Compare the dates
            if (inputDate > today) {
                res.json({
                    code:200,
                    data:coupon,
                    message:'Coupon fetched successfully!'
                })
            } else if (inputDate < today) {
                res.json({
                    code:200,
                    data:'',
                    message:'Coupon expired'
                })
            } else {

            }


        }else{
            res.json({
                code:200,
                data:'',
                message:'No Coupon found!'
            })
        }
    } catch (err) {
        res.json({
            code: 400,
            data: null,
            message: 'Exception error occurred'
        })
    }
  }getCouponsByCode().then(function () {}).catch((err) => {
    res.json({
    code: 500,
    data: null,
    message: "Internal server error",
    });
  });
}
