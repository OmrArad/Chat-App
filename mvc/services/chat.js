import Login from '../services/login.js'
import Chat from '../model/chat.js'
import User from '../model/user.js'
import Message from '../model/message.js'
import userNamePassService from '../services/userNamePass.js'
import userNamePass from '../model/userNamePass.js'

// Create a new chat
export const createChat = async (username1, username2) => {
    try {
        // const decoded = await Login.decode(token)
        // const username1 = decoded.username
        const userNP1 = await userNamePassService.findByUsername(username1.username);
        const userNP2 = await userNamePassService.findByUsername(username2.username);

        if (!userNP1 || !userNP2) {
            throw new Error('User not found.');
        }

        const newChat = await new Chat({ 
            users: [userNP1, userNP2],
            messages: [],
        }).save();

        console.log(newChat);

        return { userNP2 };

    } catch (error) {
        throw new Error(error.message);
    }
};

export const addMessageToChat = async (chatId, { messageID, created, sender, content }) => {
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

export const getChatMessages = async (chatId) => {
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

export const getUserChats = async (token) => {
    const decoded = await Login.decode(token)
    try {
        const username = decoded.username
        return await Chat.find({ 'users.username': username });
    } catch (error) {
        throw new Error(error.message);
    }
};
export const deleteChat = async (chatId) => {
    try {
        return await Chat.findByIdAndDelete(chatId);
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export const getChatById = async (chatId) => {
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