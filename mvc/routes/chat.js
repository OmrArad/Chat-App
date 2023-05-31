import express from 'express';
import { chat } from '../controller/chat.js';
import { isLoggedIn } from '../controller/login.js';

const router = express.Router();

router.get('/', isLoggedIn, chat)

export default router;