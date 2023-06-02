const Chat = require('../model/chat')
const User = require('../model/user')
const UserNamePass = require('../model/userNamePass')
const Message = require('../model/message')
const userNamePassService = require('./userNamePass')

// Create a new chat
const createChat = async (chatID, username1, username2) => {
    try {
        const userNP1 = await userNamePassService.findByUsername(username1);
        const userNP2 = await userNamePassService.findByUsername(username2);
    } catch (error) {
        throw new Error(error.message);
    }
    if (!userNP1 || !userNP2) {
        throw new Error('User not found.');
    }

    try {
        const user1 = new User({
            username: userNP1.username,
            displayName: userNP1.displayName,
            profilePic: userNP1.profilePic
        })
        const user2 = new User({
            username: userNP2.username,
            displayName: userNP2.displayName,
            profilePic: userNP2.profilePic
        })

        return await new Chat({
            id: chatID,
            users: [user1, user2],
            messages: [],
        }).save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const addMessageToChat = async (chatId, {messageID, created, sender, content}) => {
    try {
        const newMessage = new Message({
            id: messageID,
            created,
            sender,
            content
        });

        return await Chat.findByIdAndUpdate(
            chatId,
            { $push: { messages: newMessage } },
            { new: true }
        );
    } catch (error) {
        throw new Error(error.message);
    }
}

const getChatMessages = async (chatId) => {
    try {
        const chat = await Chat.findOne({ id:chatId });
    } catch (error) {
        throw new Error(error.message);
    }
    if (!chat) {
        throw new Error('Chat not found');
    }

    return chat.messages;
};

const getUserChats = async (username) => {
    try {
        return await Chat.find({ 'users.username': username });
    } catch (error) {
        throw new Error(error.message);
    }
};

export default {
    createChat,
    addMessageToChat,
    getChatMessages,
    getUserChats
    // other CRUD functions...
}