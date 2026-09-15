import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { apiRouter } from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';
import { config } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(morgan('dev'));

// Static product images. Served at root (not under /pizza-api-demo) so the
// paths stored in the DB (`/products/<file>.svg`) match what's on disk.
app.use('/products', express.static(path.join(__dirname, '../public/products')));

app.use('/pizza-api-demo', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
