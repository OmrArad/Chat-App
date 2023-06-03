import UserPassName from '../model/userNamePass.js';
import UserPass from '../model/userPass.js';
import userPassServices from '../services/userPass.js';
import user from '../model/user.js';

// Create a new UserPassName
const createUser = async (userData) => {
    try {
        // Check that all values are given
        const username = userData.username;
        const password = userData.password;
        const displayName = userData.displayName;
        const profilePic = userData.profilePic;
        // Check if a user with the given username already exists
        const existingUser = await UserPassName.findOne({ username });
        if (existingUser) {
            throw new Error('User with the given username already exists.');
        }
        const newUser = await new UserPassName({
            username,
            password,
            displayName,
            profilePic
        }).save();
        await new user ({
            username,
            displayName,
            profilePic
        }).save();
        await new UserPass ({
            username,
            password
        }).save();

    } catch (error) {
        throw new Error(error.message);
    }
};

// Find a UserPassName by username
const findByUsername = async (username) => {
    try {
        return await UserPassName.findOne({ username });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update a UserPassName by username
const updateByUsername = async (
    username,
    newPassword,
    newDisplayName,
    newProfilePic
) => {
    try {
        return await UserPassName.findOneAndUpdate(
            { username },
            {
                password: newPassword,
                displayName: newDisplayName,
                profilePic: newProfilePic,
            },
            { new: true }
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update password by username
const updatePasswordByUsername = async (username, newPassword) => {
    try {
        return await UserPassName.findOneAndUpdate(
            { username },
            { password: newPassword },
            { new: true }
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update display name by username
const updateDisplayNameByUsername = async (username, newDisplayName) => {
    try {
        return await UserPassName.findOneAndUpdate(
            { username },
            { displayName: newDisplayName },
            { new: true }
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update profile picture by username
const updateProfilePicByUsername = async (username, newProfilePic) => {
    try {
        return await UserPassName.findOneAndUpdate(
            { username },
            { profilePic: newProfilePic },
            { new: true }
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete a UserPassName by username
const deleteByUsername = async (username) => {
    try {
        return await UserPassName.findOneAndDelete({ username });
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserToLogin = async (username, password) => {
    try {
        const token = await userPassServices.getUserToLogin( username, password);
        return token;
    }
    catch (error) {
        throw new Error(error.message);
    }
};

export default {
    createUser,
    findByUsername,
    updateByUsername,
    updatePasswordByUsername,
    updateDisplayNameByUsername,
    updateProfilePicByUsername,
    deleteByUsername,
    getUserToLogin,

};
