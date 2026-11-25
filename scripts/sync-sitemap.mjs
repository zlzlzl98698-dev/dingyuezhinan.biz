import fs from 'node:fs';
import path from 'node:path';

const distDir = path.join(process.cwd(), 'dist');
const srcSitemap = path.join(distDir, 'sitemap-0.xml');
const destSitemap = path.join(distDir, 'sitemap.xml');

if (!fs.existsSync(srcSitemap)) {
  console.error('Missing dist/sitemap-0.xml; cannot generate dist/sitemap.xml');
  process.exit(1);
}

fs.copyFileSync(srcSitemap, destSitemap);
const xml = fs.readFileSync(destSitemap, 'utf8');
const count = (xml.match(/<loc>/g) || []).length;
console.log(`Synced dist/sitemap.xml from dist/sitemap-0.xml (${count} URLs).`);
