import express from 'express';
import { chat } from '../controller/chat.js';

const router = express.Router();

router.get('/chat', isLoggedIn, chat)

export default router;