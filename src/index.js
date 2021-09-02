const express = require('express')
const app = express()

const path = require('path');
const exphbs = require('express-handlebars');
const route = require('./router');
const db = require('./config/db/index');
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
require('./middleware/auth')

route(app);

require('./middleware/auth')(passport);

db.connect();



app.engine('hbs', exphbs({
    extname: ".hbs",
    helpers: {
        sum: (a, b) => a + b,

    },


    handlebars: allowInsecurePrototypeAccess(Handlebars),


}));



app.use(expressValidator()); //this line to be addded




app.use(cookieParser());

app.use(session({
    secret: 'ilovescodetheworld',
    name: 'session cookie user',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),

})); // chuối bí mật đã mã hóa coookie

app.use(function(req, res, next) {

    res.locals.session = req.session;
    next();
});

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(methodOverride('_method'));


app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.urlencoded());




app.use(express.static(__dirname + '/public'));
app.set('view options', { layout: 'other' });


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'source/views'));




app.listen(process.env.PORT || 3000);