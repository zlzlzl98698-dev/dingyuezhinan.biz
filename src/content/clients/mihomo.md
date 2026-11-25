---
title: "Mihomo（原 Clash.Meta）代理核心原理与配套客户端指南 | 订阅指南"
description: "解析 Mihomo 内核（原 Clash.Meta）的技术定位、支持协议、YAML 核心配置结构（DNS/TUN/策略组）及全平台前端选型与避坑原则。"
pubDate: 2026-11-24
updatedDate: 2026-11-25
category: "客户端软件指南"
tags: ["Mihomo", "Clash.Meta", "代理核心", "VLESS", "Hysteria 2"]
pillar: "clients"
primaryKeyword: "Mihomo"
searchIntent: "informational"
entities: ["Mihomo", "Clash.Meta", "Clash Verge Rev", "FlClash", "OpenClash", "Nikki"]
sources: ["src/data/clients.json", "第三方代理客户端.txt"]
dataStatus: "measured"
clientSlug: "mihomo"
draft: false
faq:
  - question: "Mihomo 和 Clash.Meta 是同一个东西吗？"
    answer: "是的。原版 Clash 核心停止维护后，社区核心分支 Clash.Meta 更名为 Mihomo 并继续由 MetaCubeX 团队活跃迭代，目前是 Clash YAML 生态的事实标准底层代理引擎。"
  - question: "普通用户能直接下载 Mihomo 当桌面软件双击打开吗？"
    answer: "不适合普通用户直接双击运行。Mihomo 本身是纯命令行核心二进制程序，没有图形界面，日常使用应当安装内置了 Mihomo 内核的前端客户端，例如 Clash Verge Rev、FlClash 或 OpenWrt 下的 OpenClash。"
  - question: "为什么老旧 Clash 客户端连不上现在的新机场节点？"
    answer: "目前许多主流机场（如光速云、一翻云）已启用 VLESS Reality、AnyTLS 或 Hysteria 2 等现代协议，只有基于 Mihomo 或 sing-box 的新版核心才能识别这些协议参数，停止维护的老旧 Clash 内核会直接报错或全部超时。"
  - question: "Mihomo 和 sing-box 内核应该怎么选？"
    answer: "如果机场主要下发标准 Clash YAML 订阅且你习惯使用丰富策略组和脚本覆写，优先选 Mihomo 系客户端；如果偏好统一 JSON 配置或移动端极低功耗，也可以选用基于 sing-box 的客户端。"
---

Mihomo（前身为 Clash.Meta）是目前 Clash 生态体系下最核心的开源网络代理引擎，由 MetaCubeX 团队在 GitHub 持续开发维护。与平时在桌面上双击即可操控的图形客户端不同，Mihomo 本身是一套没有可视化窗口的底层核心程序，专门负责执行流量拦截、加密协议握手、Fake-IP DNS 解析与分流策略调度。当前市面上绝大多数主流 Clash 生态软件，本质上都是运行在 Mihomo 核心之上的一层交互界面。

## 内核定位与协议兼容矩阵

2023 年底原版 Clash 核心归档停止更新之后，早期的 Clash for Windows 等传统软件随之冻结在旧代核心上，不仅无法修复潜在安全漏洞，也无力解析后续迅速普及的抗干扰传输协议。Mihomo 完整继承并大幅扩展了 Clash YAML 配置规范，成为桌面、移动端与软路由生态共同的底层底座。根据本站客户端数据库资料，Mihomo 的技术规格整理如下。

| 技术维度 | Mihomo 内核公开及实测规格 | 实际应用含义 |
| --- | --- | --- |
| 软件类别 | 网络代理核心（命令行引擎） | 需搭配前端界面或系统服务脚本运行 |
| 适配平台 | Windows、macOS、Linux、Android、OpenWrt | 覆盖主流桌面、安卓移动与路由器系统 |
| 传统协议 | Shadowsocks、VMess、Trojan、SOCKS5、HTTP | 兼容各类历史存量节点与中转线路 |
| 现代协议 | VLESS（含 XTLS-Vision 与 Reality）、Hysteria 2、TUIC、AnyTLS | 满足高抗封锁与高并发网络环境要求 |
| 授权状态 | 免费开源 | 托管于 GitHub 官方仓库公开发布 |
| 维护状态 | 活跃维护 | 持续跟进协议更新与内核级性能修补 |

以本站评测数据库中的真实机场服务为例，[光速云](/reviews/guangsuyun/) 的 70 节点网络就同时部署了 VLESS 与 AnyTLS 协议，[一翻云](/reviews/yifan/) 也配置了 Hysteria 2 与 VLESS-Reality 节点。如果设备仍停留在未接入 Mihomo 的远古 Clash 客户端，导入此类订阅后往往会出现配置校验失败或节点全部无响应的现象，根源就在底层内核协议栈已经脱节。

## Mihomo 标准 YAML 核心结构解析

虽然普通用户无需手写整套配置文件，但了解 Mihomo 最核心的几块配置语法，能够快速读懂机场订阅结构并在客户端覆写面板中定位问题。以下是一份标准的 Mihomo 配置框架示例，包含监听端口、TUN 虚拟网卡、防泄漏 DNS、远程节点集与规则集联动机制。

```yaml
mixed-port: 7890
allow-lan: false
mode: rule
unified-delay: true
tcp-concurrent: true

tun:
  enable: true
  stack: mixed
  dns-hijack:
    - "any:53"
  auto-route: true
  auto-detect-interface: true

dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "localhost.ptlogin2.qq.com"
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://1.1.1.1/dns-query
    - https://dns.google/dns-query

proxy-groups:
  - name: "主选节点"
    type: select
    proxies:
      - "自动测速"
      - "故障转移"
  - name: "自动测速"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
  - name: "故障转移"
    type: fallback
    url: "https://www.gstatic.com/generate_204"
    interval: 300

rules:
  - GEOSITE,private,DIRECT
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,主选节点
```

这段配置直观体现了 Mihomo 相比传统内核的几项核心增强能力。

### 强化 DNS 与 Fake-IP 防泄漏

在透明代理与 [TUN 模式](/guides/tun-mode/) 环境下，DNS 污染和重复查询拖慢首屏加载是常见痛点。通过设置 `enhanced-mode` 为 `fake-ip` 并搭配 `fake-ip-filter` 过滤内网及特定本地认证域名，内核可以在本地立即响应虚拟 IP 并交由远端节点完成真实域名解析，从机制上避免本地 DNS 泄漏。搭配 `default-nameserver` 与加密的 `nameserver`、`fallback` 组合，能够清晰隔离国内直连查询与境外加密解析，具体调优方法见 [DNS 设置与防泄漏指南](/guides/dns-settings/)。

### 并发握手机制与策略组自动化

开启 `unified-delay` 与 `tcp-concurrent` 可以让测速结果更贴近真实 TCP 握手表现，同时允许内核在建立连接时并发尝试多个候选地址。借助 `url-test`（按延迟周期选优）与 `fallback`（主节点失联自动切备用）策略组，再结合 `rule-providers` 与 `proxy-providers` 远程拉取分流列表，多线路机场环境下的节点切换可以做到自动完成。

## 全平台前端客户端选型建议

普通消费者平时不需要单独运行 Mihomo 命令行程序，直接根据自己的操作系统挑选封装了该内核的活跃前端即可。

1. Windows、macOS 与 Linux 桌面端优先选择 [Clash Verge Rev](/clients/clash-verge-rev/) 或 [FlClash](/clients/flclash/)。前者提供丰富的脚本覆写与精细界面调控，后者采用统一跨平台设计且轻量直观。若在历史教程中看到 Mihomo Party 的推荐，使用前应自行核实仓库最新维护状态，不宜未经核查就作为长期首选。
2. Android 手机与平板用户可在 [FlClash](/clients/flclash/) 与 [Clash Meta for Android](/clients/clash-meta/) 之间二选一，坚决避开早已停止维护的原版 Clash for Android。
3. OpenWrt 软路由用户主要使用 [OpenWrt 客户端组件](/clients/openwrt-clients/) 中的 OpenClash（支持切换至 Meta/Mihomo 内核）以及面向新版本固件开发的 Nikki。部署前务必核对路由器硬件架构、防火墙与包管理器环境，例如 Nikki 项目明确要求运行在 OpenWrt 24.10 及以上系统版本，旧固件切勿跨版本强行安装。

## 内核对比、校验规范与常见踩坑

在多核心生态中，除了 Mihomo 之外，还有 [sing-box](/clients/sing-box/) 与 Xray 两大主力引擎。Mihomo 最大的优势是与国内机场普遍下发的 Clash YAML 订阅完全契合，拿到链接即可直接生效；sing-box 则采用标准 JSON 配置格式，架构紧凑，是 Hiddify 与 Karing 等客户端的底层引擎；而像 [v2rayNG](/clients/v2rayng/) 这类基于 Xray 核心的软件则无法直接解析 Clash YAML 策略组，在混用不同设备时应提前核对机场后台提供的订阅格式。

对于自行在路由器或 Linux 主机上手动替换 Mihomo 二进制核心的进阶玩家，务必从 GitHub 官方仓库 `MetaCubeX/mihomo` 的 Releases 页面下载对应 CPU 指令集文件（如 `amd64`、`arm64`、`mipsle` 等），并在解压替换前执行 SHA256 校验。

```bash
# Linux 或路由器本地终端核对 Mihomo 核心压缩包摘要
sha256sum ./mihomo-linux-amd64-latest.gz
```

日常排障中还有两类常见误区值得留意。第一，如果开启路由或桌面透明代理后发现部分需要识别真实局域网 IP 的软件或游戏联机异常，需检查 `fake-ip-filter` 列表是否漏掉了对应域名。第二，若发现 `GEOSITE` 或 `GEOIP` 规则报错失效，多半是软件首次运行未能成功下载内置地理数据库文件，此时可手动检查网络连通性或更新客户端内置数据库包。

## 常见问题解答

### Mihomo 和 Clash.Meta 是同一个东西吗

是的。原版 Clash 核心停止更新后，社区主力分支 Clash.Meta 更名为 Mihomo 并由 MetaCubeX 团队继续维护。两者指代同一条核心代码演进路线，只是在不同时期的项目称谓不同。

### 普通用户能直接下载 Mihomo 当桌面软件双击打开吗

不建议普通用户直接使用裸内核程序。官方发布的 Mihomo 核心是纯命令行可执行文件，没有开关按钮与节点列表界面，必须配合 Clash Verge Rev、FlClash、Clash Meta for Android 或 OpenClash 等图形前端才能轻松管理订阅。

### 为什么老旧 Clash 客户端连不上现在的新机场节点

因为老旧 Clash 内核只支持早期协议栈，而目前许多一线和专线机场已经普遍部署 VLESS Reality、AnyTLS 与 Hysteria 2 等新型传输协议。旧内核无法识别这些配置字段，必须换用集成 Mihomo 或 sing-box 核心的新版客户端。

### Mihomo 和 sing-box 内核应该怎么选

如果所使用的机场主力提供 Clash YAML 订阅，或者你习惯依靠丰富的 Clash 策略组和覆写脚本精细分流，选择 Mihomo 系前端最省事。如果你更喜欢跨端统一的轻量化工具、需要同时合并多家订阅，或者机场本身下发原生 sing-box 配置，则可以考虑基于 sing-box 的应用。
