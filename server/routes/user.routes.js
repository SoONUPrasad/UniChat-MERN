import express from 'express';
import { createUser, loginUser } from '../controllers/user.controllers.js';
import { authUser } from '../middlewares/auth.middleware.js'

const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/login', loginUser);
routes.get('/verify',authUser, (req, res) => {
    res.status(200).json(req.user);
});

export default routes;