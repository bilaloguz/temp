'use strict';

const mongoose = require('mongoose');
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password:{ 
        type: String,
        required: true
    }
});

UserSchema.statics.authanticate = function (username, password, callback) {
    User.findOne({ username: username })
    .exec(function (err, user) {
        if (err) {
            return callback(err)
        } else if (!user) {
            var err = new Error('User not found');
            err.status(401);
            return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result){
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    });
}

UserSchema.pre('save', function (err, hash) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
