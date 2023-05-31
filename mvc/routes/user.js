import express from 'express';
import register from '../controller/users.js';

const router = express.Router();

router.get('/register', register)

export default router;