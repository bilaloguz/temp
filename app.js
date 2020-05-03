const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    User = require('./models/User'),
    flash = require('connect-flash'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    router = require('./routes/route'),
    path = require('path'),
    app = express(),
    { createDefaultUser } = require('./controllers/controller'),
    MongoStore = require('connect-mongo')(session),
    PORT = 3000 || process.env.PORT;

mongoose.connect('mongodb://localhost/tempdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, "db connection error"));
db.once('open', () => {
    console.log('connected to db succesfully');
});
    
createDefaultUser()
app.use(cookieParser("sosecret"));
app.use(session({
        cookie: { maxAge: 60000 },
        resave: false,
        secret: "sosecret",
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: db })
    }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('flashSuccess');
    res.locals.flashError = req.flash('flashError');
    res.locals.passportFailure = req.flash('error');
    res.locals.passportSuccess = req.flash('success');
    res.locals.user = req.user;
    next();
});

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use((req, res, next) => {
    res.render('404');
});


app.listen(PORT, () => {
    console.log('App started succesfully at localhost:%s ', PORT);
});