import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const keywords = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/keywords.json'), 'utf8'));

const byPrimary = new Map();
let conflicts = 0;

for (const k of keywords) {
  if (k.status === 'consolidated') continue;
  const key = k.primaryKeyword.trim().toLowerCase();
  if (!byPrimary.has(key)) {
    byPrimary.set(key, new Set([k.targetUrl]));
  } else {
    byPrimary.get(key).add(k.targetUrl);
  }
}

for (const [kw, urls] of byPrimary.entries()) {
  if (urls.size > 1) {
    console.error(`CANNIBALIZATION: Primary keyword "${kw}" maps to multiple URLs: ${Array.from(urls).join(', ')}`);
    conflicts++;
  }
}

console.log(`Cannibalization audit complete: ${keywords.length} keywords checked, ${conflicts} conflicts.`);
if (conflicts > 0) process.exit(1);
