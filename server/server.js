const express = require('express'),
    bodyParser = require('body-parser'),
    User = require('../models/User'),
    flash = require('connect-flash'),
    passport = require('passport'),
    router = require('../routes/route'),
    path = require('path'),
    app = express();

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
app.set('views', path.join(__dirname,'/../views'));
app.use(express.static(path.join(__dirname, '/../static')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.use((req, res, next) => {
    res.render('404');
});

module.exports = app;