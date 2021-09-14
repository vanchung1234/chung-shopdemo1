const Account = require('../models/Account');
const Cart = require('../models/cart');
const item = require('../models/Items');
const Order = require('../models/Order')
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class CartController {


    cart(req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        item.findById(productId, function(err, product) {
            if (err) {
                console.log(err);
            }
            cart.add(product, product.id);
            req.session.cart = cart;

            res.redirect('/');
        });


    }



    viewcart(req, res, next) {

        if (!req.session.cart) {
            res.render('shopping-cart', { products: null, user: req.user });
        } else {
            var cart = new Cart(req.session.cart);

            res.render('shopping-cart', { products: cart.generateArr(), totalcost: cart.totalcost, user: req.user });
        }


    }

    add(req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        item.findById(productId.trim(), function(err, product) {
            if (err) {
                console.log(err);
            }
            cart.add(product, product.id);
            req.session.cart = cart;

            res.redirect('/cart/shopping-cart/');
        });


    }

    reduce(req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduce(productId);
        req.session.cart = cart;

        res.redirect('/cart/shopping-cart/')
    }

    remove(req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.remove(productId);
        req.session.cart = cart;
        res.redirect('/cart/shopping-cart/')

    }

    checkout(req, res, next) {

        if (!req.session.cart) {
            res.redirect('/cart/shopping-cart/')
        } else {
            var cart = new Cart(req.session.cart);
            res.render('checkout', { products: cart.generateArr(), total: cart.totalcost, user: req.user });
        }


    }

    thanks(req, res, next) {
        var cart = new Cart(req.session.cart);
        var dateFormat = require('dateformat');
        var date = new Date();
        var desc = dateFormat(date, ' HH:mm dd-mm-yyyy');
        var order = new Order({
            user: req.user,
            cart: cart,
            email: req.body.email,
            address: req.body.address,
            name: req.body.name,
            phone: req.body.phone,
            city: req.body.city,
            paymentMethod: req.body.paymentMethod,
            time: desc
        });
        order.save()
            .then((data) => res.render('thanks', {
                layout: 'other',
                data: mongooseToObject(data),
                products: cart.generateArr(),
                user: req.user,
                total: cart.totalcost
            }), req.session.cart = null)
            .catch((error) => {});
    }





}

module.exports = new CartController;