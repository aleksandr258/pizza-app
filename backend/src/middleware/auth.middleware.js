import { verifyToken } from '../utils/jwt.js';
import { HttpError } from '../utils/HttpError.js';

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;

  if (!token) {
    return next(new HttpError(401, 'Authorization token is missing'));
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    next(new HttpError(401, 'Invalid or expired token'));
  }
};
