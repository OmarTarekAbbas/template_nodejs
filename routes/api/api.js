var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../model/user');
const ApiControl = require('../../controller/ApiControl/ApiControl');
const verif = require("../../verifytoken/verifyToken")

router.get('/omar', ApiControl.omar)


router.get('/product', ApiControl.listProduct)


router.get('/product/:id', ApiControl.product_id)


router.get('/users', ApiControl.listUsers)


router.get('/orders', ApiControl.listOrders)


router.get('/shopping_cart', ApiControl.shoppingCart)


router.post('/signup', ApiControl.signup)


router.post('/signin', ApiControl.signin)


router.post('/updateuse/:id', ApiControl.updateUser)



router.delete('/deleteuse/:id', ApiControl.deleteUser)


router.get('/testToken', verif,ApiControl.testToken);


module.exports = router;
