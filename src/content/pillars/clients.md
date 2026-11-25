---
title: "代理客户端软件与兼容矩阵总览 | 订阅指南"
description: "梳理 12 款主流代理核心与图形客户端的适用平台、安全下载渠道、生态演进及专属客户端与第三方工具取舍。"
pubDate: 2026-11-24
updatedDate: 2026-11-24
category: "一级专题总览"
tags: ["代理客户端", "Clash Verge Rev", "v2rayN", "Shadowrocket", "Mihomo", "sing-box"]
pillar: "clients"
primaryKeyword: "代理客户端软件"
searchIntent: "informational"
entities: ["Clash Verge Rev", "v2rayN", "FlClash", "Hiddify", "Karing", "v2rayNG", "Shadowrocket", "Mihomo", "sing-box", "Clash Meta for Android", "OpenClash", "Nikki"]
sources: ["src/data/clients.json", "src/data/client-compatibility.json", "src/data/brands.json"]
dataStatus: "measured"
faq:
  - question: "网上搜到的 Clash 中文官网安全吗，能直接下载安装包吗？"
    answer: "非常危险。原版 Clash 与 Clash for Windows 早已归档停更，搜索引擎广告位排在前面的各种所谓中文官网绝大多数是仿冒站点，甚至被植入了窃取剪贴板与系统凭证的恶意程序。桌面端请直接前往 GitHub 官方开源仓库 Releases 页面获取 Clash Verge Rev 或 v2rayN。"
  - question: "买了机场套餐后，为什么找不到订阅链接导入 Clash 或小火箭？"
    answer: "部分品牌走的是专属客户端封闭路线，例如飞猫云、隐形人、Firefly、SOGO云、全球云、灵猫网络与闪跃等，官方仅提供下载登录即用的自有应用，不开放第三方订阅地址。购买前务必在本站品牌详情里核对客户端模式。"
  - question: "OpenWrt 软路由装代理插件前最容易忽略哪个版本问题？"
    answer: "最容易忽略固件版本、防火墙架构与包管理器差异。比如新兴的 Nikki 插件明确要求 OpenWrt 24.10 及以上版本，老固件强行安装会直接报错失效，安装前要先确认设备 CPU 架构与防火墙版本是 fw3 还是 fw4。"
relatedSlugs: ["guides", "troubleshooting", "brands", "vpn"]
order: 5
draft: false
---

挑好机场订阅只是第一步，真正每天和你打交道的是装在电脑、手机和路由器上的客户端软件。客户端选不对，哪怕买了最贵的专线，也可能因为协议不兼容连不上，或者因为从钓鱼网站下了假包而赔上整台电脑的安全。

目前主流开源代理生态主要围绕三大底层核心运转，分别是兼容 Clash 规则体系的 [Mihomo](/clients/mihomo/)（原 Clash.Meta）、注重跨平台统一的 [sing-box](/clients/sing-box/)，以及经典多协议引擎 Xray。在这三个核心之上，衍生出了桌面端的 Clash Verge Rev、v2rayN、FlClash，移动端的 v2rayNG、Shadowrocket、Karing、Hiddify，以及路由器上的 OpenClash 与 PassWall2。

## 概念边界，内核、图形客户端与机场专属端

很多新手分不清“Clash”“Mihomo”和“机场自带 App”之间的关系，结果在配置时频频报错。把它们拆成三层来看就清晰多了。

第一层是底层代理内核，只负责加密传输、端口监听和规则匹配，没有图形界面，代表就是 Mihomo、sing-box 与 Xray-core。第二层是图形化前端客户端，它们把内核打包起来，加上订阅管理、测速面板、开机自启和 TUN 虚拟网卡开关。比如 [Clash Verge Rev](/clients/clash-verge-rev/) 是对已经归档的原版 [Clash Verge](/clients/clash-verge/) 的活跃接续；[v2rayN](/clients/v2rayn/) 则同时支持切换 Xray、sing-box 与 Mihomo 三个核心。

第三层是部分服务商自己封装的专属客户端。在全站 31 家品牌中，有 7 家明确仅提供专属客户端且不发第三方订阅链接，另外 11 家采用“自研客户端加第三方订阅”双轨制，还有 4 家主打通用第三方订阅。专属端的好处是输入账号密码就能直接用，省去复制订阅 URL 和更新规则库的步骤；代价是你无法把多个品牌的服务聚合在一个软件里，也无法接入软路由统一分流。

## 四条硬核选择依据与安全防踩坑清单

安装和使用代理客户端前，务必逐项核对以下四个条件。

### 第一步核验官方下载渠道，远离搜索引擎仿冒广告

开源代理软件几乎都托管在 GitHub Releases 或官方应用商店。Android 用户装 [v2rayNG](/clients/v2rayng/) 或 [FlClash](/clients/flclash/) 应以 GitHub 官方发布页为准，尤其警惕应用商店里的非官方搬运包，此前社区就曾多次警示第三方工具 NekoBox 不要去 Google Play 下载非官方维护版本，以免遇到过期或夹带广告的仿冒包。iOS 用户获取 [Shadowrocket](/clients/shadowrocket/) 时，必须用海外地区 Apple ID 在官方 App Store 一次性购买，切勿登录陌生人分享的所谓“免费共享账号”，避免触发设备锁机。

### 第二步核对系统平台与芯片架构

不同操作系统对安装包架构要求非常严格。在 [macOS 客户端](/clients/macos/) 上下载 Clash Verge Rev、FlClash 或 v2rayN 时，一定要先看清本机是 Intel 处理器（选 `x64`）还是 Apple Silicon M 系列芯片（选 `arm64`），装错架构不仅效率大打折扣，部分内置内核还会无法拉起。在 [Linux 客户端](/clients/linux/) 下，优先匹配发行版对应的 `.deb`、`.rpm` 或通用 `AppImage` 格式；在 [OpenWrt 客户端](/clients/openwrt/) 环境下，更要核清固件版本与包格式（`opkg` 还是新版 `apk`），像 Nikki 插件明确要求 OpenWrt 24.10 及以上系统。

### 第三步匹配协议与订阅格式

近两年机场主流协议逐渐向 VLESS Reality、Hysteria 2 与 AnyTLS 迁移，例如光速云在 2026-08-19 测试集里就包含了 VLESS 加 AnyTLS 节点，一翻云同时提供 Hysteria 2、VLESS-Reality 与 Shadowsocks。如果你还在用多年前停止更新的老客户端，大概率会在导入链接后出现“不支持的协议”或节点全红超时。选活跃维护的 Mihomo 或 sing-box 体系客户端，能直接省掉九成协议兼容性麻烦。此外，[v2rayNG](/clients/v2rayng/) 原生不直接解析复杂的 Clash YAML 策略组，导入时需向机场获取通用或 V2Ray 格式链接，或使用机场配套的订阅转换参数。

### 第四步权衡专属端便捷性与第三方自由度

如果你只想在单台手机或电脑上装一个能点开即用的工具，选 [Hiddify](/clients/hiddify/)、[Karing](/clients/karing/) 或服务商自带客户端最省心；如果你有 NAS、软路由、Switch 主机需要透明代理，或者手头同时备了两家机场防止单家波动，就一定要买支持第三方订阅的品牌并搭配 Clash Verge Rev 或 OpenClash。更细致的利弊权衡可以看 [专属客户端与第三方客户端对比](/clients/proprietary-vs-third-party/)。

在多端混合环境下，还有一个容易忽略的细节是订阅托管格式与内核配置语法的对齐。传统的 Clash YAML 配置文件依靠 `proxies` 与 `proxy-groups` 组织分流逻辑，兼容 Clash Verge Rev、FlClash、Clash Meta for Android 以及软路由 OpenClash。而新兴的 sing-box 生态原生采用 JSON 格式，官方客户端 SFA（Android）、SFI（iOS）与 SFM（macOS）虽运行轻量高效，但很多中小机场后台暂未原生下发 sing-box JSON 链接，往往需要依赖 Karing 或 Hiddify 内置的兼容层读取通用链接，或者使用机场端提供的带参订阅地址。清楚手头客户端能吞哪种格式，导入时才不会反复报错。

## 主流开源客户端与核心对比表

下表依据全站客户端知识库整理，帮助你在不同系统下迅速选出维护状态活跃、协议覆盖全的软件。

| 软件名称 | 归属类型 | 支持平台 | 底层核心 | 获取方式与费用 | 选型与安全提示 |
| --- | --- | --- | --- | --- | --- |
| [Clash Verge Rev](/clients/clash-verge-rev/) | 桌面管理端 | Windows / macOS / Linux | Mihomo | GitHub 免费开源 | 替代原版 Clash Verge 的当前主力，支持 TUN 模式 |
| [v2rayN](/clients/v2rayn/) | 多核心桌面端 | Windows / macOS / Linux | Xray / sing-box / Mihomo | GitHub 免费开源 | 多协议全能老牌工具，下载时建议核对压缩包校验值 |
| [FlClash](/clients/flclash/) | 跨平台客户端 | Win / macOS / Linux / Android | Mihomo | GitHub 免费开源 | Flutter 统一界面，桌面与安卓操作一致 |
| [Hiddify](/clients/hiddify/) | 多协议客户端 | 全桌面 + Android + iOS | sing-box | GitHub / 商店 免费开源 | 兼容 Clash 与通用链接，支持自动选优，适合新手 |
| [Karing](/clients/karing/) | 新手向客户端 | 全桌面 + Android + iOS | sing-box | GitHub / 外区 App Store | 简化多订阅合并与规则分流，iOS 端获取门槛低 |
| [v2rayNG](/clients/v2rayng/) | 安卓轻量端 | Android | Xray | GitHub 免费开源 | 内存占用极低，不支持直接导入复杂 Clash YAML |
| [Shadowrocket](/clients/shadowrocket/) | iOS 规则端 | iOS / iPadOS | 专有规则引擎 | 美区等外区 App Store 付费 | 苹果生态普及度最高，严禁使用来源不明破解共享账号 |
| [OpenWrt 代理组件](/clients/openwrt-clients/) | 路由器插件 | OpenWrt | Mihomo / Xray / sing-box | GitHub 开源插件 | OpenClash/PassWall2/Nikki/HomeProxy 各有固件版本要求 |

## 合规说明与按平台快速排查路径

所有代理客户端的下载、校验与配置说明均面向个人网络技术学习、科研资料查询与跨国企业合规组网参考。使用任何软件连接外部网络时，必须严格遵守所在地法律法规及目标应用商店、开源项目和网络服务商的服务条款。

还没确定哪款软件适合你手中的设备，可以按操作系统直接跳转对应的平台指南，包括 [Windows 客户端](/clients/windows/)、[macOS 客户端](/clients/macos/)、[Android 客户端](/clients/android/)、[iOS 客户端](/clients/ios/)、[Linux 客户端](/clients/linux/) 与 [OpenWrt 客户端](/clients/openwrt/)。装好软件后如果遇到订阅拉取报错或端口冲突，直接去 [使用教程](/guides/) 与 [故障排查](/troubleshooting/) 对照解决。
