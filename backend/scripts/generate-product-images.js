// Generates simple placeholder pizza illustrations as SVG files into
// backend/public/products/. No external image assets/fetching involved —
// everything is drawn with basic shapes so the seed data has something
// real to point at.
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/products');
mkdirSync(outDir, { recursive: true });

const SIZE = 400;
const CENTER = SIZE / 2;
const CHEESE_R = 170;
const CRUST_R = 190;

// Deterministic PRNG so regenerating images gives the same result.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function scatterPoints(rng, count, maxR = CHEESE_R - 25) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const angle = rng() * Math.PI * 2;
    const r = Math.sqrt(rng()) * maxR;
    points.push([CENTER + Math.cos(angle) * r, CENTER + Math.sin(angle) * r]);
  }
  return points;
}

function base() {
  return `
  <circle cx="${CENTER}" cy="${CENTER}" r="${CRUST_R}" fill="#E8B564"/>
  <circle cx="${CENTER}" cy="${CENTER}" r="${CRUST_R}" fill="none" stroke="#C98A3B" stroke-width="6"/>
  <circle cx="${CENTER}" cy="${CENTER}" r="${CHEESE_R + 8}" fill="#C0392B"/>
  <circle cx="${CENTER}" cy="${CENTER}" r="${CHEESE_R}" fill="#FDBA5C"/>`;
}

function pepperoniShape([x, y], r) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#C0392B" stroke="#8E2A1F" stroke-width="2"/>
  <circle cx="${x - r * 0.3}" cy="${y - r * 0.2}" r="${r * 0.22}" fill="#8E2A1F" opacity="0.5"/>
  <circle cx="${x + r * 0.25}" cy="${y + r * 0.3}" r="${r * 0.18}" fill="#8E2A1F" opacity="0.5"/>`;
}

function tomatoShape([x, y], r) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#E85D4E" stroke="#B23A2C" stroke-width="2"/>
  <circle cx="${x}" cy="${y}" r="${r * 0.45}" fill="#F2A090"/>`;
}

function basilShape([x, y], r) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.6}" fill="#3C8A3C" stroke="#255C25" stroke-width="1.5"/>`;
}

function oliveShape([x, y], r) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.8}" fill="#3B3324" stroke="#1F1B12" stroke-width="1.5"/>
  <ellipse cx="${x}" cy="${y}" rx="${r * 0.35}" ry="${r * 0.5}" fill="#FDBA5C"/>`;
}

function oreganoShape([x, y], r) {
  return `<circle cx="${x}" cy="${y}" r="${r * 0.35}" fill="#4C7A2E"/>`;
}

function cheeseBlobShape([x, y], r, color) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.75}" fill="${color}" opacity="0.85"/>`;
}

function chickenShape([x, y], r) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="#E8C39E" stroke="#C79A6B" stroke-width="1.5"/>`;
}

function pineappleShape([x, y], r) {
  return `<polygon points="${x},${y - r} ${x + r},${y + r} ${x - r},${y + r}" fill="#F4D03F" stroke="#C9A227" stroke-width="1.5"/>`;
}

function beefShape([x, y], r) {
  return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.7}" fill="#7B4B34" stroke="#5A3624" stroke-width="1.5"/>`;
}

function sausageShape([x, y], r) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#A5432F" stroke="#7A2E1F" stroke-width="2"/>
  <circle cx="${x}" cy="${y}" r="${r * 0.3}" fill="#F2D9C4"/>`;
}

function svgDoc(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">${base()}${body}</svg>`;
}

const pizzas = [
  {
    file: 'pepperoni.svg',
    seed: 1,
    build: (rng) => scatterPoints(rng, 9).map((p) => pepperoniShape(p, 22)).join(''),
  },
  {
    file: 'margherita.svg',
    seed: 2,
    build: (rng) =>
      scatterPoints(rng, 6, CHEESE_R - 40).map((p) => tomatoShape(p, 24)).join('') +
      scatterPoints(rng, 7).map((p) => basilShape(p, 16)).join(''),
  },
  {
    file: 'olive.svg',
    seed: 3,
    build: (rng) =>
      scatterPoints(rng, 10).map((p) => oliveShape(p, 14)).join('') +
      scatterPoints(rng, 20).map((p) => oreganoShape(p, 6)).join(''),
  },
  {
    file: 'four-cheese.svg',
    seed: 4,
    build: (rng) => {
      const colors = ['#FFF4D6', '#F2994A', '#EDEDED', '#F6C453'];
      return colors
        .map((color, i) => {
          const angle = (Math.PI / 2) * i + Math.PI / 4;
          const x = CENTER + Math.cos(angle) * 60;
          const y = CENTER + Math.sin(angle) * 60;
          return scatterPoints(rng, 4, 45)
            .map(([dx, dy]) => cheeseBlobShape([x + (dx - CENTER) * 0.4, y + (dy - CENTER) * 0.4], 26, color))
            .join('');
        })
        .join('');
    },
  },
  {
    file: 'hawaiian.svg',
    seed: 5,
    build: (rng) =>
      scatterPoints(rng, 7).map((p) => chickenShape(p, 20)).join('') +
      scatterPoints(rng, 7).map((p) => pineappleShape(p, 16)).join(''),
  },
  {
    file: 'meat.svg',
    seed: 6,
    build: (rng) =>
      scatterPoints(rng, 6).map((p) => beefShape(p, 22)).join('') +
      scatterPoints(rng, 6).map((p) => sausageShape(p, 18)).join(''),
  },
];

for (const pizza of pizzas) {
  const rng = mulberry32(pizza.seed);
  const svg = svgDoc(pizza.build(rng));
  writeFileSync(path.join(outDir, pizza.file), svg, 'utf-8');
  console.log(`Generated ${pizza.file}`);
}
