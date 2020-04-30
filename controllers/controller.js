
const bcrypt = require('bcryptjs'),
    User = require('../models/User'),
    Room = require('../models/Room'),
    passport = require('passport');

require('../authentication/passport/local');

module.exports.createDefaultUser = () => {
    User.findOne({
        username: "admin"
    }).then(user => {
        if (!user) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash("123admin456", salt, function(err, hash) {
                    if (err) throw err;
                    const newUser = new User({
                        username: "admin",
                        password: hash
                    });
                    newUser
                        .save()
                        .then(() => {
                            console.log('user created');
                            res.redirect('/');
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
    req.logout();
    req.flash('succes', 'Succesfully logout');
    res.redirect('/login');
}

module.exports.home = (req, res, next) => {
    User.find({})
        .then(users => {
            res.render('index', {users, flashSuccess : req.flash('flashSuccess')});
        })
        .catch(err => console.log(err));
}

module.exports.addRoom = (req, res, next) => {
    const roomname = req.body.roomname;
    Room.findOne({
        name: roomname
    }).then(room => {
        if (!room) {
            const newRoom = new Room({
                username: roomname
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