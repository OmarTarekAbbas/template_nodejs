const Cart = require('../model/Cart');
const Product = require('../model/Product');


addtoCard = function (req, res, next) {

    const UserId = req.user._id;
    let newProductPrice = ""
    let newProduct = "";
    Product.findById(req.params.id, (error, product) => {

        newProductPrice = parseInt(product.price, 10);
        newProduct = {
            _id: product._id,
            price: newProductPrice,
            name: product.producttName,
            image: product.imagePath,
            localPrice: product.price,
            quantity: 1,
        }


        Cart.findById(UserId, (error, cart) => {

            if (error) {
                console.log(error)
            }

            if (!cart) {
                const newCart = new Cart({

                    _id: UserId,
                    totalquantiy: 1,
                    totalPrice: newProductPrice,
                    selectedProduct: [newProduct],
                    createAt: Date.now(),

                })
                newCart.save((error, resualt) => {
                    if (error) {
                        console.log(error)

                    }
                    console.log(resualt)
                })

            }

            if (cart) {
                var indexOfOroduct = -1;
                for (var i = 0; i < cart.selectedProduct.length; i++) {
                    if (product._id.toString() == cart.selectedProduct[i]._id.toString()) {
                        console.log("omartarek")
                        indexOfOroduct = i;
                        break;
                    }
                }
                if (indexOfOroduct >= 0) {
                    console.log('update product')
                    cart.selectedProduct[indexOfOroduct].quantity = cart.selectedProduct[indexOfOroduct].quantity + 1;
                    cart.selectedProduct[indexOfOroduct].price = cart.selectedProduct[indexOfOroduct].price + newProductPrice;
                    cart.totalquantiy = cart.totalquantiy + 1;
                    cart.totalPrice = cart.totalPrice + newProductPrice;
                    cart.createAt = Date.now();
                    Cart.updateOne({ _id: UserId }, { $set: cart }, (error, doc) => {
                        if (error) {
                            console.log(error)
                        }
                        console.log(doc)
                        console.log(cart)
                    })
                } else {
                    console.log('add product')
                    cart.totalquantiy = cart.totalquantiy + 1;
                    cart.totalPrice = cart.totalPrice + newProductPrice;
                    cart.selectedProduct.push(newProduct);
                    cart.createAt = Date.now();
                    Cart.updateOne({ _id: UserId }, { $set: cart }, (error, doc) => {
                        if (error) {
                            console.log(error)
                        }
                        console.log(doc)
                        console.log(cart)
                    })
                }
            }

        })
    })
    res.redirect('/');
}



shoppingCart = function (req, res, next) {

    if (!req.isAuthenticated()) {
        res.redirect('/users/signin');
        return
    }
    if (!req.user.cart) {
        res.render('cart', { title: 'Omar Shopping', checkUser: req.isAuthenticated(), totalProduct: 0 })
        return
    }
    const userCart = req.user.cart;
    var totalProduct = 0;
    if (req.isAuthenticated()) {
        if (req.user.cart) {
            totalProduct = req.user.cart.totalquantiy;
        } else {
            totalProduct = 0;
        }
    }
    res.render('cart', { title: 'Omar Shopping', userCart: userCart, checkUser: req.isAuthenticated(), totalProduct: totalProduct })
}

increaseProduct = function (req, res, next) {

    if (req.user.cart) {
        const index = req.params.index;
        const userCart = req.user.cart;
        const ProductPrice = userCart.selectedProduct[index].price / userCart.selectedProduct[index].quantity

        userCart.selectedProduct[index].quantity = userCart.selectedProduct[index].quantity + 1;
        userCart.selectedProduct[index].price = userCart.selectedProduct[index].price + ProductPrice;

        userCart.totalquantiy = userCart.totalquantiy + 1;
        userCart.totalPrice = userCart.totalPrice + ProductPrice;
        userCart.createAt = Date.now();
        Cart.updateOne({ _id: userCart._id }, { $set: userCart }, (error, doc) => {
            if (error) {
                console.log(error)
            }
            console.log(doc)
            res.redirect('/carts/shopping_cart')
        })
    } else {
        res.redirect('/carts/shopping_cart')
    }

}

decreaseProduct = function (req, res, next) {

    if (req.user.cart) {
        const index = req.params.index;
        const userCart = req.user.cart;
        const ProductPrice = userCart.selectedProduct[index].price / userCart.selectedProduct[index].quantity

        userCart.selectedProduct[index].quantity = userCart.selectedProduct[index].quantity - 1;
        userCart.selectedProduct[index].price = userCart.selectedProduct[index].price - ProductPrice;

        userCart.totalquantiy = userCart.totalquantiy - 1;
        userCart.totalPrice = userCart.totalPrice - ProductPrice;
        userCart.createAt = Date.now();
        Cart.updateOne({ _id: userCart._id }, { $set: userCart }, (error, doc) => {
            if (error) {
                console.log(error)
            }
            console.log(doc)
            res.redirect('/carts/shopping_cart')
        })
    } else {
        res.redirect('/carts/shopping_cart')
    }

}


deleteProduct = function (req, res, next) {

    if (req.user.cart) {
        const index = req.params.index;
        const userCart = req.user.cart;

        if (userCart.selectedProduct.length <= 1) {
            Cart.deleteOne({ _id: userCart._id }, (err, doc) => {
                if (err) {
                    console.log(err)
                }
                console.log(doc)
                res.redirect('/carts/shopping_cart')
            })
        } else {
            userCart.totalPrice = userCart.totalPrice - userCart.selectedProduct[index].price;
            userCart.totalquantiy = userCart.totalquantiy - userCart.selectedProduct[index].quantity;

            userCart.selectedProduct.splice(index, 1);
            userCart.createAt = Date.now();
            Cart.updateOne({ _id: userCart._id }, { $set: userCart }, (error, doc) => {
                if (error) {
                    console.log(error)
                }
                console.log(doc)
                res.redirect('/carts/shopping_cart')
            })
        }
    } else {
        res.redirect('/carts/shopping_cart')
    }

}


module.exports = {
    addtoCard: addtoCard,
    shoppingCart: shoppingCart,
    increaseProduct: increaseProduct,
    decreaseProduct: decreaseProduct,
    deleteProduct: deleteProduct,
}