import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const { ACCESS_SECRET_KEY } = process.env;
export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, ACCESS_SECRET_KEY as Secret);
    //save order id in token

    next();
  } catch (error) {
    res.status(401);
    next(error);
  }
};
