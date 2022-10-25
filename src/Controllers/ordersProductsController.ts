import { NextFunction, Request, Response } from 'express';
import { OrdersProductsModel } from '../Models/ordersProducts';

const ordersProducts = new OrdersProductsModel();

export async function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await ordersProducts.addProductToOrder(
      req.body.orderId,
      req.body.productId
    );
    res.json({ message: 'product added' });
  } catch (error) {
    next(error);
  }
}
export async function removeProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await ordersProducts.removeProductFromOrder(
      req.body.orderId,
      req.body.productId
    );
    res.json({ message: 'product removed' });
  } catch (error) {
    next(error);
  }
}
