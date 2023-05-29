const mongoose = require('mongoose')
import User from './user'

// Define the Message schema
const Message = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        required: true,
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

module.exports = mongoose.model('Message', Message);