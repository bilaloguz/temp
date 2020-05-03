
const bcrypt = require('bcryptjs'),
    User = require('../models/User'),
    Room = require('../models/Room'),
    passport = require('passport');

require('../authentication/passport/local');

module.exports.auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'You should sign in first');
        return res.redirect('/login')
    }
}

module.exports.createDefaultUser = () => {
    User.findOne({
        username: "admin"
    }).then(user => {
        if (!user) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash("123456", salt, function (err, hash) {
                    if (err) throw err;
                    const newUser = new User({
                        username: "admin",
                        password: hash
                    });
                    newUser
                        .save()
                        .then(() => {
                            console.log('user created');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    }).catch(err => console.log(err));
}

module.exports.showUserLogin = (req, res, next) => {
    res.render('login');
}

module.exports.doUserLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: '/login',
        failureFlash: true,
        succesFlash: true
    })(req, res, next);
}

module.exports.userLogout = (req, res, next) => {
//    req.session.destroy();
    req.logout();
    req.flash('succes', 'Succesfully logout');
    res.redirect('/login');
}

module.exports.home = async (req, res, next) => {
    try {
        const users = await User.find({}).exec();
        const rooms = await Room.find({}).exec();
        return res.render('index', { users, rooms, flashSuccess: req.flash('flashSuccess') });
    } catch (error) {
        console.log(error);
    }
}

module.exports.addRoom = (req, res, next) => {

    const roomname = req.body.roomname;
    Room.findOne({
        name: roomname
    }).then(room => {
        if (!room) {
            const newRoom = new Room({
                name: roomname
            });
            newRoom
                .save()
                .then(() => {
                    console.log('Room created');
                    res.redirect('/');
                })
                .catch(err => console.log(err));
        } else {
            return console.log("room exists")
        }
    }).catch(err => console.log(err));

}