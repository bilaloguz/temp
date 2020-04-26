const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: String,
    createdAt: String
});

module.exports = mongoose.model('Room', RoomSchema);