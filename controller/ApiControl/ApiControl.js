const Product = require('../../model/Product');
const User = require('../../model/user');
const Order = require('../../model/Order');
const { registerValidation, LoginValidation } = require("../../validation/validation")
const bcrypt = require('bcrypt');
const Jwt = require("jsonwebtoken");

omar = function (req, res, next) {
    res.status(200).json({
        massage: 'omar ok !!!'
    })
}

listProduct = function (req, res, next) {
    Product.find({}, ('imagePath producttName price information')).
        then(document => {
            const response = {
                product: document.map(docResult => {
                    return {
                        _id: docResult._id,
                        image: docResult.imagePath,
                        name: docResult.producttName,
                        price: docResult.price,
                        information: docResult.information,
                        url: {
                            type: "GET",
                            urls: "http://localhost:3000/api/product/" + docResult._id,
                        }
                    }
                })
            }
            res.status(200).json({
                Products: response,
            })
        }).
        catch(error => {
            res.status(404).json({
                massage: "error Products"
            })
        })
}


product_id = function (req, res, next) {
    Product.findById(req.params.id, (error, resualt) => {
        if (error) {
            res.status(404).json({
                massage: "error product"

            })
        }
        res.status(200).json({
            product: resualt
        })
    })

}


listUsers = function (req, res, next) {
    User.find({}, (''), (error, resualt) => {
        if (error) {
            res.status(404).json({
                massage: "error users"
            })
        }
        res.status(200).json({
            users: resualt
        })
    })
}


shoppingCart = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(404).json({
            Massage: "Please login"
        })
    }
}


signup = function (req, res, next) {

    const { error } = registerValidation(req.body);

    if (error) {
        res.status(404).json({
            Massage: error.details[0].message
        })
    } else {
        const user = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: new User().hashpassword(req.body.password)
        });

        User.findOne({ email: req.body.email }, (err, result) => {
            if (err) {
                res.status(404).json({
                    Massage: err
                })
            }
            if (result) {
                console.log('this email already exist')
                res.status(404).json({
                    Massage: 'this email already exist'
                })
                return;
            }
            user.save().
                then(result => {
                    res.status(200).json({
                        User: result
                    })
                })
                .catch(err => {
                    res.status(404).json({
                        Massage: err
                    })
                })
        })
    }




}


signin = function (req, res, next) {
    const { error } = LoginValidation(req.body);

    if (error) {
        res.status(404).json({
            Massage: error.details[0].message
        })
    } else {
        User.findOne({ email: req.body.email }).
            then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password).
                        then(result => {
                            if (result) {
                                const token = Jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
                                res.header('auth-token', token)
                                res.status(200).json({
                                    User: user,
                                    Token:token
                                })
                            } else {
                                res.status(404).json({
                                    Massage: "woring password"
                                })
                            }
                        })
                } else {
                    res.status(404).json({
                        Massage: "Email Is Not Found"
                    })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({
                    Massage: error
                })
            })
    }


}


updateUser = function (req, res, next) {

    const newUser = {
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        password: new User().hashpassword(req.body.password)
    };

    User.findOneAndUpdate({ _id: req.params.id }, { $set: newUser })
        .then(result => {
            if (result) {
                res.status(202).json({
                    user: result
                })
            } else {
                res.status(404).json({
                    Massage: "User Not Found"
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                Massage: err
            })

        })
}


deleteUser = function (req, res, next) {

    User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.status(404).json({
                Massage: err
            })
        }
        if (result) {
            res.status(200).json({
                user: "User Delete"
            })
        } else {
            res.status(404).json({
                Massage: "User Not Found"
            })
        }
    })

}


listOrders = function (req, res, next) {
    Order.find({})
        .then(result => {
            res.status(200).json({
                Orders: result
            })
        })
        .catch(error => {
            res.status(404).json({
                massage: error
            })
        })
}

testToken = function (req, res, next) {
    // res.status(200).json({
    //     massage: req.user
    // })

    User.findOne({ _id: req.user }, (error, user) => {
        if (error) {
            console.log(error)
        }
        if (user) {
            res.status(200).json({
                massage: user
            })
        } else {
            res.status(404).json({
                massage: "Tokin error"
            })
        }
    })
}







module.exports = {
    omar: omar,
    listProduct: listProduct,
    listUsers: listUsers,
    shoppingCart: shoppingCart,
    signup: signup,
    signin: signin,
    updateUser: updateUser,
    deleteUser: deleteUser,
    product_id: product_id,
    listOrders: listOrders,
    testToken: testToken,
}