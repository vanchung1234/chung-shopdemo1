const Account = require('../models/Account');
const Order = require('../models/Order');
const Cart = require('../models/cart');

const { mongooseToObject } = require('../../util/mongoose')

class UsersController {

    login(req, res, next) {
        res.render('login', {
            message: req.flash('loginMessage'),
            success: req.flash('success'),
            layout: 'other'

        });

    }




    register(req, res, next) {
        res.render('register', {
            message: req.flash('signupMessage'),
            layout: 'other',

        });
    }

    profile(req, res, next) {
        Order.find({ user: req.user }, function(err, orders) {
            if (err) {
                return res.write('Error!');
            }
            let cart;

            orders.forEach(function(order) {
                cart = new Cart(order.cart);
                order.items = cart.generateArr();
                order.totalcost = order.cart.totalcost;
            });

            res.render('profile', { orders: orders, user: req.user });
        });
    }

    update(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/users/profile'))
            .catch(next)
    }


}

module.exports = new UsersController;