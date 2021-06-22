const Cart = require('../model/Cart');
const Order = require('../model/Order');
const stripe = require('stripe')('sk_test_51HED0pJP0jrHSsAaRVECVA1IYpmnGlzNA8kocG5K2FgLLamzT6XHwcf2UBQ601uXZOWZgIDPJJdaKobQYBHmc3lF00OLOUlEok');


checkout = function (req, res, next) {

    if (req.user.cart) {
        const userCart = req.user.cart;
        const errorMas = req.flash('error')[0]
        res.render('checkout', { title: 'Omar Shopping', checkUser: req.isAuthenticated(), totalProduct: req.user.cart.totalquantiy, totalprice: userCart.totalPrice, errorMas: errorMas, user: req.user, userCartec: userCart, userCart: userCart })
    } else {
        res.redirect('/carts/shopping_cart')
    }
}

checkoutPost = function (req, res, next) {

    const userCart = req.user.cart.totalPrice;
    stripe.charges.create(
        {
            amount: userCart * 100,
            currency: "usd",
            source: req.body.stripeToken,
            description: "charge for test@example.com"
        },
        function (err, charge) {
            if (err) {
                console.log(err.raw.message);
                req.flash('error', err.raw.message);
                res.redirect('/orders/checkout');
            }
            console.log(charge);
            req.flash('success', 'Successfuly Bought Product Please Go To Order Page And Check Order !!!')

            const order = new Order({
                user: req.user._id,
                cart: req.user.cart,
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                orderprice: req.user.cart.totalPrice,
                paymentId: charge.id

            });
            order.save((err, order) => {
                if (err) {
                    console.log("omar error " + err)
                }
                else {
                    console.log("omarorder " + order)
                    Cart.deleteOne({ _id: req.user.cart._id }, (err, doc) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(doc)
                        res.redirect('/#successorders');
                    })
                }
            })

        }
    );
}

orders = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/users/signin');
        return
    }
    Order.find({ user: req.user._id }, (error, order) => {
        if (error) {
            console.log(error)
        }
        console.log(order)
        const userCart = req.user.cart;
        if (req.isAuthenticated()) {
            if (req.user.cart) {
                totalProduct = req.user.cart.totalquantiy;
            } else {
                totalProduct = 0;
            }
        }

        res.render('order', { title: 'Omar Shopping', checkUser: true, totalProduct: totalProduct, order: order, user: req.user, userCart: userCart });
    })
}


module.exports = {
    checkout: checkout,
    checkoutPost: checkoutPost,
    orders: orders,
}