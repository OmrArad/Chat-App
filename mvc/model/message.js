const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose);
const User = require('./user')

// Define the Message schema
const Message = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    sender: {
        type: User,
        required: true,
    },
    content: {
        type: String,
        nullable: true,
    },
});

Message.plugin(autoIncrement, { id: 'message_id', inc_field: 'id' });

module.exports = mongoose.model('Message', Message);