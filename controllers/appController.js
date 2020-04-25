const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

exports.checkUser = async (userData) => {
    try {
        var user = JSON.parse(userData);
        var result = await User.findOne({ 'username': user.username }).exec();
        if (result !== '{}') {
            var passw = bcrypt.hash(user.password, 10);
            if (passw === result.password ) {
                console.log('OK');
            } 
        }
        console.log(result.password);
    } catch (error) {
        return error;        
    }
};

exports.requiresLogin = async (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    }
};

exports.addUser = async (userData) => {
    try {
        var result = await User.findOne(userData).exec();
        if (result === '{}') {
            var user = new User(userData);
            var result = await user.save();
            console.log(result);
        } else {
            console.log('user exists');
        }
    } catch (error) {
        console.log(error);
    }
};

/*exports.homePageStuff = async (res,req) => {

}*/