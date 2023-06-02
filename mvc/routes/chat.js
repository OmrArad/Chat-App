import express from 'express';
import { retriveListOfChats, createNewChat, retriveChatById, deleteChatById, createNewMessageInChat, retriveAllMessagesInChat } from '../controller/chat.js';
import { isLoggedIn } from '../controller/login.js';


const router = express.Router();

router.get('/', isLoggedIn, retriveListOfChats)
router.post('/', isLoggedIn, createNewChat)
router.get('/:id', isLoggedIn, retriveChatById)
router.delete('/:id', isLoggedIn, deleteChatById)
router.get('/:id/Messages', isLoggedIn, createNewMessageInChat)
router.post('/:id/Messages', isLoggedIn, retriveAllMessagesInChat)


export default router;