var express = require('express');
var router = express.Router();
const ProductControl = require('../controller/ProductControl');

router.get('/', ProductControl.listProducts)

router.get('/product/:id', ProductControl.product)

module.exports = router; 