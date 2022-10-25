import express from 'express';
import {
  createOrder,
  showCompletedOrders,
  showCurrentOrder
} from '../Controllers/ordersController';
import { verifyAuthToken } from '../Middlewares/authMiddleWare';

const ordersRouter = express.Router();

ordersRouter.post('/orders/newOrder', verifyAuthToken, createOrder);
ordersRouter.get('/orders/currentOrder', verifyAuthToken, showCurrentOrder);
ordersRouter.get('/orders/yourOrders', verifyAuthToken, showCompletedOrders);

export default ordersRouter;
