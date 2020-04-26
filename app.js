const mongoose = require('mongoose'),
    User = require('./models/User'),
    Room =  require('./models/Room'),
    server = require('./server/server'),
    bodyParser = require('body-parser'),
    controller = require('./controllers/appController'),
    port = process.env.PORT || 8080,
    initiateMongoServer = require('./config/db');

mongoose.set('debug', true);
initiateMongoServer();


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