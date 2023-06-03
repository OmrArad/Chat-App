import mongoose from 'mongoose'

const UserPass = new mongoose.Schema({
    username: {
        type: String,
        nullable: true,
    },
    password: {
        type: String,
        nullable: true,
    },
});

const UserPassSchema = mongoose.model('UserPass', UserPass);

export default UserPassSchema;