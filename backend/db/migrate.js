import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool } from '../src/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mode = process.argv.includes('--seed')
  ? 'seed'
  : process.argv.includes('--seed-if-empty')
    ? 'seed-if-empty'
    : 'schema-only';

async function waitForDb(retries = 20, delayMs = 1000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await pool.query('SELECT 1');
      return;
    } catch (err) {
      if (i === retries) throw err;
      console.log(`Waiting for database... (${i}/${retries})`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

async function run() {
  await waitForDb();

  const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  await pool.query(schema);
  console.log('Schema applied.');

  if (mode === 'seed') {
    const seed = readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    await pool.query(seed);
    console.log('Seed data inserted.');
  } else if (mode === 'seed-if-empty') {
    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM products');
    if (rows[0].count === 0) {
      const seed = readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
      await pool.query(seed);
      console.log('Products table was empty — seed data inserted.');
    } else {
      console.log('Products table already has data — skipping seed.');
    }
  }

  await pool.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
