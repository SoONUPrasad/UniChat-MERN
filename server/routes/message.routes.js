import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js'
import { sendMessage, getMessage } from "../controllers/message.controller.js"

const router = express.Router();

router.post('/send/:id', authUser, sendMessage);
router.get('/getMessages/:id', authUser, getMessage);

export default router;