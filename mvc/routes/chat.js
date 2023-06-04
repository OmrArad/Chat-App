import express from 'express';
import chat from '../controller/chat.js';
import { isLoggedIn } from '../controller/login.js';


const router = express.Router();

router.get('/', isLoggedIn, chat.retriveListOfChats)
router.post('/', isLoggedIn, chat.createNewChat)
router.get('/:id', isLoggedIn, chat.retriveChatById)
router.delete('/:id', isLoggedIn, chat.deleteChatById)
router.get('/:id/Messages', isLoggedIn, chat.retriveAllMessagesInChat)
router.post('/:id/Messages', isLoggedIn, chat.createNewMessageInChat)


export default router;