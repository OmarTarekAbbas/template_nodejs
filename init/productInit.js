const Product = require('../model/Product')
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/Shopping-cart_TWO", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Connected To DB .....')
})

const products = [
    new Product({
        imagePath: '/images/product/15-2.png',
        imagePathTwo: '/images/product/14-15.png',
        producttName: 'SWEATSHIRT Man',
        information: {
            color: "Red",
            size: 'M XL X XXL',
            pieces: 15,
            oldPrice: 1250,
        },
        price: 880,
    }),

    new Product({
        imagePath: '/images/product/14-8.png',
        imagePathTwo: '/images/product/14-7.png',

        producttName: 'Apple iPhone 8',

        information: {
            color: "Brouwn",
            size: 'M XL X ',
            pieces: 3,
            oldPrice: 1000,
        },

        price: 668,
    }),

    new Product({
        imagePath: '/images/product/36.jpg',
        imagePathTwo: '/images/product/25.png',

        producttName: 'Apple iPhone x',

        information: {
            color: "White",
            size: 'M X ',
            pieces: 5,
            oldPrice: 1000,
        },

        price: 999,
    }),

    new Product({
        imagePath: '/images/product/12-11.png',
        imagePathTwo: '/images/product/12-12.png',

        producttName: 'Apple iPhone pro max',

        information: {
            color: "White",
            size: 'M XL X XXL',
            pieces: 2,
            oldPrice: 550,
        },

        price: 330,
    }),

    new Product({
        imagePath: '/images/product/14-16.png',
        imagePathTwo: '/images/product/14-14.png',

        producttName: 'Apple iPhone 11',

        information: {
            color: "Blue",
            size: 'M XL X XXL',
            pieces: 2,
            oldPrice: 2000,
        },

        price: 1000,
    }),

    new Product({
        imagePath: '/images/product/left2.png',
        imagePathTwo: '/images/product/41.jpg',

        producttName: 'Apple iPhone 6',

        information: {
            color: "Grey",
            size: 'M XL X XXL',
            pieces: 10,
            oldPrice: 2000,
        },
        price: 999,
    }),

]

var done = 0;
for (var i = 0; i < products.length; i++) {
    console.log(i)
    products[i].save((error, result) => {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            done++
            if (done === products.length) {
                mongoose.disconnect();
            }
        }
    })
}