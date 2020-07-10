const passport = require('passport'), 
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    fs = require('fs'),
    path = require('path'),
    User = require('../models/User'),
    keyPath = path.join(__dirname, '..', 'rsaPub.pem'),
    pubKey = fs.readFileSync(keyPath, 'utf8'),
    options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: pubKey,
        audience: 'localhost:4200',
        issuer: 'localhost:3001',
        algorithms: ['RS256']
    };

passport.use(new JWTStrategy(options, function(jwtPayload, done) {
    User.findOne({ _id: jwtPayload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));