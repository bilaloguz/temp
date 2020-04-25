const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: username }).exec(function (err, user) {
        if (err) {
            return callback(err)
        } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result){
            if (result === true) {
                return callback(null, user);
            } else{
                return callback();
            }
        });
    });
}

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
    
});

module.exports = mongoose.model('User', UserSchema);