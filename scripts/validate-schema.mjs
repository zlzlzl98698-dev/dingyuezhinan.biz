import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

if (!fs.existsSync(DIST)) {
  console.log('dist/ not built yet; skipping schema & SEO HTML validation.');
  process.exit(0);
}

function walkHtml(dir) {
  let out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out = out.concat(walkHtml(full));
    else if (ent.name === 'index.html') out.push(full);
  }
  return out;
}

const files = walkHtml(DIST);
const titles = new Map();
let errors = 0;

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(DIST, f);
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  const canonicalCount = (html.match(/<link rel="canonical"/g) || []).length;
  const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];

  if (!titleMatch) {
    console.error(`MISSING TITLE: ${rel}`);
    errors++;
  } else {
    const t = titleMatch[1];
    if (titles.has(t) && !rel.includes('404')) {
      console.error(`DUPLICATE TITLE "${t}" in ${rel} and ${titles.get(t)}`);
      errors++;
    } else {
      titles.set(t, rel);
    }
  }

  if (h1Count !== 1) {
    console.error(`H1 COUNT=${h1Count} (expected 1) in ${rel}`);
    errors++;
  }

  if (canonicalCount !== 1) {
    console.error(`CANONICAL COUNT=${canonicalCount} in ${rel}`);
    errors++;
  }

  for (const m of ldMatches) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      console.error(`INVALID JSON-LD in ${rel}: ${e.message}`);
      errors++;
    }
  }
}

console.log(`Schema & SEO HTML validation complete across ${files.length} pages. Errors: ${errors}.`);
if (errors > 0) process.exit(1);
