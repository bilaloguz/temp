const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header("token");
    if (!token) return res.status('401').json({ message: "Auth Error"});

    try {
        const decoded = jwt.verify(token, "6df743353ede3f30e7a6ed3e1564e4df7485e1f991a4a863d8a51c59f5de06f6");
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Invalid Token"});
        
    }
};