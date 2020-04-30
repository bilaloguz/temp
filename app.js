const mongoose = require('mongoose'),
    app = require('./server/server'),
    { createDefaultUser } = require('./controllers/controller'),
    PORT = 3000 || process.env.PORT;

mongoose.connect('mongodb://localhost/tempdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "db connection error"));
db.once('open', () => {
    console.log('connected to db succesfully');
});

createDefaultUser()

app.listen(PORT, () => {
    console.log('App started succesfully at localhost:%s ', PORT);
});