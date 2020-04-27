'use strict';
const mongoose = require('mongoose'),
    User = require('../models/User'),
    Room = require('../models/Room');

exports.createDefaultUser = async (userData) => {
    try {
        var defaultUser = User.findOne({userData});
        if (defaultUser === null) {
            User.create(userData, function (err, user, next) {
                if (error){
                    return next(error);
                }
            })
            return console.log('user created');
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

exports.doLogin = function (req, res, next) {
    try {
        if (req.body.username && req.body.password) {
            User.authanticate(req.body.username, req.body.password, function (err, user) {
                if (error || !user) {
                    var err = new Error('Wrong email or password');
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

//for test purposes
exports.whoami = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.send({ message: "Error in Fetching user"});
    }
};
