import express from 'express';
import {chat, getMessagesById, newMessageById} from '../controller/chat.js';
import { isLoggedIn } from '../controller/login.js';


const router = express.Router();

router.get('/', isLoggedIn, chat)
router.get('/:id/Messages', isLoggedIn, getMessagesById)
router.post('/:id/Messages', isLoggedIn, newMessageById)

export default router;