import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { UserModel } from '../Models/usersModel';

const user = new UserModel();

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await user.create({
      fisrtName: req.body.firstName,
      lastName: req.body.lastName,
      password: await bcrypt.hash(req.body.password, await bcrypt.genSalt())
    });
    res.json({ message: 'user created' });
  } catch (error) {
    next(error);
  }
}
export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await user.index());
  } catch (error) {
    next(error);
  }
}

export async function showUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await user.show(Number(req.params.userId)));
  } catch (error) {
    next(error);
  }
}
