import express from 'express';
import { register, fetchUserDetails } from '../controller/users.js';
import { isLoggedIn } from '../controller/login.js';



const router = express.Router();

router.get('/:username', isLoggedIn, fetchUserDetails)
router.post('/', register)

export default router;