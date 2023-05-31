const UserPassName = require('../model/userNamePass');

// Create a new UserPassName
const createUser = async (username, password, displayName, profilePic) => {
    // Check if a user with the given username already exists
    const existingUser = await UserPassName.findOne({ username });
    if (existingUser) {
        throw new Error('User with the given username already exists.');
    }

    try {
        return await new UserPassName({
            username,
            password,
            displayName,
            profilePic,
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

export default {
    createUser,
    findByUsername,
    updateByUsername,
    updatePasswordByUsername,
    updateDisplayNameByUsername,
    updateProfilePicByUsername,
    deleteByUsername,
};