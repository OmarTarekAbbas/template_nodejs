var express = require('express');
var router = express.Router();

const OrderControl = require('../controller/OrderControl');


router.get('/checkout/', OrderControl.checkout)


router.post('/checkout', OrderControl.checkoutPost)

router.get('/orders', OrderControl.orders)

module.exports = router;