import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import dotenv from 'dotenv';
import { UserModel } from '../Models/usersModel';

dotenv.config();
const user = new UserModel();
const { ACCESS_SECRET_KEY } = process.env;

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const targetUser = await user.show(req.body.userId);

    if (targetUser) {
      if (await bcrypt.compare(req.body.password, targetUser.password)) {
        const token = jwt.sign(
          {
            fisrtName: targetUser.fisrtName,
            lastName: targetUser.lastName
          },
          ACCESS_SECRET_KEY as jwt.Secret
        );

        res.status(200).json({ targetUser, token });
      }
    } else {
      next(new Error('user not found'));
    }
  } catch (error) {
    next(error);
  }
}
