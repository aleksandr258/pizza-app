import { Router } from 'express';
import { getProfile } from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const userRouter = Router();

userRouter.get('/profile', requireAuth, getProfile);
