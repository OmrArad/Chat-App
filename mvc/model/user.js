import mongoose from 'mongoose';

// Define the User schema
const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('User', UserSchema);
// Export the User model
export default User;