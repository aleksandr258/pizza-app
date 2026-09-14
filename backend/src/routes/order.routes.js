import { Router } from 'express';
import { createOrder } from '../controllers/order.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const orderRouter = Router();

orderRouter.post('/', requireAuth, createOrder);
