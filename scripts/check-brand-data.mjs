import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const brands = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brands.json'), 'utf8'));
const plans = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/plans.json'), 'utf8'));
const benchmarks = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/benchmarks.json'), 'utf8'));

let errors = 0;
if (brands.length !== 31) {
  console.error(`ERROR: Expected 31 unique brands, found ${brands.length}`);
  errors++;
}

const slugs = new Set();
for (const b of brands) {
  if (slugs.has(b.slug)) {
    console.error(`ERROR: Duplicate brand slug ${b.slug}`);
    errors++;
  }
  slugs.add(b.slug);

  // Verify logo file exists
  const logoDisk = path.join(ROOT, 'public', b.logo.replace(/^\//, ''));
  if (!fs.existsSync(logoDisk)) {
    console.error(`ERROR: Missing logo asset for ${b.slug}: ${logoDisk}`);
    errors++;
  }
}

for (const bm of benchmarks) {
  if (bm.screenshot20260811) {
    const shotDisk = path.join(ROOT, 'public', bm.screenshot20260811.file.replace(/^\//, ''));
    if (!fs.existsSync(shotDisk)) {
      console.error(`ERROR: Missing speedtest screenshot for ${bm.brandSlug}: ${shotDisk}`);
      errors++;
    }
  }
  for (const shot of bm.additionalScreenshots || []) {
    const shotDisk = path.join(ROOT, 'public', shot.file.replace(/^\//, ''));
    if (!fs.existsSync(shotDisk)) {
      console.error(`ERROR: Missing additional screenshot for ${bm.brandSlug}: ${shotDisk}`);
      errors++;
    }
  }
}

console.log(`Brand data check complete: ${brands.length} brands, ${plans.length} plans, ${errors} errors.`);
if (errors > 0) process.exit(1);
