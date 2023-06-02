import mongoose from 'mongoose';


const UserPassNameSchema = new mongoose.Schema({
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

const UserPassName = mongoose.model('UserPassName', UserPassNameSchema);

export default UserPassName;