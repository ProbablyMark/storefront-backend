import express from 'express';

import {
  createProduct,
  showProduct,
  showProductByCategory
} from '../Controllers/productsController';
import { verifyAuthToken } from '../Middlewares/authMiddleWare';

const productsRouter = express.Router();

productsRouter.post('/products/newProduct', verifyAuthToken, createProduct);
productsRouter.get('/products/showProduct/:productId', showProduct);
productsRouter.get('/products/category/:category', showProductByCategory);

export default productsRouter;
