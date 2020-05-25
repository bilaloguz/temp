
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
        return res.redirect('/login');
    }
}

module.exports.home = async (req, res, next) => {
    try {
        const users = await User.find({}).exec();
        const rooms = await Room.find({}).exec();
        return res.render('index', { users, rooms, flashSuccess: req.flash('flashSuccess') });
    } catch (e) {
        console.log(e);
    }
}

module.exports.showUserLogin = async (req, res, next) => {
    try {
        if (!req.user) {
            res.render('login');
        } else {
            req.flash('error', 'you are already signed in');
            return res.redirect('/');
        }
    } catch (error) {
        console.log(error);
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
                        password: hash,
                        isAdmin: true
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

module.exports.doUserLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: '/login',
        failureFlash: true,
        succesFlash: true
    })(req, res, next);
}

module.exports.userLogout = async (req, res, next) => {
    try {
        req.logout();
        req.flash('succes', 'Succesfully logout');
        res.redirect('/login');
    } catch (e) {
        console.log(e)
    }

}

const isAdminCheck = (isAdmin) => {
    if (isAdmin === "on") {
        return isAdmin = true;
    } else {
        return isAdmin = false;
    }
}

module.exports.addUser = async (req, res, next) => {
    try {
        const username = req.body.username,
            password = req.body.password;
        var isAdmin = req.body.isAdmin;
        if (username && password) {
            var isDup = await User.findOne({ username: username }).exec();
            if (!isDup) {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        const newUser = new User({
                            username: username,
                            password: hash,
                            isAdmin: isAdminCheck(isAdmin)
                        });
                        newUser.save();
                        req.flash('success', 'User succesfully created');
                        res.redirect('/');
                    });
                });
            } else {
                req.flash('error', 'username already exists');
                res.redirect('/');
            }
        } else {
            req.flash('error', 'username or password cannot be null');
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);

    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        var username = req.body.username;
        if (username) {
            var user = await User.findOne({ username: username }).exec();
            if (user) {
                await user.remove();
                req.flash('success', 'user successfully deleted')
                res.redirect('/')
            } else {
                req.flash('error', 'User not exists');
                res.redirect('/');
            }
        } else {
            req.flash('error', 'Username can not be null');
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.editUser = async (req, res, next) => {
    try {
        const oldUsername = req.body.oldUsername,
            newUsername = req.body.newUsername,
            newPassword = req.body.newPassword,
            newIsAdmin = req.body.newIsAdmin;
        if (oldUsername && newUsername) {
            var oldUser = await User.findOne({ username: oldUsername }).exec();
            if (oldUser) {
                var newUser = await User.findOne({ username: newUsername }).exec();
                if (!newUser || newUser.username === oldUser.username) {
                    if (newPassword) {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(newPassword, salt, function (err, hash) {
                                if (err) throw err;
                                oldUser.username = newUsername;
                                oldUser.password = hash;
                                oldUser.isAdmin = isAdminCheck(newIsAdmin);
                                oldUser.save()
                                req.flash('succes', 'User succesfully created');
                                res.redirect('/');
                            });
                        });

                    } else {
                        oldUser.username = newUsername;
                        oldUser.isAdmin = isAdminCheck(newIsAdmin);
                        oldUser.save()
                        req.flash('succes', 'User succesfully created');
                        res.redirect('/');
                    }
                } else {
                    req.flash('error', 'username cannot be duplicated');
                    res.redirect('/');
                }
            } else {
                req.flash('error', 'username can not be null');
                res.redirect('/');
            }
        } else {
            req.flash('error', 'User not exists or incorrect attempt');
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);

    }
}

module.exports.addRoom = async (req, res, next) => {
    try {
        var room = req.body.roomname;
        if (room) {
            var isDup = await Room.findOne({ name: room }).exec();
            if (!isDup) {
                var room = new Room({ name: room });
                await room.save();
                req.flash('success', 'Room succesfully created')
                res.redirect('/')
            } else {
                req.flash('error', 'Room already exists');
                res.redirect('/');
            }
        } else {
            req.flash('error', 'Room name cannot be null');
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteRoom = async (req, res, next) => {
    try {
        var roomName = req.body.roomName;
        if (roomName) {
            var room = await Room.findOne({ name: roomName }).exec();
            if (room) {
                await room.remove();
                req.flash('success', 'room deleted')
                res.redirect('/')
            } else {
                req.flash('error', 'Room not exists');
                res.redirect('/');
            }
        } else {
            req.flash('error', 'Room can not be null');
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.editRoom = async (req, res, next) => {
    try {
        const oldRoom = req.body.oldRoomName,
            newRoom = req.body.newRoomName;
        if (oldRoom && newRoom) {
            var oRoom = await Room.findOne({ name: oldRoom }).exec();
            if (oRoom) {
                var nRoom = await Room.findOne({ name: newRoom }).exec();
                if (!nRoom || nRoom.name === oRoom.name) {
                    oRoom.name = newRoom;
                    oRoom.save()
                    req.flash('')
                    res.redirect('/')
                } else {
                    req.flash('error', 'room cannot be duplicated');
                    res.redirect('/');
                }
            } else {
                req.flash('error', 'room name can not be null');
                res.redirect('/');
            }
        } else {
            req.flash('error', 'requested room not exists');
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }

}