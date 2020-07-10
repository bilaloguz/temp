
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    User = require('../models/User'),
    Room = require('../models/Room'),
    passport = require('passport'),
    utils = require('../lib/utils');

module.exports.login = async (req, res, next) => {//, err) => {
    try {
        const username = req.body.username,
            password = req.body.password;
//        if (err) {
//            res.status(400).json({ success: false, message: 'Error processing request ' + err });
//        }
        if (!username || !password) {
            console.log("error1");
            return res.status(400).send({ success: false, message: 'incorrect login info' });
        }
        const user = await User.findOne({ username }).exec();
        const user_id = user.id;
        if (!user) {
            console.log("error2");
            return res.status(400).send({ success: false, message: 'Incorrect login credentials' });
        } else {
            const match = await bcrypt.compare(password, user.password);
            if (match ) {//&& !err) {
                var tokenObj = utils.jwtHandler(user);
                console.log(tokenObj);
                res.status(200).send(tokenObj);
            } else {
                console.log("error3");
                return res.status(400).send({ success: false, message: 'Incorrect login credentials' });
            }
        }
    } catch (error) {
        console.log("error4");
        console.log(error);
        return res.status(500).send(error);
    }

}

module.exports.logout = async (req, res, next) => {
    try {
        //req.logout();
        res.status(200).json({
            success: true,
            message: 'Succesfully logout'
        });
    } catch (e) {
        res.status(500).send(e);
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
                        role: "admin"
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

module.exports.getUser =  async (req, res, next) => {
    try {
        var user = await User.findById(req.params.id).exec();
        if (user) {
            res.status(200).json({
                success: true,
                data: user
            });
        } else {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).send(error);
    }

}

module.exports.getUsers =  async (req, res, next) => {
    try {
        var users = await User.find({}).exec();
        if (users) {
            res.status(200).json({
                success: true,
                data: users
            });
        } else {
            res.status(400).json({ success: false, message: 'Users not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }

}

const isAdminCheck = (isAdmin) => {
    if (isAdmin === "on") {
        return isAdmin = true;
    } else {
        return isAdmin = false;
    }
}

module.exports.addUser =  async (req, res, next) => {
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
                        res.send({ success: true, message: 'User succesfully created' });
                    });
                });
            } else {
                res.send({ success: false, message: 'Username already exists' });
            }
        } else {
            res.send({ success: false, message: 'username or password cannot be null' });
        }
    } catch (error) {
        res.status(500).send(error);

    }
}

module.exports.deleteUser =  async (req, res, next) => {
    try {
        var username = req.body.username;
        if (username) {
            var user = await User.findOne({ username: username }).exec();
            if (user) {
                await user.remove();
                res.send({ success: false, message: 'user successfully deleted' });
            } else {
                res.send({ success: false, message: 'User not exists' });
            }
        } else {
            res.send({ success: false, message: 'Username can not be null' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.editUser =  async (req, res, next) => {
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
                                res.status(200).json({ success: true, message: 'User succesfully created' });
                            });
                        });

                    } else {
                        oldUser.username = newUsername;
                        oldUser.isAdmin = isAdminCheck(newIsAdmin);
                        oldUser.save()
                        res.status(200).json({ success: true, message: 'User succesfully created' });
                    }
                } else {
                    res.status(400).json({ success: false, message: 'username cannot be duplicated' });
                }
            } else {
                res.status(400).json({ success: false, message: 'username can not be null' });
            }
        } else {
            res.status(400).json({ success: false, message: 'User not exists or incorrect attempt' });
        }
    } catch (error) {
        res.status(500).send(error);

    }
}

module.exports.getRoom =  async (req, res, next) => {
    try {
        const rooms = await Room.findById(req.params.id).exec();
        if (rooms) {
            res.status(200).json({
                success: true,
                data: rooms
            });
        } else {
            res.status(400).json({ success: false, message: "Rooms not found" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.getRooms =  async (req, res, next) => {
    try {
        const rooms = await Room.find({}).exec();
        if (rooms) {
            res.status(200).json({
                success: true,
                data: rooms
            });
        } else {
            res.status(400).json({ success: false, message: "Rooms not found" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.addRoom =  async (req, res, next) => {
    try {
        console.log(req.toString());
        var room = req.body.roomname;
        if (room) {
            var isDup = await Room.findOne({ name: room }).exec();
            if (!isDup) {
                var room = new Room({ name: room });
                await room.save();
                res.status(200).json({ success: true, message: 'Room succesfully created' });
            } else {
                res.status(400).json({ success: false, message: 'Room already exists' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Room name cannot be null' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.deleteRoom =  async (req, res, next) => {
    try {
        var roomName = req.body.roomName;
        if (roomName) {
            var room = await Room.findOne({ name: roomName }).exec();
            if (room) {
                await room.remove();
                res.status(200).json({ success: true, message: 'Room succesfully deleted' });
            } else {
                res.status(400).json({ success: false, message: 'Room not exists' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Room can not be null' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports.editRoom =  async (req, res, next) => {
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
                    res.status(200).json({ success: true, message: 'Room succesfully updated' });
                } else {
                    res.status(400).json({ success: false, message: 'room cannot be duplicated' });
                }
            } else {
                res.status(400).json({ success: false, message: 'Room name can not be null' });
            }
        } else {
            res.status(400).json({ success: false, message: 'room not exists' });
        }
    } catch (error) {
        res.status(500).send(error);
    }

}