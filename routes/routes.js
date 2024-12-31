const express = require('express');
const routes = express.Router();
const usersCntrl = require('../controllers/usersCntrl');
const categoryCntrl = require('../controllers/categoryCntrl');
const entitlementCntrl = require('../controllers/entitlmentCntrl');
const productCntrl = require('../controllers/productCntrl');
const productDetailsCntrl = require('../controllers/productDetailsCntrl');
const addCartCntrl = require('../controllers/addCartCntrl');

routes.post('/auth/register',usersCntrl.registerUser);
routes.put('/auth/update/:id',usersCntrl.upDateUser);
routes.post('/auth/login',usersCntrl.loginUser);
routes.post('/user/entitlements',entitlementCntrl.entitlements);
routes.post('/user/get-entitlements',entitlementCntrl.getEntitlements);


routes.post('/admin/category',categoryCntrl.addCategory);
routes.get('/admin/category',categoryCntrl.getCategory);
routes.get('/admin/customers-list',usersCntrl.getAllUsers);

routes.post('/admin/product',productCntrl.postProducts);
routes.post('/admin/product-details',productDetailsCntrl.addProductDetails);
routes.get('/customer/product',productCntrl.getAllProducts);
routes.get('/customer/product/:id',productDetailsCntrl.getProductDetailsById);
routes.post('/customer/product/cart',addCartCntrl.addToCart);
routes.get('/customer/product/cart/:id',addCartCntrl.getAllCartItems);







module.exports = routes;