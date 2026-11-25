import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const keywords = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/keywords.json'), 'utf8'));
const clusters = {};

for (const k of keywords) {
  if (!clusters[k.clusterId]) {
    clusters[k.clusterId] = { clusterId: k.clusterId, count: 0, urls: new Set() };
  }
  clusters[k.clusterId].count += 1;
  clusters[k.clusterId].urls.add(k.targetUrl);
}

console.log(`Clustered ${keywords.length} active keywords into ${Object.keys(clusters).length} topic clusters.`);
