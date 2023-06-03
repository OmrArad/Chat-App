import Login from '../services/login.js'
import Chat from '../model/chat.js'
import User from '../model/user.js'
import Message from '../model/message.js'
import userNamePassService from '../services/userNamePass.js'
import userNamePass from '../model/userNamePass.js'

const chatID = 0;

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

        const newChat = new Chat({
            id: 1,
            users: [
                {
                    username: 'user1',
                    displayName: 'User 1',
                    profilePic: 'user1.jpg',
                },
                {
                    username: 'user2',
                    displayName: 'User 2',
                    profilePic: 'user2.jpg',
                },
            ],
            messages: [
                // Add messages here if necessary
            ],
        });

        let output1;
        (async () => {
            output1 = await newChat.save();
        })
        console.log(output1);


        const chat = new Chat({
            users: [user1, user2],
            messages: [],
        })

        let output;
        (async () => {
            output = await chat.save();
        })
        console.log(output);

        chat.then(() => {
            return { chatID, user2 };
        });


        return { chatID, user2 };
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