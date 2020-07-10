const mongoose = require('mongoose');

require('dotenv').config();

const conn = 'mongodb://localhost/tempdb';//process.env.DB;

mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', (error) => {
    console.log('db error', error);
});
mongoose.connection.on('connected', () => {
    console.log('db connected');
});

mongoose.Promise = global.Promise;