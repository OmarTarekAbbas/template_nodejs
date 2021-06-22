var express = require('express');
var router = express.Router();
const CartControl = require('../controller/CartControl');


router.get('/addtocard/:id', CartControl.addtoCard)


router.get('/shopping_cart', CartControl.shoppingCart)


router.get('/increaseproduct/:index', CartControl.increaseProduct)


router.get('/decreaseproduct/:index', CartControl.decreaseProduct)


router.get('/deleteproduct/:index', CartControl.deleteProduct)

module.exports = router;
