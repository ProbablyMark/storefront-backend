import express from 'express';

import { createUser, index, showUser } from '../Controllers/userController';
import { verifyAuthToken } from '../Middlewares/authMiddleWare';

const usersRouter = express.Router();

usersRouter.post('/users/newUser', createUser); //creating new user wont need a token
usersRouter.get('/users/showUser/:userId', verifyAuthToken, showUser);
usersRouter.get('/users/index', verifyAuthToken, index);

export default usersRouter;
