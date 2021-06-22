const Product = require('../model/Product');
const { model } = require('../model/Product');



listProducts = function (req, res, next) {


    const successMas = req.flash('success')[0];
    var totalProduct = 0;
    if (req.isAuthenticated()) {
        if (req.user.cart) {
            totalProduct = req.user.cart.totalquantiy;
        } else {
            totalProduct = 0;
        }
    }


    if (!req.isAuthenticated()) {
        Product.find({}, (error, resualt) => {
            if (error) {
                console.log(error)
            }
            res.render('index', { title: 'Omar Shopping', items: resualt, checkUser: req.isAuthenticated(), totalProduct: totalProduct, successMas: successMas })
        })
        return
    }


    Product.find({}, (error, resualt) => {
        if (error) {
            console.log(error)
        }
        const userCart = req.user.cart;

        res.render('index', { title: 'Omar Shopping', items: resualt, checkUser: req.isAuthenticated(), totalProduct: totalProduct, successMas: successMas, userCart: userCart })
    })
}


product = function (req, res, next) {

    var totalProduct = 0;
    const userCart = "";
    if (req.isAuthenticated()) {
        const userCart = req.user.cart;
        if (req.user.cart) {
            totalProduct = req.user.cart.totalquantiy;
        } else {
            totalProduct = 0;
        }
    }

    Product.findById(req.params.id, (error, product) => {
        if (product) {
            res.render('product', { title: 'Omar Shopping', product: product, checkUser: req.isAuthenticated(), totalProduct: totalProduct, userCart: userCart })

        }


    })

}

module.exports = {
    listProducts: listProducts,
    product: product,
}