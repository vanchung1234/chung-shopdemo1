const express = require('express')
const app = express()

const path = require('path');
const exphbs = require('express-handlebars');
const route = require('./router');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport')
var flash = require('connect-flash');
const Handlebars = require('handlebars')
var expressValidator = require('express-validator');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const MongoStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const paginateHelper = require('express-handlebars-paginate');
Handlebars.registerHelper('paginateHelper', paginateHelper);

app.use(expressValidator()); //this line to be addded





app.engine('hbs', exphbs({
    extname: ".hbs",
    helpers: {
        sum: (a, b) => a + b,

    },


    handlebars: allowInsecurePrototypeAccess(Handlebars),


}));





require('./middleware/auth')(passport);


app.use(cookieParser());

app.use(session({
    secret: 'ilovescodetheworld',
    name: 'session cookie user',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),

})); // chuối bí mật đã mã hóa coookie

// app.use(function(req, res, next) {
//     res.locals.session = req.session;
//     next();
// });

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(methodOverride('_method'));

require('./middleware/auth')
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.urlencoded());


route(app);

app.use(express.static(__dirname + '/public'));
app.set('view options', { layout: 'other' });


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'source/views'));




app.listen(process.env.PORT || 3000);