---
title: "FlClash 下载与跨平台 Mihomo 极简配置指南 | 订阅指南"
description: "介绍 FlClash 基于 Mihomo 内核的 Flutter 跨平台体验，提供 Windows、macOS、Linux 与 Android 安全校验、TUN 配置要点及常见问题解答。"
pubDate: 2026-11-24
updatedDate: 2026-11-25
category: "客户端软件指南"
tags: ["FlClash", "Mihomo", "Android 客户端", "桌面客户端", "跨平台"]
pillar: "clients"
primaryKeyword: "FlClash"
searchIntent: "navigational"
entities: ["FlClash", "Mihomo", "Clash Verge Rev", "macOS", "Android"]
sources: ["src/data/clients.json", "第三方代理客户端.txt"]
dataStatus: "measured"
clientSlug: "flclash"
draft: false
faq:
  - question: "FlClash 和 Clash Verge Rev 都用 Mihomo 内核，怎么选？"
    answer: "两者底层内核能力几乎一致，主要差异在界面框架与覆盖平台。Clash Verge Rev 在桌面端的脚本覆写与精细调控功能更丰富；FlClash 采用 Flutter 构建，桌面与 Android 端交互逻辑完全统一，界面更加简洁轻量。"
  - question: "FlClash 可以在 iPhone 上安装吗？"
    answer: "不能。根据项目公开平台列表，FlClash 目前覆盖 Windows、macOS、Linux 与 Android 四个操作系统，iOS 设备需要选用 Shadowrocket、Hiddify 或 Karing。"
  - question: "macOS 安装 FlClash 要注意什么架构问题？"
    answer: "搭载 Apple Silicon 芯片（M 系列）的 Mac 需要下载 arm64 版本，老款 Intel 芯片需要下载 x64 或 amd64 版本。选错架构会导致程序无法打开或被迫走低效转译。"
  - question: "FlClash 开启后浏览器能上网，为什么终端命令行还是连不上？"
    answer: "桌面端默认开关通常只启动普通系统代理，命令行工具和部分桌面软件会忽略该设置。需要在 FlClash 的设置或仪表盘中开启虚拟网卡（TUN）模式，从网络层统一接管整机流量。"
---

FlClash 是一款基于 Flutter 框架与 [Mihomo](/clients/mihomo/) 内核打造的跨平台图形化代理客户端，目前已覆盖 Windows、macOS、Linux 与 Android 四大常用操作系统。对于同时使用安卓手机和个人电脑、希望两端界面与操作逻辑保持高度一致的用户来说，FlClash 提供了比混用多款不同软件更顺手的使用体验。

## 跨平台定位与协议兼容矩阵

早年跨设备用户经常面临一个割裂体验，安卓手机上要学一套 Clash Meta 的操作逻辑，回到电脑上又要重新适应桌面端复杂的侧边栏布局。FlClash 采用响应式卡片界面设计，将仪表盘、订阅配置、代理策略组与实时连接状态整合进统一视图，无论在手机竖屏还是桌面宽屏下都能快速上手。根据本站客户端数据库档案，FlClash 的核心属性与协议支持范围如下。

| 评估维度 | FlClash 官方及实测资料 | 使用注意事项 |
| --- | --- | --- |
| 支持平台 | Windows、macOS、Linux、Android | 暂不支持 iOS 苹果移动设备 |
| 底层内核 | Mihomo | 完整兼容标准 Clash YAML 订阅 |
| 协议兼容 | Shadowsocks、VMess、Trojan、VLESS Reality、Hysteria 2、TUIC、AnyTLS | 支持现代主流抗封锁传输协议 |
| 授权与渠道 | 免费开源 | 托管于 GitHub 官方仓库公开发布 |
| 维护状态 | 活跃维护 | 建议定期从官方仓库跟进稳定版本 |

在同样基于 Mihomo 的主流客户端横向比较中，桌面端用户往往会在 FlClash 与 [Clash Verge Rev](/clients/clash-verge-rev/) 之间二选一。如果日常偏向极简开箱即用、追求电脑与安卓平板手机体验统一，FlClash 非常合适；如果习惯在桌面端编写复杂的 JavaScript 覆写脚本或深度定制界面托盘细节，Clash Verge Rev 则更具优势。而在纯安卓设备上，FlClash 与 [Clash Meta for Android](/clients/clash-meta/) 共享相同的底层内核，均可替代早已停更的原版 Clash for Android。

## 官方渠道获取、架构匹配与安全校验

获取 FlClash 唯一可信的公开渠道是 GitHub 上的 `chen08209/FlClash` 仓库 Releases 页面。切勿通过搜索引擎广告位、陌生导航站或群聊转发的网盘压缩包下载安装程序，以免遭遇捆绑恶意代码的假冒客户端。

不同操作系统的安装包命名有明确规则，下载前务必核对设备硬件架构。

### macOS 芯片架构区分

苹果电脑安装时必须先点击左上角菜单查看本机处理器信息。搭载 M1 至 M4 等 Apple Silicon 芯片的设备应选择带有 `arm64` 标识的镜像包；老款基于 Intel 处理器的 Mac 则应选择 `x64` 或 `amd64` 版本。错将 arm64 包安装到 Intel 机型会直接无法运行，而在 M 系列芯片上运行 x64 版本则需要依赖 Rosetta 转译，容易增加后台内存与电量消耗。

### Windows 与 Linux 安装格式

Windows 用户通常直接挑选安装版 EXE 程序，建议安装到不含中文字符的常规目录中，避免后续开启虚拟网卡权限时发生路径解析异常。Linux 环境按发行版偏好挑选 DEB 安装包或 AppImage 便携文件，运行 AppImage 前需赋予文件可执行权限。

### Android 安装包防假包核验

安卓端需选择 `.apk` 后缀安装包，近五年主流手机均匹配 `arm64-v8a` 版本，不确定硬件规格时也可以选择整合包。对安全性要求较高的用户，可以在电脑下载后用以下命令核算 SHA256 哈希值，确认与发布页校验文本一致后再安装。更多安卓端安全排查要点可查阅 [Android 客户端下载避坑指南](/clients/android/)。

```powershell
# Windows PowerShell 计算安装包 SHA256 摘要
Get-FileHash -Path ".\FlClash-windows-amd64-setup.exe" -Algorithm SHA256
```

```bash
# macOS 或 Linux 终端计算安装包 SHA256 摘要
shasum -a 256 ./FlClash-macos-arm64.dmg
```

## 底层配置结构与双模式流量接管

FlClash 导入订阅后，底层由 Mihomo 内核接管全部流量调度，因此机场下发的标准 Clash YAML 策略组、远程规则集与加密 DNS 参数都会原样生效。下面展示一份通用的 Mihomo 核心 YAML 关键配置段，帮助理解日常开关背后的运行机制。

```yaml
mixed-port: 7890
mode: rule
log-level: warning

tun:
  enable: true
  stack: system
  auto-route: true
  auto-detect-interface: true

dns:
  enable: true
  enhanced-mode: fake-ip
  nameserver:
    - https://223.5.5.5/dns-query
  fallback:
    - https://1.1.1.1/dns-query

proxy-groups:
  - name: "节点选择"
    type: select
    proxies:
      - "自动测速"
      - "香港专线"
  - name: "自动测速"
    type: url-test
    url: "https://www.gstatic.com/generate_204"
    interval: 300
    proxies:
      - "香港专线"
```

从结构中可以看到，日常使用最需要关注的开关有两处。第一处是全局工作模式 `mode`，保持 `rule`（规则模式）可以让国内常用站点与局域网服务直接连接，海外请求按规则进入 `节点选择` 策略组，既节省机场流量也不影响本地网速。第二处是桌面端的系统代理与 `tun` 虚拟网卡开关区别。在 Windows 和 macOS 上，默认开启对应系统代理，只接管浏览器等遵守系统代理设置的程序；当你需要让命令行终端、开发工具或桌面端应用也走分流规则时，则应打开虚拟网卡选项。关于两种模式的权限差异与排查方法，推荐参考 [TUN 模式开启指南](/guides/tun-mode/)。

在 Android 手机端，开启连接后系统会弹出创建 VPN 连接的确认弹窗，这是安卓操作系统统一截获应用网络请求的常规接口，授予权限后依然由内核按规则分流，并不会把国内软件全部转发到境外。

## 机场兼容范围与日常维护避坑

使用 FlClash 的前提是所购机场支持导出通用 Clash 订阅链接。根据本站数据库档案，如 [光速云](/reviews/guangsuyun/)、星岛梦、唯兔云、一翻云与可信云等提供第三方订阅或双模式的品牌都能直接导入；而像飞猫云、隐形人或 Firefly 等仅提供自有专属软件登录的品牌则无法导出订阅地址，购前区分方法详见 [专属客户端与第三方客户端对比](/clients/proprietary-vs-third-party/)。

在日常维护上，建议于订阅配置属性中开启合理周期的自动更新（例如每天同步一次），以便及时获取机场补充的备用入口 IP 与新线路。执行节点测速时，不要仅凭非高峰时段的单次低延迟结果就固定使用某个节点，建议结合晚高峰实际网页加载情况判断，测速指标的具体含义可参考 [如何看懂 MiaoKo 测速图](/guides/how-to-read-miaoko-speedtest/)。此外，在手机端使用时同样记得关闭系统针对 FlClash 的激进省电后台限制，以免锁屏断线。

## 常见问题解答

### FlClash 和 Clash Verge Rev 都用 Mihomo 内核，怎么选

两者在协议解析与代理性能上几乎没有代差。如果你只在 Windows 或 macOS 上使用，且有定制复杂覆写脚本或托盘菜单的偏好，Clash Verge Rev 功能更饱满；如果你同时拥有安卓手机和平板，希望电脑与移动端的界面和配置体验保持一致，选择 FlClash 会更便捷。

### FlClash 可以在 iPhone 上安装吗

不能。FlClash 目前只面向 Windows、macOS、Linux 与 Android 四个平台发布安装文件，并没有上线 iOS 版本。苹果手机与 iPad 用户应当从海外区 App Store 获取 Shadowrocket、Karing 或 Hiddify 作为替代。

### macOS 安装 FlClash 要注意什么架构问题

Apple Silicon 处理器（M1 至 M4 等系列）需要下载 `arm64` 构建包，老款 Intel 处理器则必须下载 `x64` 或 `amd64` 构建包。安装前通过系统关于本机核对芯片型号，可以有效避免程序打开报错或后台转译带来的额外耗电。

### FlClash 开启后浏览器能上网，为什么终端命令行还是连不上

因为默认启用的系统代理只对支持读取系统端口的浏览器与部分软件生效，Git、Docker、Python 包管理器等命令行工具默认直接向物理网卡发起请求。此时只需要在 FlClash 控制面板中额外开启虚拟网卡（TUN）模式并授予对应系统权限，就能实现全系统软件统一分流。
