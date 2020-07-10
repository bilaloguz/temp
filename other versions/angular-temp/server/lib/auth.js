const jwt = require('express-jwt'),
    path = require('path'),
    keyPath = path.join(__dirname, '..', 'rsaPub.pem'),
    fs = require('fs'),
    pubKey = fs.readFileSync(keyPath, 'utf8');

const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        console.log(req.headers);
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        console.log(req.query.token, "22");
        
        return req.query.token;       
    } else {
        return null;
    }
}

module.exports.isAuth = jwt({
    secret: pubKey,
    userProperty: 'token',
    getToken: getTokenFromHeader
});