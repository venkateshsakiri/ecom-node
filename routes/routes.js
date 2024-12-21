const express = require('express');
const routes = express.Router();
const usersCntrl = require('../controllers/usersCntrl');
const categoryCntrl = require('../controllers/categoryCntrl');
const entitlementCntrl = require('../controllers/entitlmentCntrl');
const productCntrl = require('../controllers/productCntrl');

routes.post('/auth/register',usersCntrl.registerUser);
routes.post('/auth/login',usersCntrl.loginUser);
routes.post('/user/entitlements',entitlementCntrl.entitlements);
routes.post('/user/get-entitlements',entitlementCntrl.getEntitlements);


routes.post('/admin/category',categoryCntrl.addCategory);
routes.get('/admin/category',categoryCntrl.getCategory);

routes.post('/admin/product',productCntrl.postProducts)
routes.get('/customer/product',productCntrl.getAllProducts)





module.exports = routes;