const mongoose = require('mongoose');
    Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;