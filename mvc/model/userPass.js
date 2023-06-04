import mongoose from 'mongoose'

const UserPassSchema = new mongoose.Schema({
    username: {
        type: String,
        nullable: true,
    },
    password: {
        type: String,
        nullable: true,
    },
});

const UserPass = mongoose.model('UserPass', UserPassSchema);

export default UserPass;