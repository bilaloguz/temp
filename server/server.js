const mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('../routes/routes'),
    path = require('path'),
    server = express(),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    initiateMongoServer = require('../config/db');

server.engine('pug', require('pug').__express);
server.set('view engine', 'pug');
server.set('views', path.join(__dirname,'/../views'));
server.use(express.static(path.join(__dirname, '/../static')));
mongoose.set('debug', true);
initiateMongoServer()
var db = mongoose.connection;
server.use(session({
    secret: '32asdsad2132we654sad5a6sd46',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(routes);
server.use(function (req, res, next) {
    var err = new Error('File not found');
    err.status = 404;
    next(err);
});
server.use(function (err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = server;