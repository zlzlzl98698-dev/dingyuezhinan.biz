---
title: "Clash Verge 原版停更说明与迁移 Clash Verge Rev 指南 | 订阅指南"
description: "解释原版 Clash Verge 仓库归档现状，提供演进对比、伪造中文官网防骗与 SHA256 校验流程，以及从旧版客户端迁移至 Clash Verge Rev 的四步实操。"
pubDate: 2026-11-24
updatedDate: 2026-11-25
category: "客户端软件指南"
tags: ["Clash Verge", "Clash Verge Rev", "迁移指南", "Clash for Windows", "安全警告"]
pillar: "clients"
primaryKeyword: "Clash Verge"
searchIntent: "informational"
entities: ["Clash Verge", "Clash Verge Rev", "Clash for Windows", "Mihomo"]
sources: ["src/data/clients.json", "第三方代理客户端.txt"]
dataStatus: "historical"
clientSlug: "clash-verge"
draft: false
faq:
  - question: "老版 Clash Verge 还能正常连接机场吗？"
    answer: "如果机场仍提供传统的 Shadowsocks 或普通 Trojan 节点，旧版软件短期内可能还能连上，但内置内核已经不再更新。遇到 VLESS Reality 或 AnyTLS 等新协议节点就会直接报错，因此建议尽快迁移到 Clash Verge Rev。"
  - question: "我以前用的是 Clash for Windows，能直接覆盖安装升级到 Clash Verge Rev 吗？"
    answer: "两者是不同开发者架构的独立软件，不能覆盖安装升级。建议先在旧软件中导出订阅链接，手动关闭系统代理与 TUN 模式后彻底卸载旧版，再全新安装 Clash Verge Rev 重新导入订阅。"
  - question: "如何识别网上搜到的虚假 Clash 官网？"
    answer: "所有声称自己是 Clash 中文官网、Clash 官方下载中心、带搜索引擎推广广告标记的独立域名网站均属于非官方站点。开源项目主要托管在 GitHub，没有面向商业推广的中文官网。"
  - question: "卸载旧版 Clash 后为什么浏览器反而打不开任何网页了？"
    answer: "这是迁移过程中最常见的端口残留故障。卸载旧客户端前如果没有先手动关闭系统代理开关，系统网络设置里会继续指向已关闭的本地代理端口，导致所有网页请求失败。只需去系统代理设置里关闭代理服务器开关即可恢复。"
---

如果你在查阅旧教程时看到了 Clash Verge 这个名称，需要第一时间了解清楚项目现状。原版 Clash Verge 的 GitHub 代码仓库已经归档停止维护，当前桌面端生态中持续迭代的活跃接续版本是 [Clash Verge Rev](/clients/clash-verge-rev/)。无论是第一次在电脑上装机的新手，还是准备从早已停更的 Clash for Windows 切换出来的老用户，现在都应当直接选用 Clash Verge Rev，不要再四处寻找已经停止维护的历史版本。

## 原版演进脉络与桌面端接替对比

早年的桌面端代理市场主要由 Clash for Windows 占据主流。2023 年底原版 Clash 核心与 Clash for Windows 相继停止更新并下架仓库后，早期采用 Tauri 框架开发的跨平台开源项目 Clash Verge 曾短暂接过桌面端主力位置。随着原仓库进入只读归档状态，社区开发者基于原有代码基座创建分支并持续修复内核兼容与系统权限问题，形成了如今集成最新 [Mihomo](/clients/mihomo/) 内核的 Clash Verge Rev。

保留本词条页面的目的，正是帮助顺着早期博客文章或视频教程检索到 Clash Verge 的用户梳理清版本关系，避免在过时分支上浪费排障时间，更避免因为寻找安装包而误入高仿钓鱼网站。以下将历史版本与现行主力客户端的核心规格汇总对比。

| 客户端名称 | 维护与仓库状态 | 默认底层核心 | 现代协议支持（VLESS Reality / AnyTLS / Hysteria 2） | 现行选型建议 |
| --- | --- | --- | --- | --- |
| Clash for Windows | 已停更删库 | 早期原版 Clash 核心 | 不支持现代新协议 | 立即停用并迁移 |
| Clash Verge（原版） | 原仓库已归档 | 早期 Clash.Meta 分支 | 部分老版本缺少新协议兼容 | 仅供历史参考，建议迁移 |
| Clash Verge Rev | 活跃维护 | 最新 Mihomo 内核 | 完整支持 | 桌面端优先主力选择 |
| FlClash | 活跃维护 | 最新 Mihomo 内核 | 完整支持 | 适合追求极简与手机桌面统一的用户 |

## 警惕搜索引擎广告里的伪造中文官网

由于原版软件删库与归档造成了明显的搜索流量真空，大量恶意分发者购买了搜索引擎推广关键词。当用户在浏览器中检索 Clash 下载、Clash Verge 中文官网或 Clash for Windows 官网时，排在前列且带有推广或广告标识的独立域名站点，绝大多数都是高度仿冒的恶意钓鱼页面。

这些仿冒下载站常见的危害集中在三个方面。

1. 在所谓官方绿色汉化安装包内捆绑木马远控程序、后台挖矿进程或数字货币钱包剪贴板劫持脚本。
2. 暗中修改客户端初始化配置或注入恶意分流规则，窃取用户的机场订阅 URL 凭证甚至拦截敏感网页会话。
3. 通过弹框提示诱导用户付费购买本来完全免费开源的客户端软件会员。

所有可信的开源代理客户端从未开设商业化的中文官方下载网站。桌面端唯一正规的获取入口是 GitHub 官方代码仓库的 Releases 页面，例如 Clash Verge Rev 的发布仓库 `clash-verge-rev/clash-verge-rev`。下载安装文件后，建议核对官方页面附带的校验值，在本地执行一次 SHA256 计算来确认文件完整可信。

```powershell
# Windows PowerShell 核对桌面安装包 SHA256 哈希值
Get-FileHash -Path ".\Clash.Verge_x64-setup.exe" -Algorithm SHA256
```

```bash
# macOS 或 Linux 终端核对桌面安装包 SHA256 哈希值
shasum -a 256 ./Clash.Verge.dmg
```

## 从旧版客户端平滑迁移的四步流程

如果电脑里目前还安装着几年前的 Clash for Windows 或已归档的老版 Clash Verge，请不要直接覆盖安装，按照以下四个步骤顺序执行迁移，可以彻底避免端口冲突与断网故障。

### 第一步 导出原始订阅地址与自定义规则

打开旧版客户端的配置管理面板，找到正在使用的机场订阅，复制并保存好完整的订阅链接。如果以前自己手写过覆写脚本或局部域名分流规则，也一并复制备份到纯文本文件中，以便迁移后对照调整。

### 第二步 手动关闭系统代理与虚拟网卡再退出

这是整个迁移过程最容易被忽略的关键一步。在退出和卸载旧软件之前，必须先在旧版软件界面中手动关闭 System Proxy（系统代理）和 TUN Mode（虚拟网卡模式）两个开关，随后从系统托盘右键完全退出主程序与后台服务。如果未关开关就直接强制卸载，Windows 的代理设置或 macOS 网络高级设置中仍会保留指向本地回环地址的无效代理记录，导致卸载完毕后电脑所有浏览器瞬间全网断连。卸载旧软件后再重启一次电脑是最稳妥的做法。

### 第三步 下载并全新安装 Clash Verge Rev

访问官方 GitHub 发布页下载对应系统架构的安装文件。Windows 电脑通常选择 x64 安装包；macOS 需要先核对处理器芯片，Apple Silicon 系列下载 `aarch64` 或 `arm64` 镜像，Intel 老款 Mac 下载 `x64` 镜像；Linux 则根据发行版挑选 DEB、RPM 或 AppImage 包。装好后先不要急着开启旧版服务，直接以全新配置启动新客户端即可。

### 第四步 导入订阅并核对新内核运行参数

启动 Clash Verge Rev 后进入订阅标签页粘贴地址拉取配置。如果你打算使用虚拟网卡接管命令行终端流量，可以在设置中按指引安装一次服务模式，操作细节详见 [TUN 模式开启指南](/guides/tun-mode/)。下面这段标准 Mihomo 核心字段示例展示了新客户端正常运行依赖的几项核心参数，迁移后遇到老旧配置文件不兼容时可以重点比对这些字段。

```yaml
mixed-port: 7897
allow-lan: false
mode: rule

dns:
  enable: true
  enhanced-mode: fake-ip
  nameserver:
    - https://223.5.5.5/dns-query
  fallback:
    - https://1.1.1.1/dns-query

tun:
  enable: false
  stack: system
  auto-route: true
```

## 迁移后常见兼容踩坑与排障路径

完成迁移后，部分用户可能会遇到两类常见报错。第一类是粘贴订阅链接后提示拉取失败或下载超时，这往往与本地残留代理未清理干净、或运营商临时阻断机场订阅域名有关，可以按照 [订阅失败排查指南](/troubleshooting/subscription-failed/) 逐项排查本地代理环境变量与网络链路。

第二类是导入成功后节点测速依然超时或无法切换，常见原因是老旧软件时期手写保留的自定义 YAML 覆写片段包含了新内核已废弃的字段格式，或者未将系统本地时间与互联网时间同步，导致现代 TLS 及 Reality 协议握手被服务器拒绝。遇到这类问题时，建议先新建一个纯原生订阅测试连通性，并结合 [客户端兼容性排查](/troubleshooting/client-compatibility/) 与 [TUN 模式异常排查](/troubleshooting/tun-error/) 定位具体环节。如果日常只需在桌面快速配置并保持手机端界面一致，也可以顺带评估 [FlClash](/clients/flclash/) 作为并行备选方案。

## 常见问题解答

### 老版 Clash Verge 还能正常连接机场吗

如果机场后端依然保留了传统的 Shadowsocks 或常规 Trojan 线路，老版程序短期内可能仍能勉强连接，但由于底层核心长期失去安全更新与协议迭代，遇到 VLESS Reality、Hysteria 2 或 AnyTLS 等现代节点就会全面报错，尽快迁移到 Clash Verge Rev 才是最稳妥的选择。

### 我以前用的是 Clash for Windows，能直接覆盖安装升级到 Clash Verge Rev 吗

不能覆盖安装。两款软件出自不同开发者，底层工程框架、配置存放目录与本地服务模式注册方式都不相同。正确顺序是先保存订阅链接、关闭旧软件的系统代理与虚拟网卡开关、卸载旧程序并清理环境，最后全新安装 Clash Verge Rev。

### 如何识别网上搜到的虚假 Clash 官网

所有冠以中文官网、官方高速下载站名称，且在搜索引擎结果页带有广告或推广标识的独立网站都是高风险仿冒站。开源桌面客户端只通过 GitHub 官方仓库 Releases 页面分发安装包，并且下载后应当主动核验文件哈希值。

### 卸载旧版 Clash 后为什么浏览器反而打不开任何网页了

因为在卸载旧客户端前忘记关闭系统代理开关，操作系统依然试图把网页流量发往已经被销毁的本地代理端口。打开 Windows 的网络代理设置或 macOS 网络设置中的代理选项，手动关闭使用代理服务器开关并保存，网络就会立刻恢复正常。
