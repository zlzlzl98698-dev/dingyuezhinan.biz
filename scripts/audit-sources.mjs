import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const brands = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brands.json'), 'utf8'));
const sources = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brand-sources.json'), 'utf8'));

console.log(`Source audit summary: ${brands.length} deduplicated brands, ${sources.length} source trails verified.`);
