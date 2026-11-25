---
title: "sing-box 通用代理平台与官方客户端（SFA/SFI/SFM）指南 | 订阅指南"
description: "解析 sing-box 统一通用代理内核的跨平台体系，介绍官方 SFA、SFI、SFM 客户端、原生 JSON 配置结构与衍生客户端选型。"
pubDate: 2026-11-24
updatedDate: 2026-11-25
category: "客户端软件指南"
tags: ["sing-box", "SFA", "SFI", "SFM", "通用代理核心"]
pillar: "clients"
primaryKeyword: "sing-box"
searchIntent: "informational"
entities: ["sing-box", "SFA", "SFI", "SFM", "Hiddify", "Karing", "HomeProxy"]
sources: ["src/data/clients.json", "第三方代理客户端.txt"]
dataStatus: "measured"
clientSlug: "sing-box"
draft: false
faq:
  - question: "sing-box 和 Mihomo 有什么区别？"
    answer: "两者都是当前主流的现代开源代理内核。Mihomo 延续 Clash YAML 配置语法，对老牌机场订阅兼容度极高；sing-box 采用独立的原生 JSON 配置格式，架构统一且内存控制优秀，是 Hiddify、Karing 与 HomeProxy 等软件的底层引擎。"
  - question: "什么是官方所说的 SFA、SFI 和 SFM？"
    answer: "它们分别是 sing-box 官方团队维护的各平台图形客户端简称，对应 sing-box for Android（SFA）、sing-box for iOS（SFI）和 sing-box for macOS（SFM），在官方文档站提供对应下载与配置指引。"
  - question: "机场只提供 Clash 订阅链接能直接放进官方 sing-box 客户端吗？"
    answer: "官方原生客户端主要读取 sing-box JSON 格式，无法直接加载复杂 Clash YAML 文件。如果手头只有 Clash 链接，可以改用自带前端兼容转换的 Hiddify 或 Karing，或者确认机场后台是否已经新增 sing-box 专用订阅出口。"
  - question: "使用第三方在线转换网站把 Clash 转成 sing-box 安全吗？"
    answer: "存在明显的隐私与账号安全风险。带个人识别凭证的订阅链接一旦提交给来路不明的公开转换站，对方服务端就能记录你的节点地址与订阅 Token，因此只建议使用机场官方原生出口、本地客户端兼容层或自行部署的转换服务。"
---

sing-box 是由 SagerNet 社区主导开发并保持活跃维护的统一通用代理平台内核。与早期只专注于单一命令行转发的后端引擎不同，sing-box 从设计起就将核心引擎与跨平台官方客户端矩阵结合在一起，覆盖 Android、iOS、macOS、Windows、Linux 与 OpenWrt 软路由环境。如今市面上广泛流行的 [Hiddify](/clients/hiddify/)、[Karing](/clients/karing/) 以及 OpenWrt 插件 HomeProxy，底层网络转发与分流全部建立在 sing-box 之上。

## sing-box 核心规格与官方客户端矩阵

传统的代理软件生态长期各自为政，Xray 系偏重轻量单节点管理，而 Clash 系以 YAML 策略组见长。sing-box 用同一套架构收拢了多种加密与传输协议，并在移动端低内存占用与高并发处理方面形成了明显优势。结合本站客户端数据库记录，sing-box 的核心支持范围整理如下。

| 维度项目 | sing-box 实测与公开资料 | 补充说明 |
| --- | --- | --- |
| 覆盖平台 | Windows、macOS、Linux、Android、iOS、OpenWrt | 官方与衍生前端共同构成全平台体系 |
| 核心定位 | 统一通用网络代理核心 | 原生使用结构化 JSON 配置文件 |
| 协议兼容 | Shadowsocks、VMess、VLESS、Trojan、Hysteria 2、TUIC、WireGuard、Naive | 原生整合多种主流与抗干扰传输协议 |
| 授权与渠道 | 免费开源 | 通过官方文档站、GitHub 与海外 App Store 分发 |
| 维护状态 | 活跃维护 | 协议迭代节奏快，需注意配置字段版本兼容性 |

针对不同操作系统，官方直接维护了一套命名清晰的图形客户端体系，社区教程里常见的三个英文缩写分别代表对应系统版本。

1. Android 平台对应 sing-box for Android，通常简称为 SFA，支持系统级 VPN 接口接管与配置模板导入。
2. iOS 平台对应 sing-box for iOS，通常简称为 SFI，在海外地区 App Store 提供下载，能够直接对接 iPhone 与 iPad 的网络扩展框架。
3. macOS 平台对应 sing-box for macOS，通常简称为 SFM，原生适配苹果桌面系统的网络扩展与系统代理机制。
4. Linux、Windows 桌面与服务器环境则提供 sing-box for Desktop 方向及命令行发行版，在路由器场景中也由 [OpenWrt 客户端组件](/clients/openwrt-clients/) 中的 HomeProxy 承接。

与 [Mihomo](/clients/mihomo/) 相比，两者在现代协议支持面上几乎旗鼓相当，主要差异集中在配置生态与工程取向。Mihomo 侧重无缝继承庞大的 Clash YAML 存量订阅市场；sing-box 更强调配置 schema 的严谨统一与跨平台轻量化，对于手机端后台驻留与软路由有限内存环境尤为友好。

## 原生 JSON 核心配置结构拆解

许多初次尝试官方 SFA、SFI 或 SFM 的用户，最容易在导入订阅第一步遭遇格式错误，核心原因在于 sing-box 原生读取的是 JSON 配置文件，语法和缩进结构与 Clash YAML 完全不兼容。理解它的几大顶层模块，有助于判断订阅是否合法以及如何排查连不上网的问题。

```json
{
  "log": {
    "level": "info",
    "timestamp": true
  },
  "dns": {
    "servers": [
      { "tag": "dns_proxy", "address": "https://1.1.1.1/dns-query" },
      { "tag": "dns_direct", "address": "https://223.5.5.5/dns-query", "detour": "direct" }
    ],
    "rules": [
      { "rule_set": "geosite-cn", "server": "dns_direct" }
    ]
  },
  "inbounds": [
    {
      "type": "tun",
      "tag": "tun-in",
      "address": ["172.19.0.1/30"],
      "auto_route": true,
      "strict_route": true
    }
  ],
  "outbounds": [
    { "type": "selector", "tag": "proxy", "outbounds": ["auto", "node-a"] },
    { "type": "urltest", "tag": "auto", "outbounds": ["node-a"] },
    { "type": "direct", "tag": "direct" }
  ],
  "route": {
    "rule_set": [
      { "tag": "geosite-cn", "type": "remote", "format": "binary", "url": "https://example.invalid/geosite-cn.srs" }
    ],
    "rules": [
      { "rule_set": "geosite-cn", "outbound": "direct" }
    ],
    "final": "proxy"
  }
}
```

上面这段通用结构展示了 sing-box 运行的四个核心支柱。`dns` 模块通过 `detour` 参数明确规定国内查询走直连出口、境外查询走代理链路，配合二进制 `.srs` 规则集降低解析时的内存消耗；`inbounds` 定义了如何接收设备流量，常见配置是启用 `tun` 虚拟网卡结合 `auto_route` 接管全局数据包，或者开启 `mixed` 混合端口供桌面浏览器读取；`outbounds` 列出所有真实节点、`urltest` 自动测速组与 `selector` 手动切换组；最后的 `route` 模块则决定了流量按规则匹配的先后次序与兜底出口 `final`。

在实际使用时，如果你手头的老牌机场只提供 Clash YAML、Shadowrocket 或通用 Base64 链接，直接把链接填入官方 SFA 或 SFI 必然无法解析。面对这种情况，建议按以下三种合规路径处理。

### 核实机场后台是否已提供 sing-box 专用出口

越来越多技术更新及时的机场已经在用户仪表盘增加了 sing-box 格式的一键导入或订阅地址选项。使用官方客户端前，先登录购买品牌的管理后台确认导出格式，直接复制对应连接地址最为稳妥。

### 改用内置解析转换层的衍生客户端

如果机场暂时只提供 Clash 或通用分享链接，而你希望享受 sing-box 核心带来的流畅度与低功耗表现，可以选择 [Hiddify](/clients/hiddify/) 或 [Karing](/clients/karing/)。这两款客户端虽然底层同样以 sing-box 作为内核引擎，但在前端内置了多格式兼容解析器，可以自动把 Clash YAML 或节点合集转译为内核能够执行的标准 JSON 结构。在 Windows 与 macOS 桌面端，老牌多核心工具 [v2rayN](/clients/v2rayn/) 也同样支持在设置中将默认核心切换为 sing-box，省去手写配置的麻烦。

### 拒绝把私人订阅提交给未知在线转换站

部分网络帖子会指导用户把包含个人 Token 的订阅链接贴进第三方公共网页转换器来生成 sing-box 配置。公开转换服务在服务端会完整看到你的原始订阅 URL、节点主机列表以及流量认证密钥，存在明显的账号泄露风险。关于订阅链接保管的完整准则，请务必参考 [订阅链接安全使用说明](/guides/subscription-url/) 与 [流量消耗异常排查](/troubleshooting/abnormal-traffic/)。

## 安全下载校验与跨平台部署避坑

获取 sing-box 官方组件时，必须坚持从官方文档站点 `sing-box.sagernet.org` 索引的 GitHub 发布页或海外地区 App Store 官方应用页面下载。

对于通过命令行或 Linux、Windows 压缩包手动部署的用户，下载完成后应养成核对 SHA256 校验摘要的习惯，确保二进制内核程序在传输环节未被替换或损坏。

```bash
# Linux 或 macOS 终端核验 sing-box 压缩包 SHA256 值
sha256sum ./sing-box-linux-amd64.tar.gz
```

```powershell
# Windows PowerShell 核验 sing-box 压缩包 SHA256 值
Get-FileHash -Path ".\sing-box-windows-amd64.zip" -Algorithm SHA256
```

在平台差异方面，苹果 iOS 用户安装 SFI 需要使用海外地区 Apple ID 登录 App Store，千万不要为了省事登录网络售卖的共享账号，以免设备被远程锁定。而在 OpenWrt 软路由场景下，基于 sing-box 的 HomeProxy 高度依赖新版固件的 `nftables`（即 fw4）防火墙体系，安装前需确认路由器固件版本、CPU 架构与包管理器状态是否匹配，相关细节可结合 [OpenWrt 软路由组件指南](/clients/openwrt-clients/) 进行核对。

还需留意一点，sing-box 的版本迭代相对积极，早期配置文件中常用的部分旧字段（例如早期自带的独立 geosite 数据库写法）在新版本中逐步被更高效的 `.srs` 远程规则集取代。如果直接拿几年前的网上旧模板导入最新客户端，界面通常会给出字段弃用或解析失败提示，此时应当更新配置模板或直接重新拉取机场下发的最新版配置。

## 常见问题解答

### sing-box 和 Mihomo 有什么区别

两者都是当前最活跃的开源代理内核，均能稳定支持 VLESS Reality、Hysteria 2 与 TUIC 等现代协议。核心区别在于配置生态与前端搭配习惯，Mihomo 沿用 Clash YAML 格式，直接兼容绝大多数机场的默认订阅；sing-box 采用独立的原生 JSON 结构，在移动端续航控制、内存占用以及官方跨平台客户端整合度上表现突出。

### 什么是官方所说的 SFA、SFI 和 SFM

这三个简称分别对应 sing-box 官方团队维护的三大消费级平台应用，即 sing-box for Android（SFA）、sing-box for iOS（SFI）以及 sing-box for macOS（SFM）。官方应用界面偏向极简和工程化，适合机场本身直接提供 sing-box 格式订阅的用户。

### 机场只提供 Clash 订阅链接能直接放进官方 sing-box 客户端吗

不能直接加载。官方原生客户端只识别符合 sing-box JSON 规范的配置文件，直接填入 Clash YAML 订阅地址会提示解析失败。此时建议改用同为 sing-box 核心但内置多格式兼容层的 Hiddify 或 Karing，或者在桌面端使用支持核心切换的 v2rayN。

### 升级新版 sing-box 后旧配置文件报错怎么处理

由于 sing-box 迭代期间对部分旧版路由与 DNS 字段做过格式规范升级，多年前保存的本地手写 JSON 模板可能会在新版内核中触发参数失效或校验报错。遇到此类提示时，最稳妥的方法是重新从机场后台拉取最新生成的 sing-box 订阅配置，或者对照官方配置迁移说明将旧版数据库规则替换为 `.srs` 规则集格式。
