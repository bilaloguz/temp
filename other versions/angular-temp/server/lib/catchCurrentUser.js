const User = require('../models/User');

module.exports.currentUserIs = async (req, res, next) => {
    try {
        const decodedUser = req.token.data;
        const user = await User.findOne({ _id: decodedUser._id }).exec();
        if (!user) {
            res.status(401).end();
        }
        req.currentUser = user;
        return next();
    } catch (e) {
        return res.json(e).status(500);
    }
} 