import { pool } from '../db.js';
import { HttpError } from '../utils/HttpError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT id, email, password_hash, address, name, restore_token, phone
     FROM users WHERE id = $1`,
    [req.user.id]
  );
  const user = rows[0];

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  res.status(200).json({
    id: user.id,
    email: user.email,
    passwordHash: user.password_hash,
    address: user.address,
    name: user.name,
    restoreToken: user.restore_token,
    phone: user.phone,
  });
});
