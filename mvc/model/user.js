const mongoose = require('mongoose');

// Define the User schema
const User = new mongoose.Schema({
    username: {
        type: String,
        nullable: true,
    },
    displayName: {
        type: String,
        nullable: true,
    },
    profilePic: {
        type: String,
        nullable: true,
    },
});

module.exports = mongoose.model('User', User);