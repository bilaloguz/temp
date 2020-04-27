'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: String
    }
});

var Room = mongoose.model('Room', roomSchema);
module.exports = Room;