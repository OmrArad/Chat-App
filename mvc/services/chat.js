import Login from '../services/login.js'
import Chat from '../model/chat.js'
import  User  from '../services/users.js'
import Message from '../model/message.js'

const chatID = 0;

// Create a new chat
export const createChat = async ( token, username2) => {
    const decoded = Login.decode(token)
    try {
        const username1 = decoded.username
        const userNP1 = await User.fetchUserDetails(username1);
        const userNP2 = await User.fetchUserDetails(username2);
    
        if (!userNP1 || !userNP2) {
            throw new Error('User not found.');
        }

        return await new Chat({ 
            id: chatID,
            users: [user1, user2],
            messages: [],
        }).save();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addMessageToChat = async (chatId, {messageID, created, sender, content}) => {
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
        const chat = await Chat.findOne({ id:chatId }).messages;
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