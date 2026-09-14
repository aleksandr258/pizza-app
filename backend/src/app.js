import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { apiRouter } from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';
import { config } from './config.js';

export const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/pizza-api-demo', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
