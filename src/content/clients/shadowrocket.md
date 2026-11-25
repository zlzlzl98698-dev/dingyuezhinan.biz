---
title: "Shadowrocket（小火箭）美区下载付费说明与使用教程 | 订阅指南"
description: "详细说明 iOS 代理软件 Shadowrocket 的美区 App Store 付费机制、共享账号防锁机警告、首次 VPN 弹窗授权、节点测速以及四种全局路由与分流规则模式。"
pubDate: 2026-11-24
updatedDate: 2026-11-25
category: "客户端软件指南"
tags: ["Shadowrocket", "小火箭", "iOS 客户端", "美区 App Store", "代理软件"]
pillar: "clients"
primaryKeyword: "Shadowrocket"
searchIntent: "navigational"
entities: ["Shadowrocket", "App Store", "iOS", "VLESS", "Hysteria 2"]
sources: ["src/data/clients.json", "第三方代理客户端.txt"]
dataStatus: "measured"
clientSlug: "shadowrocket"
draft: false
faq:
  - question: "Shadowrocket 为什么在中国区 App Store 找不到？"
    answer: "受应用商店地区合规政策影响，Shadowrocket 已从中国区 App Store 下架。iPhone 和 iPad 用户需要切换至美区、港区或日区等海外 App Store 才能正常购买下载。"
  - question: "Shadowrocket 是免费的吗？多少钱？"
    answer: "不是免费软件。它在美国 App Store 显示为一次性付费应用，大约 2.99 美元左右，实际售价与上架情况以用户所属 App Store 地区页面显示为准，购买后可在同一 Apple ID 下长期更新。"
  - question: "可以直接买淘宝或闲鱼上几块钱的共享 Apple ID 下载吗？"
    answer: "强烈不建议。来源不明的共享账号极易在登录 iCloud 时被恶意远程锁机勒索，且共享账户触发风控封号后无法继续接收版本更新。最稳妥的办法是自己注册美区 Apple ID 并通过正规礼品卡充值购买。"
  - question: "Shadowrocket 的全局路由选配置还是代理更合适？"
    answer: "日常使用强烈建议选择配置模式，软件会根据规则列表自动让国内网站直连、海外请求走节点。只有在排查分流规则问题或临时测试某条节点能否接管全部应用时，才短暂切换为代理模式。"
---

Shadowrocket（俗称小火箭）是 iPhone 与 iPad 平台上普及度最高、长期保持稳定更新的规则代理客户端。它采用专有规则引擎，原生兼容 VLESS、Trojan、VMess、Shadowsocks 与 Hysteria 2 等几乎所有主流机场协议，同时支持订阅托管、分流策略、流量统计以及本地请求抓取查看。如果你手里的机场支持第三方订阅，Shadowrocket 几乎是苹果移动端最省心的长期选择。

## 美区 App Store 付费机制与地区上架说明

准备安装 Shadowrocket 之前，必须先明确它的授权与下载规则。

首先，Shadowrocket 属于海外商店的付费买断制软件，在美国 App Store 中标示为一次性付费应用（通常约 2.99 美元，购买后在同一 Apple ID 下的多台苹果设备均可下载并免费接收后续版本更新），实际售价与税费以你所登录的海外 App Store 地区商店实时显示为准。同期知名的同类苹果客户端如 Stash、Quantumult X（圈 X）也同样在美区 App Store 显示为付费应用，Surge 5 则带有应用内购买功能。

其次，中国区 App Store 未上架 Shadowrocket，在国区商店搜到的同名、近似蓝白火箭图标或带有“高速加速”字样的应用全部是山寨仿冒软件，不仅无法导入机场订阅，还往往诱导订阅高额内购会员费。下载前务必确认自己登录的是合法有效的海外地区 App Store 账号，官方唯一验证入口见页面信息卡中的 App Store 链接。

## 切勿踩坑的共享账号与锁机风险

由于注册外区账号并充值外币支付卡有一定门槛，许多新手会选择在网上购买几块钱的所谓“已购小火箭共享 Apple ID”。这种做法存在极高的设备安全隐患。

最大的风险在于部分黑产卖家会诱导你在手机“设置”顶部的 iCloud 账户区域登录共享账号。一旦你在系统设置里登上了他人可控的 Apple ID 并开启了查找功能，对方就能瞬间通过远程锁定让整台 iPhone 变成砖头，随后进行高额敲诈。即使卖家强调只在 App Store 商店内登录，一旦该共享账号因为多人异地登录触发苹果风控而被封禁，你手机里的 Shadowrocket 也会随之失去后续更新权限，遇到协议升级或 iOS 大版本兼容问题时只能干等。

安全获取的唯一稳妥路径，是自己独立注册一个归属美国或其他支持地区的 Apple ID，保持双重认证绑定自己的手机号，再通过官方正规渠道购买礼品卡充值完成一次性购买。如果暂时不方便完成外区付费充值，也可以先评估免费上架外区商店的 [Karing](/clients/karing/) 与 [Hiddify](/clients/hiddify/)，或者查阅 [iOS 客户端全览](/clients/ios/) 了解免费替代方案。

## 首次开启 VPN 配置弹窗与订阅导入步骤

成功安装打开 Shadowrocket 之后，建议按以下顺序完成初次初始化配置。

### 1. 导入与自动更新订阅链接

大部分支持第三方客户端的机场（如 [光速云](/reviews/guangsuyun/)、[星岛梦](/reviews/xingdaomeng/)、[唯兔云](/reviews/weitu/)）都会在网页后台提供“一键导入 Shadowrocket”按钮，或者提供标准订阅 URL。在 Shadowrocket 首页点击右上角加号，类型选择 Subscribe，把 [订阅链接地址](/guides/subscription-url/) 粘贴到 URL 一栏并填好备注名称，保存后软件会自动拉取所有地区节点。建议接着进入底部“设置”菜单里的“订阅”选项，打开“打开时更新”和“后台自动更新”，这样机场更换服务器 IP 后本地节点列表也能及时同步。

### 2. 首次开启的 iOS VPN 权限弹窗

导入节点后点击首页最上方的连通开关，首次使用时 iOS 系统会强制弹出提示窗口，询问是否允许 Shadowrocket 添加 VPN 配置（英文系统显示为 Would Like to Add VPN Configurations）。这是苹果系统管理所有网络代理应用时的标准安全授权，点击“允许”并使用 Face ID、触控 ID 或锁屏密码确认后，iOS 会跳转到或留在开关状态，此时屏幕右上角状态栏出现 VPN 标识即代表通道创建成功。

### 3. 节点测速与延迟判断技巧

拉取完一长串地区节点后，不要直接盲选排在第一位的节点。点击首页下方的“连通性测试”，软件会依次对各节点发起测试并返回毫秒级数值。需要特别注意，绿色数字越低说明当前网络到该节点的握手延迟越短，但测速超时（显示超时或灰色）的节点可能代表当前线路维护或本地运营商存在临时阻断，日常优先选取延迟低且负载标注较轻的香港、日本、台湾或新加坡节点。测速方法若想进一步了解节点真实带宽，可对照本地实际网页与视频加载速度来判断。

## 常见全局路由模式与分流规则配置

Shadowrocket 首页的“全局路由”是很多新手最容易选错的地方，它包含配置、代理、直连和场景四个常用选项。

1. **配置模式（日常推荐）**。选择该模式时，客户端会根据内置默认规则或配置文件中的规则列表自动分流，让国内银行、电商、视频与微信直连，只把海外域名和特定服务交给节点转发，兼顾速度与流量节省。
2. **代理模式（全局代理）**。所有网络请求都会强制经过所选节点服务器，虽然适合临时排查某条规则是否漏掉或者测试单条节点对特定应用的连通性，但长期开着会导致国内 App 打开变慢，同时白白消耗机场流量配额。
3. **直连模式**。所有流量都不经过代理节点，仅保留本地代理接管或用于快速排查是不是机场节点本身导致断网。
4. **场景模式**。支持按当前所连 Wi-Fi 名称或蜂窝移动网络自动切换路由策略，例如在家连上软路由 Wi-Fi 时自动切换为直连，出门切回 4G/5G 蜂窝网络时自动恢复规则代理，非常省电省心。

如果你希望理解“配置”模式下规则是如何生效的，可以在 Shadowrocket 底部的“配置”栏查看当前使用的 `.conf` 文件。一套典型的分流规则通常包含以下几类核心语句，更多细节可参考 [分流规则配置基础](/guides/routing-rules/)。

```ini
# Shadowrocket 配置模式常用规则片段示例（仅供理解规则匹配顺序）
[General]
bypass-system = true
skip-proxy = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, localhost, *.local

[Rule]
# 指定海外 AI 与流媒体域名走代理策略组
DOMAIN-SUFFIX,openai.com,PROXY
DOMAIN-SUFFIX,chatgpt.com,PROXY
DOMAIN-SUFFIX,youtube.com,PROXY

# 国内常见域名与局域网 IP 走直连（DIRECT）
DOMAIN-SUFFIX,cn,DIRECT
GEOIP,CN,DIRECT

# 兜底策略，未命中上方规则的流量默认走代理或按需调整
FINAL,PROXY
```

如果日常使用中发现原本正常的 YouTube 出现地区异常或加载国内广告，或者 ChatGPT 网页端无法登录却只有 App 可用，大多是因为当前节点 IP 归属或规则分流未命中对应节点。此时可以参考 [YouTube 送中现象解读](/troubleshooting/youtube-cn-redirect-explained/) 与 [ChatGPT 仅 APP 解锁现象](/troubleshooting/chatgpt-only-app-hk-explained/) 切换对应的日本、新加坡或美国节点，并检查“配置”中的规则文件是否需要更新或恢复默认远程配置。

## 常见问题

### Shadowrocket 为什么在中国区 App Store 找不到？

受应用商店地区合规政策影响，Shadowrocket 已从中国区 App Store 下架。iPhone 和 iPad 用户需要切换至美区、港区或日区等海外 App Store 才能正常购买下载。

### Shadowrocket 是免费的吗？多少钱？

不是免费软件。它在美国 App Store 显示为一次性付费应用，大约 2.99 美元左右，实际售价与上架情况以用户所属 App Store 地区页面显示为准，购买后可在同一 Apple ID 下长期更新。

### 可以直接买淘宝或闲鱼上几块钱的共享 Apple ID 下载吗？

强烈不建议。来源不明的共享账号极易在登录 iCloud 时被恶意远程锁机勒索，且共享账户触发风控封号后无法继续接收版本更新。最稳妥的办法是自己注册美区 Apple ID 并通过正规礼品卡充值购买。

### Shadowrocket 的全局路由选配置还是代理更合适？

日常使用强烈建议选择配置模式，软件会根据规则列表自动让国内网站直连、海外请求走节点。只有在排查分流规则问题或临时测试某条节点能否接管全部应用时，才短暂切换为代理模式。
