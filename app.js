'use strict';

const mongoose = require('mongoose'),
//    { User } = require('./models/User'),
//    { Room } =  require('./models/Room'),
    server = require('./server/server'),
    controller = require('./controllers/controller'),
    port = process.env.PORT || 1234;

controller.createDefaultUser()

class TempoApp {
    run() {
        try {
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