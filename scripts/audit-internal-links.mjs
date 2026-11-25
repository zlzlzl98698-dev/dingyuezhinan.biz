import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

function walkHtml(dir) {
  let out = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out = out.concat(walkHtml(full));
    else if (ent.name === 'index.html') out.push(full);
  }
  return out;
}

if (!fs.existsSync(DIST)) {
  console.log('dist/ not built yet; skipping HTML audit until after npm run build.');
  process.exit(0);
}

const htmlFiles = walkHtml(DIST);
const existingRoutes = new Set(
  htmlFiles.map((f) => {
    const rel = path.relative(DIST, path.dirname(f)).replace(/\\/g, '/');
    return rel ? `/${rel}/` : '/';
  })
);

let broken = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (
      href.startsWith('/images/') ||
      href.startsWith('/pagefind/') ||
      href.startsWith('/_astro/') ||
      href === '/favicon.svg' ||
      href === '/favicon.png' ||
      href === '/apple-touch-icon.png' ||
      href === '/og-default.png' ||
      href === '/rss.xml' ||
      href === '/sitemap.xml' ||
      href === '/sitemap-index.xml' ||
      href === '/llms.txt' ||
      href === '/robots.txt'
    ) {
      continue;
    }
    const norm = href.endsWith('/') ? href : `${href}/`;
    if (!existingRoutes.has(norm)) {
      console.error(`BROKEN INTERNAL LINK in ${path.relative(DIST, file)}: ${href}`);
      broken++;
    }
  }
}

console.log(`Internal link audit complete across ${htmlFiles.length} built HTML pages. Broken links: ${broken}.`);
if (broken > 0) process.exit(1);
