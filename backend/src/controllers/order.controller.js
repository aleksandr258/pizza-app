import { pool } from '../db.js';
import { HttpError } from '../utils/HttpError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    throw new HttpError(400, 'products must be a non-empty array of { id, count }');
  }
  for (const p of products) {
    if (typeof p.id !== 'number' || typeof p.count !== 'number' || p.count <= 0) {
      throw new HttpError(400, 'Each product must have a numeric id and a positive count');
    }
  }

  const ids = products.map((p) => p.id);
  const { rows: found } = await pool.query('SELECT id FROM products WHERE id = ANY($1)', [ids]);
  if (found.length !== new Set(ids).size) {
    throw new HttpError(400, 'One or more products do not exist');
  }

  const data = { products };
  const { rows } = await pool.query(
    `INSERT INTO orders (user_id, status, data)
     VALUES ($1, 'created', $2)
     RETURNING id, user_id, status, created_at, data`,
    [req.user.id, data]
  );
  const order = rows[0];

  res.status(201).json({
    id: order.id,
    userId: order.user_id,
    status: order.status,
    createdAt: order.created_at,
    data: order.data,
  });
});
