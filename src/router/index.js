const siteRouter = require('./site')
const detailRouter = require('./detail')
const adminRouter = require('./admin')
const usersRouter = require('./user')
const allRouter = require('./allrouter')
const newsRouter = require('./news')
const cartRouter = require('./cart')

const passport = require('passport')



function route(app, passport) {


    app.get('/', isLoggedIn, siteRouter);
    app.use('/news', isLoggedIn, newsRouter)
    app.use('/items', isLoggedIn, detailRouter);
    app.use('/admin', isLoggedIn, adminRouter);
    app.use('/cart', isLoggedIn, cartRouter)
    app.use('/product', isLoggedIn, allRouter)
    app.use('/users', usersRouter)

    function isLoggedIn(req, res, next) {
        // Nếu một user đã xác thực, cho đi tiếp
        if (req.isAuthenticated())
            return next();
        // Nếu chưa, đưa về trang chủ
        res.redirect('/users/login');
    }


}

module.exports = route;