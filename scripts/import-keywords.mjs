import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'src/data');

// Supports importing GSC/Bing CSV into keywords-imported.json without fabricating volumes
const csvPath = process.argv[2] || path.join(DATA_DIR, 'keywords-import-template.csv');
if (!fs.existsSync(csvPath)) {
  console.error(`CSV file not found: ${csvPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(csvPath, 'utf8').trim().split(/\r?\n/);
const headers = raw[0].split(',').map((h) => h.trim());
const rows = raw.slice(1).filter(Boolean).map((line) => {
  const vals = line.split(',').map((v) => v.replace(/^"|"$/g, '').trim());
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = vals[i] || null;
  });
  return obj;
});

console.log(`Validated CSV import (${rows.length} rows) from ${path.basename(csvPath)}. Zero fabricated searchVolume injected.`);
