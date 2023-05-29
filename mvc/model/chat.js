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
        type: [User],
        nullable: true,
    },
    messages: {
        type: [Message],
        nullable: true,
    },
});

module.exports = mongoose.model('Chat', Chat);
