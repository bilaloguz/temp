const express = require('express'),
    routes = require('../routes/routes'),
    path = require('path'),
    session = require('express-session'),
    server = express();

server.use(session({
    secret: '12d625dsaaa65asdasd262ad2sdsdasf65SAsdAD',
    resave: true,
    saveUninitialized: false
}));
server.engine('pug', require('pug').__express);
server.set('view engine', 'pug');
server.set('views', path.join(__dirname,'/../views'));
server.use(express.static(path.join(__dirname, '/../static')));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
//server.use(express.status)
server.use(routes);

module.exports = server;