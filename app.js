const mongoose = require('mongoose'),
    User = require('./models/User'),
    server = require('./server/server'),
    controller = require('./controllers/appController'),
    port = 8080;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tempdb', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (err, res) => {
    if (err) throw err;
    else console.log('connection succesful to database');
});

var defaultUser = {
    'username': 'admin',
    'password': 'Deep1479635admin' 
};
//controller.addUser(defaultUser);
//User.create(defaultUser);

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