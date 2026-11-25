# GEO / AEO（生成式搜索优化）验收报告

- **核查日期**：2026-11-25
- **实体图谱规模**：51 个统一实体（`src/data/entities.json`）、覆盖 `Organization`、31 个 `Brand`、12 个 `ClientSoftware`、4 个 `NetworkProtocol`、3 个 `NetworkRoute`

## 1. Entity-First 与结构化关系落盘

- `src/data/entities.json`：为订阅指南及全部 31 家品牌、12 款客户端建立稳定 `@id` 与规范 URL。
- `src/data/entity-relations.json`：映射品牌与专线线路（IEPL/IPLC/BGP）、协议（VLESS/Shadowsocks/Trojan/Hysteria 2）及客户端兼容关系。
- `src/data/entity-aliases.json`：统一 `Firefly` / `Firefly 萤火虫`、`唯兔云` / `V2云`、`光速云` / `LightSpeed` 等中英文与别名指向。
- `src/data/entity-sources.json`：按实体关联原始资料路径与核实时间。

## 2. Answer-First 与条件化结论核验

1. **直接结论前置**：评测与长尾文均在首段或首节直接回答核心选型、费用或故障结论，再给出前提与例外。
2. **图表机器可读输出**：`SpeedReportChart.astro` 等 Dark Network Observatory 组件除深色可视化进度条外，均同步输出标准 HTML `<table>` 与标注口径（如明确标注 2026-10-19 为非晚高峰记录、2026-08-19 截图保留 `仅APP(HK)` 与 `送中(CN)` 负向样本）。
3. **不承诺引用结果**：本站仅通过清晰实体、带单位数据、来源日期与条件边界提高生成式搜索系统理解与检索概率，不作出任何收录或引用承诺。
4. **补充入口 `llms.txt`**：已于 `/llms.txt` 输出结构化站点总览，不替代 Sitemap 与常规静态 HTML 抓取路径。
