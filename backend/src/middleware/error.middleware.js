import { HttpError } from '../utils/HttpError.js';

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err instanceof HttpError ? err.status : 500;
  if (status === 500) {
    console.error(err);
  }
  res.status(status).json({ message: err.message ?? 'Internal server error' });
};
