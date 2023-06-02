import mongoose from 'mongoose';

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

// Export the User model
export default User;