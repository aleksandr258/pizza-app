import { pool } from '../db.js';
import { HttpError } from '../utils/HttpError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// `row.image` is stored as a root-relative path (`/products/foo.svg`).
// The frontend renders it directly as <img src>/CSS background-image
// with no base URL of its own, so it must resolve against the backend's
// origin, not the frontend's — hence building an absolute URL here from
// the incoming request instead of returning the raw path.
const mapProduct = (row, req) => ({
  id: row.id,
  name: row.name,
  price: Number(row.price),
  ingredients: row.ingredients,
  image: `${req.protocol}://${req.get('host')}${row.image}`,
  rating: Number(row.rating),
});

export const getProducts = asyncHandler(async (req, res) => {
  const { limit, offset, name } = req.query;

  // Filtering by name happens in JS, not SQL ILIKE: Postgres case-folds
  // ILIKE according to the database's collation, and many clusters
  // (Homebrew/Docker defaults included) are initialized with the "C"
  // locale, under which ILIKE never case-folds non-ASCII text — so a
  // Cyrillic search like "олив" would silently never match "Оливковая".
  const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
  let products = rows.map((row) => mapProduct(row, req));

  if (name) {
    const needle = name.toLocaleLowerCase();
    products = products.filter((p) => p.name.toLocaleLowerCase().includes(needle));
  }

  const start = offset !== undefined ? Number(offset) : 0;
  const end = limit !== undefined ? start + Number(limit) : undefined;
  products = products.slice(start, end);

  res.status(200).json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

  if (rows.length === 0) {
    throw new HttpError(404, 'Product not found');
  }

  res.status(200).json(mapProduct(rows[0], req));
});
