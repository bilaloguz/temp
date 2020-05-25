const express = require('express'),
    router = express.Router(),
    auth = require('../middlewares/auth'),
    { check, validationResult } = require('express-validator'),
    Room = require('../models/Room'),
    User = require('../models/User');

router.post('/', [auth, [
    check('name', 'Room name required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        var isMatch = await Room.findOne({
            name: req.body.name
        })
        if (isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Room already exists'
                }]
            });
        }
        const user = await User.findById(req.user.id).select('-password')
        const newRoom = new Room({
            name: req.body.name,
            createdBy: user.name,
        })
        const room = await newRoom.save()
        res.json(room)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.get('/', auth, async (req, res) => {
    try {
        const rooms = await Room.find({}).exec();
        res.json(rooms)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(404).json({
                msg: 'Room not found'
            })
        }
        const room = await Room.find(req.params.id).exec();
        if (!room) {
            return res.status(404).json({
                msg: 'Room not exists'
            })
        }
        res.json(room)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        await room.remove()
        res.json({
            msg: 'The Room has been removed'
        })
    } catch (err) {
        console.error(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                msg: 'Room not found'
            })
        }
        res.status(500).send('Server Error')
    }
})

router.put('/:id', auth, async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            msg: 'Room not found'
        })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const room = await Room.findById(req.params.id).exec();
        const isDuplicate = await Room.findone({ name: req.params.name }).exec();
        if (!room || isDuplicate) {
            return res.status(404).json({
                msg: 'Incorrect room info'
            })
        }
        room.name = req.params.name;
        const updatedRoom = await room.save()
        res.json(updatedRoom);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;