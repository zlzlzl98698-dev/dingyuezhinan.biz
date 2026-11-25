import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src/content');
const dirs = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR) : [];

const counts = {};
let total = 0;
function walk(dir) {
  let c = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) c += walk(full);
    else if (/\.(md|mdx)$/i.test(ent.name)) c += 1;
  }
  return c;
}

for (const d of dirs) {
  const full = path.join(CONTENT_DIR, d);
  if (fs.statSync(full).isDirectory()) {
    counts[d] = walk(full);
    total += counts[d];
  }
}

console.log('Content collection counts:', counts, 'Total Markdown files:', total);
