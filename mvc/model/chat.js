const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');

// Define the Chat schema
const Chat = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    users: {
        type: [User.schema],
        nullable: true,
    },
    messages: {
        type: [Message.schema],
        nullable: true,
    },
});

module.exports = mongoose.model('Chat', Chat);
