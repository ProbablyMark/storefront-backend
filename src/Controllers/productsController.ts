import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { ProductModel } from '../Models/productsModel';

const product = new ProductModel();

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    });
    res.json({ message: 'product created' });
  } catch (error) {
    next(error);
  }
}
export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await product.index());
  } catch (error) {
    next(error);
  }
}

export async function showProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await product.show(req.body.productId));
  } catch (error) {
    next(error);
  }
}

export async function showProductByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await product.showByCategory(req.body.category));
  } catch (error) {
    next(error);
  }
}
