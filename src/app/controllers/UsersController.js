const Account = require('../models/Account');

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


}

module.exports = new UsersController;