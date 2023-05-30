const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');
const autoIncrement = require('mongoose-sequence')(mongoose);


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

Chat.plugin(autoIncrement, { id: 'chat_id', inc_field: 'id' });

module.exports = mongoose.model('Chat', Chat);