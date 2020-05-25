require('dotenv').config();
const express = require('express'),
    morgan = require('morgan'),
    path = require('path'),
    mongoose = require('mongoose'),
    PORT = 3000 || process.env.PORT,
    { createDefaultUser } = require('./controllers/defaultUser');
    app = express();

app.use(express.json({
    extended: false
}))

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/static')));
app.use('/api/user', require('./controllers/users'))
app.use('/api/auth', require('./controllers/auth'))
app.use('/api/room', require('./controllers/rooms'))
app.use(require('./controllers/withViews/wViews'))

app.use(morgan("dev"));

const db = mongoose.connection;

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

db.once('open', function () {
    console.log('Connected to MongoDB');
});

db.on('error', function (err) {
    console.error(err);
});

createDefaultUser();


app.listen(PORT, () => {
    console.log('Temp REST server started succesfully at localhost:%s ', PORT);
});
