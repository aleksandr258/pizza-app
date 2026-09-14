import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { userRouter } from './user.routes.js';
import { productsRouter } from './products.routes.js';
import { orderRouter } from './order.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/order', orderRouter);
