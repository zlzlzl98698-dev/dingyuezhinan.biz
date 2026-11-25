---
title: "Clash 配置知识入门：Profile、Proxy Group 与策略组逻辑详解 | 订阅指南"
description: "通俗拆解 Clash YAML 配置文件的核心结构，讲解 Profile、Proxy、Proxy Group（手动切换/自动测速/故障转移）与 Rule 的协同工作原理。"
pubDate: 2026-11-24
updatedDate: 2026-11-25
category: "使用教程"
tags: ["Clash 配置", "YAML", "Proxy Group", "策略组", "Mihomo"]
pillar: "guides"
primaryKeyword: "Clash 配置知识"
searchIntent: "informational"
entities: ["Clash", "Mihomo", "Clash Verge Rev", "FlClash", "YAML", "OpenClash"]
sources: ["src/data/navigation.ts", "src/data/clients.json"]
dataStatus: "measured"
draft: false
faq:
  - question: "什么是 Clash 配置文件里的 Profile（配置档）？"
    answer: "Profile 就是你导入软件的完整 YAML 规则与节点清单文件。每导入一家机场的订阅链接，就会在列表里生成一份独立的 Profile，每次更新订阅本质上就是从服务器重新下载覆盖这份文件。"
  - question: "策略组里的自动选择和故障转移有什么区别？"
    answer: "自动选择（url-test）会定期对组内所有节点测速，并自动切换到延迟最低的节点；故障转移（fallback）则会按照节点列表从上到下的顺序固定使用第一个可用的节点，只有当它彻底连不通时才会自动顺延切到下一个。"
  - question: "为什么我在 Clash Verge Rev 里手动修改了配置，过几天又恢复原样了？"
    answer: "因为机场定时更新订阅时会从远程服务器拉取一份全新的 YAML 文件直接覆盖本地老文件。如果想让自己的自定义规则长期保留不被覆盖，必须使用软件提供的覆写（Merge/Script）功能，而不是直接编辑订阅原文件。"
  - question: "同一份 Clash YAML 配置里可以同时放几家机场的节点吗？"
    answer: "标准单条订阅下发的 Profile 只包含该机场自己的节点，但借助 Clash Verge Rev 的全局覆写脚本或 proxy-providers 远程集合功能，可以把多家的节点清单聚合到同一个配置档中统一调度。"
---

用惯了 [Clash Verge Rev](/clients/clash-verge-rev/)、[FlClash](/clients/flclash/) 或 OpenClash 的用户，日常点开代理面板看到的地区分组与自动选路开关，背后都依托于同一套基于 [Mihomo](/clients/mihomo/) 内核的 Clash YAML 配置文件结构。这份配置文件由四个层级组成，最外层的 `Profile` 是完整配置蓝图，`proxies` 存放服务器连接参数，`proxy-groups` 把零散节点编排成手动选择、自动测速或故障转移入口，`rules` 则按从上到下的首次命中原则决定流量走向。看懂这四层配合机制，并且养成用覆写功能替代直接修改原文件的习惯，就能解决绝大多数分流错乱与配置丢失问题。

## 第一层概念 Profile 配置档结构

在桌面或移动端客户端左侧栏的配置管理页里，每一条独立记录都是一个完整的 Profile 配置档。同一时间客户端内核只能激活运行某一个配置档，当你购买了两家机场并分别导入链接后，列表里就会出现两份独立文件，点击切换选中的配置档，整套节点清单和路由规则都会随之切换。

一份完整且可独立运行的标准 YAML Profile，通常会同时包含以下五个基础段落。

1. 端口与基础运行参数，例如混合代理监听端口 `mixed-port`、是否允许局域网设备接入 `allow-lan`、以及当前的运行模式 `mode`。
2. 内置域名解析模块 `dns`，用于控制海外域名防污染和国内域名就近解析，具体机制可配合查阅 [DNS 设置指南](/guides/dns-settings/)。
3. 落地服务器集合 `proxies`，存储所有节点的主机地址、端口、协议类型与加密密钥。
4. 策略分组容器 `proxy-groups`，将数量庞大的节点按地区、倍率或业务场景打包成易于点击的虚拟开关。
5. 路由匹配规则集 `rules`，决定每一条网络请求交给直连出口、拦截丢弃还是某个特定策略组。

## 第二层概念 Proxies 原始节点库

配置文件中的 `proxies` 字段记录了服务商提供给你的每一台落地服务器的真实连接参数，包括节点名称、域名或 IP、端口号、传输协议（如 Shadowsocks、VLESS、Trojan、Hysteria 2 或 AnyTLS）以及对应的身份密码或 UUID。

普通用户在日常使用中不需要手动改动这一层的技术字段，重点应放在读懂节点名称携带的计费与用途标签。很多服务商会在节点名称末尾标注 `1x`、`2x` 等倍率提示，或者标明流媒体、AI 专用分组。如果忽略节点名称里的倍率后缀，长时间用来下载大文件会成倍扣减月度流量包配额，相关账本换算规则可参考 [线路倍率解析](/network/multiplier/)。

## 第三层概念 Proxy Groups 四种核心策略组

直接面对几十上百个单节点时，每次打开不同网站都需要手动切节点会非常繁琐。策略组的作用是把多个底层节点包装成一个统一的调度出口。在 Mihomo 生态的图形界面里，最常见到以下四种策略组类型。

| 策略组类型 | YAML 字段值 | 调度与切换机制 | 出口 IP 稳定性 | 适用场景与常见误区 |
|---|---|---|---|---|
| 手动选择 | `select` | 完全由用户在面板点击指定某地区分组或单节点 | 极高，除非人工切换否则保持不变 | 适合总开关、AI 工具锁定地区或电商后台，最不易误触发异地风控 |
| 自动选择 | `url-test` | 按设定秒数定期对组内节点并发测速，自动切到延迟最低项 | 较低，网络波动时可能频繁跨节点跳变 | 适合日常刷网页和视频追剧，不建议直接用来挂强 IP 风控的 AI 网页端 |
| 故障转移 | `fallback` | 严格按节点列表从上到下锁定第一个连通项，超时才顺延切换 | 较高，平时维持固定出口，断网才自动接替 | 适合既需要固定出口 IP 又担心深夜节点临时维护断连的用户 |
| 负载均衡 | `load-balance` | 把并发请求轮询或按散列算法分散到组内多个不同节点 | 极低，毫秒级请求可能落在不同出口服务器上 | 仅适合多线程静态资源拉取，日常登录网页账号或看流媒体极易导致掉线 |

新手最容易踩的误区，是把“AI 工具”或“跨境账号登录”分组直接挂在 `url-test` 自动测速或 `load-balance` 负载均衡下。当两条线路的测试延迟只差几毫秒时，自动测速组可能在十几分钟内来回切换节点，造成外部平台判定登录地异常。将这类敏感业务单独挂载到 `select` 手动选择分组，或配置带有合理 `tolerance` 容差阈值的 `fallback` 分组，使用体验会稳健得多。

## 第四层概念 Rules 规则匹配与最小可用 YAML 模板

配置文件底部的 `rules` 板块决定了浏览器和桌面应用发出的每一条连接究竟由谁处理。Clash 内核在执行规则匹配时遵循严格的**自上而下首次命中即停止**原则，排在越靠前的规则优先级越高。

下面是一份剥离了敏感账号信息的通用 Mihomo YAML 结构示意，展示基础端口、三类常用策略组与规则优先级的典型排列方式。

```yaml
mixed-port: 7897
allow-lan: false
mode: rule
log-level: info

proxies:
  - name: "HK-Example-01"
    type: ss
    server: hk01.example.com
    port: 443
    cipher: aes-128-gcm
    password: "YOUR_PASSWORD"
  - name: "JP-Example-01"
    type: vless
    server: jp01.example.com
    port: 443
    uuid: "00000000-0000-0000-0000-000000000000"
    tls: true

proxy-groups:
  - name: "节点选择"
    type: select
    proxies:
      - "自动测速"
      - "故障转移"
      - "HK-Example-01"
      - "JP-Example-01"

  - name: "自动测速"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 300
    tolerance: 50
    proxies:
      - "HK-Example-01"
      - "JP-Example-01"

  - name: "故障转移"
    type: fallback
    url: "https://www.gstatic.com/generate_204"
    interval: 300
    proxies:
      - "HK-Example-01"
      - "JP-Example-01"

rules:
  - DOMAIN-SUFFIX,openai.com,节点选择
  - GEOSITE,cn,DIRECT
  - GEOIP,CN,DIRECT,no-resolve
  - MATCH,节点选择
```

在这段标准结构中，如果一个请求的目标域名是国内常见站点，当内核读到 `GEOSITE,cn,DIRECT` 时就会立刻放行直连，不会再去匹配末尾的 `MATCH,节点选择`。需要注意 `GEOIP,CN,DIRECT,no-resolve` 末尾的 `no-resolve` 参数，它告诉内核在遇到未解析出 IP 的域名请求时先跳过本条 IP 规则，避免提前向本地发起无谓的 DNS 查询导致响应拖慢或解析泄漏。更完整的模式切换区别可以对照 [分流规则详解](/guides/routing-rules/)。

## 为什么必须使用覆写功能而非直接改原文件

很多用户在看懂 YAML 结构后，会习惯在客户端里右键点击当前订阅配置，选择“编辑源文件”，把某几个自己常访问的网站手动写进 `rules` 列表里。这种做法只会在当下生效，一旦到达客户端设定的自动更新周期，机场服务器传回的新配置文件会直接把本地源文件覆盖重写，之前手动加进去的规则瞬间清空。

正确的定制方案是利用现代客户端自带的**全局覆写（Merge 或 Script）**机制。以 [Clash Verge Rev](/clients/clash-verge-rev/) 为例，你可以在“订阅”界面建立一个独立的覆写配置，把需要前置的个人规则放进 `prepend-rules` 字段，或者调整 `tun` 和 `dns` 参数。每当订阅刷新时，客户端会先下载机场最新的节点列表，随后自动将你的本地覆写片段合并进去。以下是一段常见的 YAML 覆写片段示例。

```yaml
prepend-rules:
  - DOMAIN-SUFFIX,internal.example.com,DIRECT
  - DOMAIN-KEYWORD,research-tool,节点选择
```

采用覆写机制还有一个明显好处，当覆写脚本本身缩进出错导致内核启动失败时，你只需要暂时关闭该覆写条目就能立刻恢复原版配置，不用反复删掉订阅重新拉取。如果修改完规则后发现整个配置档加载报错或无法同步更新，可以结合 [订阅更新错误排查](/troubleshooting/subscription-update-failed/) 检查 YAML 缩进空格与引号闭合情况。

## 常见问题

### 什么是 Clash 配置文件里的 Profile（配置档）？

Profile 就是你导入软件的完整 YAML 规则与节点清单文件。每导入一家机场的订阅链接，就会在列表里生成一份独立的 Profile，每次更新订阅本质上就是从服务器重新下载覆盖这份文件。

### 策略组里的自动选择和故障转移有什么区别？

自动选择（url-test）会定期对组内所有节点测速，并自动切换到延迟最低的节点；故障转移（fallback）则会按照节点列表从上到下的顺序固定使用第一个可用的节点，只有当它彻底连不通时才会自动顺延切到下一个。

### 为什么我在 Clash Verge Rev 里手动修改了配置，过几天又恢复原样了？

因为机场定时更新订阅时会从远程服务器拉取一份全新的 YAML 文件直接覆盖本地老文件。如果想让自己的自定义规则长期保留不被覆盖，必须使用软件提供的覆写（Merge/Script）功能，而不是直接编辑订阅原文件。

### 同一份 Clash YAML 配置里可以同时放几家机场的节点吗？

标准单条订阅下发的 Profile 只包含该机场自己的节点，但借助 Clash Verge Rev 的全局覆写脚本或 proxy-providers 远程集合功能，可以把多家的节点清单聚合到同一个配置档中统一调度。
