import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const backlog = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/content-backlog.json'), 'utf8'));
const topP0 = backlog.filter((b) => b.priority === 'P0' || b.priority === 'P1').slice(0, 20);
const outPath = path.join(ROOT, 'reports/next-content-briefs.md');

const md = [
  '# 下一阶段高优先级内容选题任务单',
  '',
  `生成时间：${new Date().toISOString().slice(0, 10)}`,
  '',
  '| 优先级 | 目标关键词 | 目标 URL | 所属集群 | 搜索意图 | 是否需补资料 |',
  '|---|---|---|---|---|---|',
  ...topP0.map(
    (b) => `| ${b.priority} | ${b.keyword} | \`${b.targetUrl}\` | ${b.clusterId} | ${b.searchIntent} | ${b.requiresDataCheck ? '是' : '否'} |`
  ),
].join('\n');

fs.writeFileSync(outPath, md, 'utf8');
console.log(`Generated ${topP0.length} content briefs at reports/next-content-briefs.md`);
