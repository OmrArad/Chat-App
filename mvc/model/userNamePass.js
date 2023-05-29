const mongoose = require('mongoose')

const UserPassName = new mongoose.Schema({
    username: {
        type: String,
        nullable: true
    },
    password: {
        type: String,
        nullable: true
    },
    displayName: {
        type: String,
        nullable: true
    },
    profilePic: {
        type: String,
        nullable: true
    }
});


module.exports = mongoose.model('UserPassName', UserPassName)