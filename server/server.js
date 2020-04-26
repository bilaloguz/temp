const express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('../routes/routes'),
    path = require('path'),
    server = express();


server.engine('pug', require('pug').__express);
server.set('view engine', 'pug');
server.set('views', path.join(__dirname,'/../views'));
server.use(express.static(path.join(__dirname, '/../static')));
server.use(bodyParser.json());
server.use(routes);

module.exports = server;