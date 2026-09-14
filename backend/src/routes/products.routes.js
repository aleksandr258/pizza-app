import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/products.controller.js';

export const productsRouter = Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProductById);
