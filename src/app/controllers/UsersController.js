const Account = require('../models/Account');
const { mongooseToObject } = require('../../util/mongoose')

class UsersController {

    login(req, res, next) {
        res.render('login', {
            message: req.flash('loginMessage'),
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
        res.render('profile', {
            user: req.user
        })
    }

    update(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/users/profile'))
            .catch(next)
    }


}

module.exports = new UsersController;