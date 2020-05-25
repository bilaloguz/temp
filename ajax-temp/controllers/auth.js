require('dotenv').config()
const express = require('express'),
    router = express.Router(),
    auth = require('../middlewares/auth'),
    User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    { check, validationResult } = require('express-validator'),
    bcrypt = require('bcrypt');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { name, password } = req.body;
    try {
        //see if the user exists
        let user = await User.findOne({name});
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Username or password is incorrect'
                }]
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Username or password is incorrect'
                }]
            });
        }
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        }
        jwt.sign(payload,
            process.env.JWT_SECRET, {
            expiresIn: 3600
        },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                })
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;