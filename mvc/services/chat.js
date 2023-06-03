import Chat from '../model/chat.js'
import Message from '../model/message.js'
import Users from '../services/users.js'

// Create a new chat
const createChat = async (username1, username2) => {
    try {
        let chatId = 0;
        const lastChat = await Chat.findOne().sort({ id: -1 });
        if (lastChat)
            chatId = lastChat.id + 1;

        const userNP1 = await Users.fetchUserDetails(username1.username);
        const userNP2 = await Users.fetchUserDetails(username2.username);

        if (!userNP1 || !userNP2) {
            throw new Error('User not found.');
        }

        const user1 = {
            username: userNP1.username,
            displayName: userNP1.displayName,
            profilePic: userNP1.profilePic
        }
        const user2 = {
            username: userNP2.username,
            displayName: userNP2.displayName,
            profilePic: userNP2.profilePic
        }

        const newChat = await new Chat({
            id: chatId,
            users: [user1, user2],
            messages: [],
        }).save();

        return { "id": chatId, "user": user2 };

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

        const updatedChat = await Chat.findOneAndUpdate(
            { "id": +chatId },
            { $push: { messages: newMessage } },
            { new: true }
        );

        return updatedChat;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getChatMessages = async (chatId) => {
    try {
        const chat = await Chat.findOne({ id: +chatId }); // convert chatId to number and find chat
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
        const chats = await Chat.find({ "users.username": username });

        const transformedChats = chats.map((chat) => {
            return {
                id: chat.id,
                user: chat.users[0].username == username ? getUserJson(chat.users[1]) : getUserJson(chat.users[0]),
                lastMessage: chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null
            };
        });

        return transformedChats;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteChat = async (chatId) => {
    try {
        return await Chat.findOneAndDelete({ id: chatId });
    } catch (error) {
        throw new Error(error.message);
    }
};

const getChatById = async (chatId) => {
    try {
        const chat = await Chat.findOne({ "id": +chatId });

        const transformedChat = {
            id: chat.id,
            users: chat.users.map((user) => {
                return getUserJson(user)
            }),
            messages: chat.messages
        };

        return transformedChat;
    }
    catch (error) {
        throw new Error(error.message);
    }
};

const getUserJson = (user) => {
    return {
        username: user.username,
        displayName: user.displayName,
        profilePic: user.profilePic
    }
}

export default {
    createChat,
    addMessageToChat,
    getChatMessages,
    getUserChats,
    deleteChat,
    getChatById,
}