const mongoose = require('mongoose');

const MONGOURI = 'mongodb://localhost:27017/tempdb';

const initiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('connection succesful to database');
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = initiateMongoServer;