import jwt from 'jsonwebtoken';
import {getUserChats, createChat, getChatMessages, deleteChat, getChatById, addMessageToChat} from '../services/chat.js';


export const retriveListOfChats = async (req, res) => {
    try {
        res.status(200).send(getUserChats(req.headers.authorization.split(' ')[1]))
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createNewChat = async (req, res) => {
    try {
        const newUserReciver = req.body
        // res.status(200).send(await createChat(req.headers.authorization.split(' ')[1], newUserReciver))
        res.status(200).send(await createChat(res.locals.user , newUserReciver))
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const retriveChatById = async (req, res) => {
    try {
        res.status(200).getChatById(req.params.id)
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteChatById = async (req, res) => {
    try {
        res.status(200).send(deleteChat(req.params.id))
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createNewMessageInChat = async (req, res) => {
    try{
        const newMessage = req.body
        res.status(200).send(addMessageToChat(req.params.id, newMessage))
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const retriveAllMessagesInChat = async (req, res) => {
    try {
        res.status(200).send(getChatMessages(req.params.id))
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