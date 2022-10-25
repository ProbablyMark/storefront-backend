import express from 'express';
import {
  addProduct,
  removeProduct
} from '../Controllers/ordersProductsController';
import { verifyAuthToken } from '../Middlewares/authMiddleWare';

const ordersProductsRouter = express.Router();

ordersProductsRouter.post('/orders/addProduct', verifyAuthToken, addProduct);
ordersProductsRouter.delete(
  '/orders/removeProduct',
  verifyAuthToken,
  removeProduct
);

export default ordersProductsRouter;
