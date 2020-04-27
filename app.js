'use strict';

const mongoose = require('mongoose'),
    User = require('./models/User'),
    Room =  require('./models/Room'),
    server = require('./server/server'),
    controller = require('./controllers/appController'),
    port = process.env.PORT || 3000,
    initiateMongoServer = require('./config/db');

mongoose.set('debug', true);
initiateMongoServer();

class TempoApp {
    run() {
        try {
            var result = controller.createDefaultUser(
                '{"username":"admin","password":"1234"}'
                );
            console.log(result);
            server.listen(port, () => {
                console.log('server runs at localhost:%s', port);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

var svr = new TempoApp();
svr.run();