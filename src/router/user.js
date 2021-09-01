const express = require("express");
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
var passport = require('passport')


router.get('/login', usersController.login);
router.post('/login', checkLogin, passport.authenticate("local-login", {

    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));



router.get('/register', usersController.register);
router.post('/register', checkSignUp,passport.authenticate('local-signup', {
    successRedirect: '/users/login', // chuyển hướng tới trang được bảo vệ
    failureRedirect: '/users/register', // trở lại trang đăng ký nếu có lỗi
    failureFlash: true // allow flash messages
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/users/login');
});

function checkLogin(req, res, next) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    
    //validate 
    var errors = req.validationErrors();
    
    if (errors) {
        var message = [];
        errors.forEach(function(error){
            message.push(error.msg);
        });
        res.render('login', { message: message, layout: 'other' });
        
    } else {
        next();
    }
}
function checkSignUp(req, res, next) {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be at least 5 chars long').isLength({ min: 5 });
    req.checkBody('confirmPassword','Confirm Password wrong').equals(req.body.confirmPassword)

    
    //validate 
    var errors = req.validationErrors();
    
    if (errors) {
        var message = [];
        errors.forEach(function(error){
            message.push(error.msg);
        });
        res.render('register', {  message: message,layout: 'other' });
    }    
     else {
        next();
    }
}

module.exports = router;