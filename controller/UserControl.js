const { check, validationResult } = require('express-validator');
const User = require('../model/user');
const Order = require('../model/Order');
const passport = require('passport');
const csrf = require('csurf');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + req.user._id + file.originalname)
    }

})
const upload = multer({ storage: storage })


signup = function (req, res, next) {

    console.log(req.session);
    console.log(req.user);
    var massagesError = req.flash('signupError')
    res.render('user/signup', {title: 'Omar Shopping', massages: massagesError, token: req.csrfToken() });
}

signupPost = [
    check('email').not().isEmpty().withMessage('Please enter you email'),
    check('email').isEmail().withMessage('Please enter vaild email'),
    check('password').not().isEmpty().withMessage('Please enter you password'),
    check('password').isLength({ min: 5 }).withMessage('Please enter password more than 5 char'),
    check('Confirm-Password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('password and Confirm-Password not matched')
        }
        return true;
    })
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /* console.log(errors) */

        var validationMassage = [];
        for (var i = 0; i < errors.errors.length; i++) {
            validationMassage.push(errors.errors[i].msg)
        }

        req.flash('signupError', validationMassage);
        res.redirect('signup');
        return;
    }
    next();
}, passport.authenticate('local-signup', {
    session: false,
    successRedirect: 'signin',
    failureRedirect: 'signup',
    failureFlash: true,
})


profile = function (req, res, next) {

    if (req.user.cart) {
        totalProduct = req.user.cart.totalquantiy;
    } else {
        totalProduct = 0;
    }
    User.findOne({ _id: req.user._id }, (error, user) => {
        if (error) {
            console.log(error)
        }
        if (user) {
            Order.find({ user: req.user._id }, (error, order) => {
                if (error) {
                    console.log(error)
                }
                console.log(order)
                var massagesError = req.flash('profileError');

                var hasMassagesError = false;
                if (massagesError.length > 0) {
                    hasMassagesError = true;
                }
                res.render('user/profile', {title: 'Omar Shopping', checkUser: true, checkProfile: true, items: user, totalProduct: totalProduct, order: order, token: req.csrfToken(), massages: massagesError, hasMassagesError: hasMassagesError, user: req.user, });
            })
        }
    })
}

signin = function (req, res, next) {

    var massagesError = req.flash('signinError')
    res.render('user/signin', {title: 'Omar Shopping', massages: massagesError, token: req.csrfToken() });

}

signinPost = function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /* console.log(errors) */

        var validationMassage = [];
        for (var i = 0; i < errors.errors.length; i++) {
            validationMassage.push(errors.errors[i].msg)
        }

        req.flash('signinError', validationMassage);
        res.redirect('signin');
        return;
    }

    next();
}, passport.authenticate('local-signin', {

    successRedirect: 'profile',
    failureRedirect: 'signin',
    failureFlash: true,
})


logout = function (req, res, next) {

    req.logOut();
    res.redirect('/')

}

updateuser = [
    check('username').not().isEmpty().withMessage('please enter your username'),
    check('email').not().isEmpty().withMessage('please enter your email'),
    check('email').isEmail().withMessage('please enter valid email'),
    check('phoneNumber').not().isEmpty().withMessage('please enter your phone Number'),
    check('address').not().isEmpty().withMessage('please enter your address'),
    check('password').not().isEmpty().withMessage('please enter your password'),
    check('password').isLength({ min: 5 }).withMessage('please enter pssword more than 5 char'),
    check('confirm-password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('password and confirm-password not matched')
        }
        return true;
    })

], function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {


        var validationMassages = [];
        for (var i = 0; i < errors.errors.length; i++) {
            validationMassages.push(errors.errors[i].msg)
        }

        req.flash('profileError', validationMassages);
        console.log(validationMassages)
        res.redirect('profile')

        return;
    } else {
        console.log('user updated')
        console.log('user updated')
        const updatedUser = {
            userName: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            password: new User().hashpassword(req.body.password)
        }
        User.updateOne({ _id: req.user._id }, { $set: updatedUser }, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                console.log(doc);
                res.redirect('profile')
            }
        })
    }

}



module.exports = {
    signup: signup,
    signupPost: signupPost,
    profile: profile,
    signin: signin,
    signinPost: signinPost,
    updateuser: updateuser,
}