import Chat from '../model/chat.js';
import Message from '../model/message.js';
import User from '../model/user.js';
import userNamePassService from '../services/userNamePass.js';

// Create a new chat
const createChat = async (username1, username2) => {
    try {
        const userNP1 = await userNamePassService.findByUsername(username1.username);
        const userNP2 = await userNamePassService.findByUsername(username2.username);

        if (!userNP1 || !userNP2) {
            throw new Error('User not found.');
        }

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

        const newChat = await new Chat({
            users: [user1, user2],
            messages: [],
        }).save();

        console.log(newChat);

        return { user2 };

    } catch (error) {
        throw new Error(error.message);
    }
};

const addMessageToChat = async (chatId, { messageID, created, sender, content }) => {
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
        const chat = await Chat.findOne({ id: chatId }).messages;
        if (!chat) {
            throw new Error('Chat not found');
        }
        return chat.messages;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserChats = async (user) => {
    try {
        const username = user.username
        return await Chat.find({ 'users.username': username });
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteChat = async (chatId) => {
    try {
        return await Chat.findByIdAndDelete(chatId);
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const getChatById = async (chatId) => {
    try {
        return await Chat.findById(chatId);
    }
    catch (error) {
        throw new Error(error.message);
    }
};

export default {
    createChat,
    addMessageToChat,
    getChatMessages,
    getUserChats,
    deleteChat,
    getChatById,
}