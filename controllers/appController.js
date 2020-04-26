const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Room = mongoose.model('Room'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    auth = require('../middleware/auth');

exports.createDefaultUser = async (username, password) => {
    user = new User({
        username,
        password
    })
    var defaultUser = User.findOne({ username: username });
    if (!defaultUser) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
    }
};

exports.home = async (req, res) => {
    try {
        var allRooms = await Room.find().exec();    
        return res.render('home', {rooms: allRooms});    
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

exports.doLogin = async (req, res) => {

    const { username, password } = req.body;
    try {
        let user = await User.findOne({
            username
        });
        if (!user)
            return res.status(400).json({
                message: "User not exist"
            });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "6df743353ede3f30e7a6ed3e1564e4df7485e1f991a4a863d8a51c59f5de06f6",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
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
