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
    const targetUser = await user.show(req.body.user_id);

    if (targetUser) {
      console.log('before compare');
      if (await bcrypt.compare(req.body.password, targetUser.password)) {
        console.log('after compare');
        const token = jwt.sign(
          {
            fisrtName: targetUser.first_name,
            lastName: targetUser.last_name
          },
          ACCESS_SECRET_KEY as jwt.Secret
        );

        res.status(200).json({ token });
      }
    } else {
      next(new Error('user not found'));
    }
  } catch (error) {
    console.log('after after compare');
    next(error);
  }
}
