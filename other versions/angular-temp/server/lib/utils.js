const jwt = require('jsonwebtoken'),
    fs = require('fs'),
    path = require('path'),
    keyPath = path.join(__dirname, '..', 'rsaP.pem'),
    pKey = fs.readFileSync(keyPath, 'utf8');

function jwtHandler(user) {
    const _id = user.id,
        isAdmin = user.isAdmin,
        username = user.username, 
        expiresIn = '1d',
        payload = {
            sub: _id,
            iat: Date.now(),
            isAdmin: isAdmin,
            username: username
        };
    var signedToken = jwt.sign(payload, pKey, { expiresIn: expiresIn, algorithm: 'RS256' });
    return {
        success: true,
        mesage: 'Auth successful',   
        token: signedToken,
        expires: expiresIn,
        id: _id
    }
}

module.exports.jwtHandler = jwtHandler;