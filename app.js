const mongoose = require('mongoose'),
    app = require('./server/server'),
    session = require('express-session'),
    { createDefaultUser } = require('./controllers/controller'),
    MongoStore = require('connect-mongo')(session),
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

app.use(
    session({
        cookie: { maxAge: 60000 },
        resave: false,
        secret: "sosecret",
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: db })
    })
);

app.listen(PORT, () => {
    console.log('App started succesfully at localhost:%s ', PORT);
});