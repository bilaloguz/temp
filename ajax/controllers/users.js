require('dotenv').config()
const express = require('express'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    router = express.Router(),
    auth = require('../middlewares/auth'),
    { checkRole } = require('../lib/checkRole'),
    { check, validationResult } = require('express-validator'),
    User = require('../models/User');

router.post('/', auth, checkRole('admin'), [
    check('name', 'Username is required').not().isEmpty(),
    check('password', 'Please enter a password with atleast 6 characters').isLength({ min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { name, password } = req.body
    try {
        //see if the user exists
        let user = await User.findOne({
            name
        })
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            });
        }
        user = new User({
            name,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,
            process.env.JWT_SECRET, {
            expiresIn: 360000
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

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find({}).exec();
        res.json(users)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                msg: 'User not found'
            })
        }
        const user = await User.find(req.params.id).exec();
        if (!user) {
            return res.status(404).json({
                msg: 'User not exists'
            })
        }
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        await user.remove()
        res.json({
            msg: 'The User has been removed'
        })
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'User not found'
            })
        }
        res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, checkRole('admin'), async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            msg: 'User not found'
        })
    }
    try {
        const user = await User.findById(req.params.id).exec();
        const isDuplicate = await User.findone({ name: req.params.name }).exec();
        if (!user || isDuplicate) {
            return res.status(404).json({
                msg: 'Incorrect user info'
            })
        }
        if (!req.params.password) {
            user.name = req.params.name;
            user.role = req.params.role;
            const updatedUser = await user.save()
            return res.json(updatedUser);
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.name = req.params.name;
        user.role = req.params.role;
        const updatedUser = await user.save()
        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;