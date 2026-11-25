# 关键词矩阵与搜索意图归属报告

- **核查日期**：2026-11-25
- **数据来源**：`src/data/keywords.json`、`src/data/keyword-clusters.json`、`src/data/keyword-page-map.json`、`src/data/content-backlog.json`

## 1. 关键词库体量与状态统计

| 维度 | 数量 | 说明 |
|---|---:|---|
| 已映射活跃关键词 (`keywords.json`) | 340 条 | 含 216 个主映射目标 URL 及同意图品牌词合并记录 |
| 专题集群总数 (`keyword-clusters.json`) | 42 个 | 覆盖 10 个一级专题 + 31 个独立品牌集群 + 对比集群 |
| 已完成可索引主目标页 | 218 个 | 已全部构建至 `dist/` 并纳入 `sitemap-0.xml` |
| 规划待写长尾词库 (`content-backlog.json`) | 194 条 | 归属后续扩编待办（155 项品牌细分词 + 38 项剩余双边对比等） |
| 关键词互抢冲突数 (`detect-cannibalization.mjs`) | 0 个 | 一条主要搜索意图严格绑定一个唯一主目标 URL |

## 2. 搜索表现数据接入机制

由于当前尚未配置 Google Search Console 与 Bing Webmaster Tools 实时 API 凭证，所有关键词的 `searchVolume` 均诚实留空为 `null`，严禁伪造搜索量或竞争度。后续可通过 `src/data/keywords-import-template.csv` 与 `npm run keywords:import` 导入真实导出数据，并运行 `npm run briefs:generate` 输出下一阶段选题任务单（已更新于 `reports/next-content-briefs.md`）。
