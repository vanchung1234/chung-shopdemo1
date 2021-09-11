const Account = require('../models/Account');
const Cart = require('../models/cart')
const item = require('../models/Items');


class CartController {


    cart(req, res, next) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        item.findById(productId.trim(), function(err, product) {
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
            res.render('checkout', { total: cart.totalcost, user: req.user });
        }


    }





}

module.exports = new CartController;