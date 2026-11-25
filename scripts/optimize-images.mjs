import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const brands = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brands.json'), 'utf8'));
const benchmarks = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/benchmarks.json'), 'utf8'));

const THUMB_LOGOS = path.join(ROOT, 'public/images/thumbs/logos');
const THUMB_SPEED = path.join(ROOT, 'public/images/thumbs/speedtests');
const THUMB_GSY = path.join(ROOT, 'public/images/thumbs/guangsuyun');

fs.mkdirSync(THUMB_LOGOS, { recursive: true });
fs.mkdirSync(THUMB_SPEED, { recursive: true });
fs.mkdirSync(THUMB_GSY, { recursive: true });

let generated = 0;

// 1. Optimize brand logos (256px max WebP; SVG logos stay crisp SVG)
for (const b of brands) {
  if (b.logo.endsWith('.svg')) {
    b.thumbLogo = b.logo;
    continue;
  }
  const srcPath = path.join(ROOT, 'public', b.logo.replace(/^\//, ''));
  if (!fs.existsSync(srcPath)) continue;
  const outName = `${b.slug}.webp`;
  const outPath = path.join(THUMB_LOGOS, outName);
  await sharp(srcPath).resize(192, 192, { fit: 'cover' }).webp({ quality: 84 }).toFile(outPath);
  b.thumbLogo = `/images/thumbs/logos/${outName}`;
  generated++;
}

// 2. Optimize speedtest & Guangsuyun screenshots (780px width WebP preview, original untouched)
for (const bm of benchmarks) {
  if (bm.screenshot20260811) {
    const srcPath = path.join(ROOT, 'public', bm.screenshot20260811.file.replace(/^\//, ''));
    if (fs.existsSync(srcPath)) {
      const outName = `${bm.brandSlug}-2026-08-11.webp`;
      const outPath = path.join(THUMB_SPEED, outName);
      const meta = await sharp(srcPath).resize({ width: 780, withoutEnlargement: true }).webp({ quality: 82 }).toFile(outPath);
      bm.screenshot20260811.thumbFile = `/images/thumbs/speedtests/${outName}`;
      bm.screenshot20260811.thumbWidth = meta.width;
      bm.screenshot20260811.thumbHeight = meta.height;
      generated++;
    }
  }
  for (let i = 0; i < (bm.additionalScreenshots || []).length; i++) {
    const shot = bm.additionalScreenshots[i];
    const srcPath = path.join(ROOT, 'public', shot.file.replace(/^\//, ''));
    if (fs.existsSync(srcPath)) {
      const base = path.basename(shot.file, path.extname(shot.file));
      const outName = `${base}.webp`;
      const outPath = path.join(THUMB_GSY, outName);
      const meta = await sharp(srcPath).resize({ width: 780, withoutEnlargement: true }).webp({ quality: 82 }).toFile(outPath);
      shot.thumbFile = `/images/thumbs/guangsuyun/${outName}`;
      shot.thumbWidth = meta.width;
      shot.thumbHeight = meta.height;
      generated++;
    }
  }
}

fs.writeFileSync(path.join(ROOT, 'src/data/brands.json'), JSON.stringify(brands, null, 2), 'utf8');
fs.writeFileSync(path.join(ROOT, 'src/data/benchmarks.json'), JSON.stringify(benchmarks, null, 2), 'utf8');
console.log(`Generated ${generated} optimized WebP thumbnails and updated brands.json / benchmarks.json.`);
