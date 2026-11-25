import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src/content');

function walk(dir) {
  let out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out = out.concat(walk(full));
    else if (/\.(md|mdx)$/i.test(ent.name)) out.push(full);
  }
  return out;
}

const files = walk(CONTENT_DIR);
const issues = [];

for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  const body = raw.replace(/^---[\s\S]*?---\r?\n/, '').replace(/```[\s\S]*?```/g, '');
  const rel = path.relative(ROOT, f);
  if (/——/.test(body)) issues.push(`${rel}: contains ——`);
  if (/不是[^，。\n]{1,20}而是/.test(body)) issues.push(`${rel}: contains 不是...而是`);
  if (/与其说[^，。\n]{1,20}不如说/.test(body)) issues.push(`${rel}: contains 与其说...不如说`);
  if (/看似[^，。\n]{1,15}实则/.test(body)) issues.push(`${rel}: contains 看似...实则`);
  if (/说白了|说穿了|先说结论/.test(body)) issues.push(`${rel}: contains 说白了/先说结论`);
  if (/赋能|抓手|商业闭环|价值闭环|底层逻辑|顶层设计|认知跃迁|降本增效|内容矩阵|全链路|组合拳/.test(body)) {
    issues.push(`${rel}: contains banned jargon`);
  }
}

console.log(`Prose audit complete across ${files.length} Markdown files. Violations: ${issues.length}`);
if (issues.length > 0) {
  console.log(issues.join('\n'));
  process.exit(1);
}
