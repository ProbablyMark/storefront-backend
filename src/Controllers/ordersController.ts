import { NextFunction, Request, Response } from 'express';
import { OrderModel } from '../Models/ordersModel';

const order = new OrderModel();

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await order.create({
      userId: req.body.userId
    });
    res.json({ message: 'order created' });
  } catch (error) {
    next(error);
  }
}
export async function showCurrentOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await order.currentOrder(Number(req.params.id)));
  } catch (error) {
    next(error);
  }
}

export async function showCompletedOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await order.completedOrders(Number(req.params.userId)));
  } catch (error) {
    next(error);
  }
}
