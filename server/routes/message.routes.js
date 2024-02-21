import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js'
import { sendMessage } from "../controllers/message.controller.js"

const router = express.Router();

router.post('/send/:id', authUser, sendMessage);

export default router;