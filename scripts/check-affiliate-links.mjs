import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src/content');
const affFile = fs.readFileSync(path.join(ROOT, 'src/data/affiliate-links.ts'), 'utf8');

const BANNED_AFF_DOMAINS = [
  'gsyvipaff.com',
  'twilightaff.com',
  'flycataff.com',
  'breezenetaff.com',
  'dalaoyunaff.com',
  'xingdaomeng.com',
  '2maoyunaff.cc',
  'worryfreeaff.com',
  'v2yunvipaff.com',
  'fireflyaff.com',
  'yuzoucloud.cc',
  'vipaff.cc',
  'civetnet.com',
  'jlyvipaff.com',
  'gntaff.com',
  '1flyunaff.cc',
  'sogoyunaff.cc',
  'kosingaff.com',
  'speedworldaff.cc',
  'flashleapaff.com',
  'gcvipaff.com',
  'shandianshuaff.com',
  'yunjiexianaff.com',
  'liulianyunaff.com',
  'shenxingaff.com',
  'huanqiutiaff.com',
  'invisibleaff.com',
  'ladderaff.com',
  'lingdongaff.com',
  'wavenetaff.com',
  'edgenovaaff.cc',
];

function walk(dir) {
  let out = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out = out.concat(walk(full));
    else if (/\.(md|mdx)$/i.test(ent.name)) out.push(full);
  }
  return out;
}

const mdFiles = walk(CONTENT_DIR);
let violations = 0;
for (const file of mdFiles) {
  const txt = fs.readFileSync(file, 'utf8');
  for (const domain of BANNED_AFF_DOMAINS) {
    if (txt.includes(domain)) {
      console.error(`VIOLATION: Hardcoded affiliate domain "${domain}" found in ${path.relative(ROOT, file)}`);
      violations++;
    }
  }
}

console.log(`Affiliate link scan complete across ${mdFiles.length} Markdown files. Violations: ${violations}.`);
if (!affFile.includes('nofollow sponsored noopener')) {
  console.error('ERROR: affiliate-links.ts missing rel="nofollow sponsored noopener"');
  process.exit(1);
}
if (violations > 0) process.exit(1);
