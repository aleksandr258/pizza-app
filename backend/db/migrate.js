import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pool } from '../src/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const runSeed = process.argv.includes('--seed');

async function run() {
  const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  await pool.query(schema);
  console.log('Schema applied.');

  if (runSeed) {
    const seed = readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    await pool.query(seed);
    console.log('Seed data inserted.');
  }

  await pool.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
