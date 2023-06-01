import express from 'express';
import {register, fetchUserDetails} from '../controller/users.js';



const router = express.Router();

router.get('/:username', fetchUserDetails)
router.post('/', register)

export default router;