'use strict';
const mongoose = require('mongoose'),
    User  = require('../models/User'),
    Room  = require('../models/Room');

exports.createDefaultUser = function() {
    try {
        var result = User.findOne({name : "admin" });
        if (!result) {
            User.create({ name:"admin", password:"1234" });
            console.log('user created');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.showUsers = async (req, res) => {
    try {
        var allUsers = await User.find().exec();    
        return res.render('u', {users: allUsers});    
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.home = async (req, res) => {
    try {
        var allRooms = await Room.find().exec();    
        return res.render('index', {rooms: allRooms});    
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.addRoom = async (req, res) => {
    try {
        var room = new Room(req.body);
        await room.save();
        return res.redirect('/');        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        var room = await Room.deleteOne({ _id: req.params.id }).exec();
        return res.redirect('/')
    } catch (error) {
        return res.status(500).send(err.message);      
    }
}

exports.showLogin = async (req, res) => {
    try {
        return res.render('login');    
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
};

exports.doLogin = async (req, res, next) => {
    try {
        if (req.body.username && req.body.password) {
            User.authanticate(req.body.username, req.body.password, function (err, user) {
                if (err || !user) {
                    var err = new Error('Wrong name or password');
                    err.status = 401;
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/');
                }
            });
        } else {
            var err = new Error('All fields required');
            err.status = 400;
            return next(err);
        }
    } catch (error) {
        console.log(error)
    }

};

exports.logout = async (req, res, next) => {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        })
    }
};

//for test purposes
exports.whoami = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId).exec(function (error, user) {
            if (error) {
                return console.log(error);//next(error);       
            } else {
                if (user === null ) {
                    var err = new Error('not authorized');
                    err.status= 400;
                    return res.redirect('/login');//next(err);
                }
            }
        });
        res.json(user);
    } catch (error) {
        res.send({ message: "Error in Fetching user"});
    }
};
