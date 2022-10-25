import express from 'express';
import { login } from './../Controllers/authController';
const authRouter = express.Router();

authRouter.post('/users/login', login);

export default authRouter;
