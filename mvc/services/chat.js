import Login from '../services/login.js'
import Chat from '../model/chat.js'
import  User  from '../model/user.js'
import Message from '../model/message.js'
import userNamePassService from '../services/userNamePass.js'

const chatID = 0;

// Create a new chat
export const createChat = async ( token, username2) => {
    decoded = decode(token)
    username = decoded.username
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
        chatID++;
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
        var chat = await Chat.findOne({ id:chatId }).messages;
    } catch (error) {
        throw new Error(error.message);
    }
    if (!chat) {
        throw new Error('Chat not found');
    }
    return chat.messages;
};

export const getUserChats = async (token) => {
    decoded = Login.decode(token)
    username = decoded.username
    try {
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