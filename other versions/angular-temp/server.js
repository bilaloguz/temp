const express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    path = require('path'),
    { createDefaultUser } = require('./server/controllers/controller'),
    PORT = 3001 || process.env.PORT,
    router = require('./server/routes/routes');

require('dotenv').config();

const app = express();
app.use(cors());

require('./server/config/db');

const User = require('./server/models/User');
const Room = require('./server/models/Room');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

createDefaultUser()

app.use('/api', router);

app.use((req, res, next) => {
    res.status(400).json({
        error:404
    });
});
/*
app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.json({ error: status });
});
*/
app.listen(PORT, () => {
    console.log('Temp REST server started succesfully at localhost:%s ', PORT);
});
