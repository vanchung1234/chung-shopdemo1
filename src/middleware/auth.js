var LocalStrategy = require('passport-local').Strategy;
// load  user model
var User = require('../app/models/Account');
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // mặc định local strategy sử dụng username và password,
            // chúng ta cần cấu hình lại
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // cho phép chúng ta gửi reqest lại hàm callback
        },
        function(req, username, password, done) {
            User.findOne({ 'local.username': username }, function(err, user) {
                if (err)
                    return done(err);
                // if no user is found, return the message
                if (user)

                    return done(null, false, req.flash('signupMessage', 'Người dùng đã tồn tại.'));
                else {
                    var newUser = new User();
                    newUser.local.username = username;
                    newUser.local.password = password;

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser, req.flash('success', 'Đăng ký thành công.'));
                    })
                }


            });

        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) { // callback với username và password từ html form
            // find a user whose username is the same as the forms username
            // we are checking to see if the user trying to login already exists
            // tìm một user với username
            // chúng ta sẽ kiểm tra xem user có thể đăng nhập không
            User.findOne({
                'local.username': username,
                'local.password': password
            }, function(err, user) {
                if (err)
                    return done(err);
                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Sai tên đăng nhập hoặc mật khẩu.'));



                // if the user is found but the password is wrong

                // all is well, return successful user
                return done(null, user);
            });
        }));


};