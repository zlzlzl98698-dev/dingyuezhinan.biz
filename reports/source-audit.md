# 订阅指南（dingyuezhinan.biz）全量资料审计报告

- **审计时间**：2026-11-24
- **审计范围**：桌面源资料目录 `机场品牌信息/`、`logos/`、`光速云测试图解锁图/`、`机场测速实测资料包_2026-08-11_发布整理版_V2.zip`
- **隔离边界**：已按工程规范与 `jichangceping.biz`、`jichangduibi.biz` 保持完全隔离，未复制其页面结构、文案或默认水印。

## 1. 源文件清单与用途映射

| 源文件路径 | 文件大小 | 核心内容 | 对应系统模块 |
|---|---:|---|---|
| `机场品牌信息/32家机场品牌清单.txt` | 58,166 B | 含前段 28 条品牌节段 + 总表 + 末尾追加 4 条历史档案（含 Firefly 重复记录） | `brands.json`、`plans.json`、`affiliate-links.ts` |
| `机场品牌信息/光速云品牌信息.txt` | 4,178 B | 光速云独立档案（2020年运营、优惠码 `AMM`、4档套餐原文与线路描述） | 光速云旗舰专题 `/reviews/guangsuyun/` |
| `机场品牌信息/第三方代理客户端.txt` | 5,863 B | Windows/Android/iOS/macOS/Linux/OpenWrt 全平台客户端清单与维护警告 | `clients.json`、`/clients/` 知识库 |
| `机场品牌信息/机场品牌图表样式.txt` | 9,133 B | Dark Network Observatory 暗色技术看板规范与状态语汇定义 | `src/components/charts/` 组件系统 |
| `机场品牌信息/内容矩阵.txt` | 5,549 B | 品牌库、大纲、SEO/GEO、内链矩阵与验收规则 | 全站内容架构与 QA 脚本 |
| `光速云测试图解锁图/photo_2026-08-19_*.jpg` | 5 张 | 2026-08-19 MiaoKo 自定义测试截图（62节点普通测速 3 张 + 70节点基础流媒体与订阅速度 2 张） | `/reviews/guangsuyun/` 实测证据区 |
| `机场测速实测资料包_2026-08-11_发布整理版_V2.zip` | 38.67 MB | `README_16个机场测速实测资料_最新版.txt`、`speedtest-manifest.json`、16 张品牌测速 PNG（1122×1402）及额外素材 | `benchmarks.json`、各品牌测速展示区 |
| `logos/*` | 30 个文件 | 品牌 Logo 与主图素材（含部分未入库品牌的额外 Logo） | `public/images/logos/` |

## 2. 品牌去重与独立实体总数审计

尽管清单文件名标注为“32家”，实际逐条审计并去重后，**可识别独立机场品牌共计 31 家**（不人为补造第 32 家）：

1. **商业优先精选序列（11 家）**：光速云 (`guangsuyun`)、暮光加速 (`muguang`)、飞猫云 (`feimao`)、微风网络 (`weifeng`)、大佬云 (`dalaoyun`)、星岛梦 (`xingdaomeng`)、隐形人 (`yinxingren`)、二猫云 (`ermao`)、无忧链接 (`wuyou`)、唯兔云 (`weitu`)、Firefly (`firefly`，合并了第 8 条 `Firefly` 与文末 `Firefly 萤火虫` 历史记录)。
2. **常规序列品牌（17 家）**：宇宙云 (`yuzhou`)、U1S1 (`u1s1`)、灵猫网络 (`lingmao`)、极连云 (`jilian`)、光年梯 (`guangnian`)、一翻云 (`yifan`)、SOGO云 (`sogo`)、可信云 (`kexin`)、速界 (`sujie`)、闪跃 (`shanyue`)、全球云 (`quanqiu`)、闪电鼠 (`shandianshu`)、云界线 (`yunjiexian`)、榴莲云 (`liulianyun`)、神行加速 (`shenxing`)、环球梯 (`huanqiuti`)、梯子云 (`tiziyun`)。
3. **文末追加历史档案（3 家，排在品牌库后部）**：灵动云 (`lingdong`)、浪网 (`langwang`)、边缘节点 EdgeNova (`edgenova`)。

## 3. 未入库素材边界说明

`logos/` 与测速压缩包中存在部分未进入 31 家清单的素材（如 `快狸-节点测速实测.png`、`kuaili_logo.png`、`flyingbird.webp`、`flyv机场256x256.png`、`totoro.webp`、`bee_logo.webp`、`echo_logo.webp`、`kuku_logo.webp`、`qyt_logo.webp`、`yinyun_logo.webp`、`无忧链接.jpg`、`无忧链接2.jpg`）。遵循严格边界，这些素材不擅自升格为独立品牌评测页。

## 4. 关键词与 GEO 问题库审计

桌面源目录中未提供独立 CSV/JSON 导出表，本站已按主指令与 `内容矩阵.txt` 规范构建零虚构指标的 `keywords.json`、`keyword-clusters.json`、`keyword-page-map.json`、`geo-questions.json`、`content-opportunities.json`、`content-backlog.json`、`content-refresh.json` 及 CSV/JSON 导入与冲突检测脚本。
