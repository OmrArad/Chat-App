import Chat from '../services/chat.js';


const retriveListOfChats = async (_, res) => {
    try {
        res.status(200).send(await Chat.getUserChats(res.locals.user))
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createNewChat = async (req, res) => {
    try {
        const newUserReciver = req.body
        res.status(200).send(await Chat.createChat(res.locals.user , newUserReciver))
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const retriveChatById = async (req, res) => {
    try {
        res.status(200).send(await Chat.getChatById(req.params.id))
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteChatById = async (req, res) => {
    try {
        res.status(200).send(await Chat.deleteChat(req.params.id))
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createNewMessageInChat = async (req, res) => {
    try{
        const newMessage = req.body
        res.status(200).send(await Chat.addMessageToChat(req.params.id, newMessage))
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const retriveAllMessagesInChat = async (req, res) => {
    try {
        res.status(200).send(await Chat.getChatMessages(req.params.id))
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default { 
    retriveListOfChats,
    createNewChat,
    retriveChatById,
    deleteChatById,
    createNewMessageInChat,
    retriveAllMessagesInChat,
}