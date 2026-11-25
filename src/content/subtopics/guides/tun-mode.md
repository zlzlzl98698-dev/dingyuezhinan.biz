---
title: "TUN 模式开启指南：虚拟网卡接管终端与全系统流量原理 | 订阅指南"
description: "解释桌面代理软件 TUN 虚拟网卡模式与普通系统代理的本质区别，说明 Windows 服务模式安装、macOS/Linux 权限配置及常见耗电与防坑提醒。"
pubDate: 2026-11-24
updatedDate: 2026-11-25
category: "使用教程"
tags: ["TUN 模式", "系统代理", "虚拟网卡", "Clash Verge Rev", "v2rayN"]
pillar: "guides"
primaryKeyword: "TUN 模式"
searchIntent: "informational"
entities: ["TUN 模式", "Clash Verge Rev", "v2rayN", "FlClash", "Windows", "macOS", "Linux"]
sources: ["src/data/navigation.ts", "src/data/clients.json"]
dataStatus: "measured"
draft: false
faq:
  - question: "为什么我已经打开了系统代理，电脑上的终端命令行还是连不上 GitHub？"
    answer: "普通系统代理只是写入了浏览器的默认 HTTP/SOCKS 端口变量，大量命令行工具（如 git、curl、Docker）、桌面游戏客户端以及部分独立软件默认忽略系统代理配置。开启 TUN 模式后，软件在操作系统底层虚拟出一张网卡，从网卡层直接拦截所有软件流量并送入分流规则。"
  - question: "开启 TUN 模式是不是就等于变成了 Global 全局代理？"
    answer: "不是的。TUN 模式解决的是流量能不能被客户端接管到的问题，而流量被接管进来之后走直连还是走节点，依然完全由你选择的 Rule 规则模式或 Global 全局模式决定。"
  - question: "Windows 打开 TUN 模式提示安装 Service Mode 失败怎么处理？"
    answer: "TUN 创建虚拟网卡需要系统管理员级特权。如果以普通权限直接启动客户端或安装目录被杀毒软件拦截，就会安装服务失败。应右键使用管理员身份运行客户端安装服务模式，或者检查目录是否包含中文字符，具体排除方法见 TUN 模式异常排查。"
  - question: "开启 TUN 模式后，在命令行 ping 境外域名延迟只有 1 毫秒正常吗？"
    answer: "正常。开启 TUN 时绝大多数配置默认同时启用了 Fake-IP 解析，系统 ping 到的 198.18 网段其实是本机虚拟网卡地址，1 毫秒测出的是内存转发时间而非节点到海外服务器的真实延迟。"
---

当你的浏览器已经能够正常打开海外网页，但电脑终端里的 `git`、`curl`、`pip`、`npm` 或 Docker 等命令行工具、以及部分桌面游戏启动器和独立客户端依然报超时错误时，在客户端中开启 **TUN 模式** 就是最直接的标准解决方案。TUN 模式的实质是在操作系统网络层生成一张虚拟网卡并重写路由权重，从而把原本忽略普通系统代理的 TCP 与 UDP 数据包全部接管进代理内核。需要明确的是，TUN 模式控制的是“抓包接管范围”，与决定国内直连或海外转发的 [分流规则](/guides/routing-rules/) 属于两个独立维度，开启后只要依然保持在 Rule 规则模式下，国内软件照样走本地直连，不会变成全局代理。

## 系统代理与 TUN 虚拟网卡模式全方位对比

桌面端代理软件通常并存着“系统代理（System Proxy）”与“TUN 模式”两枚开关，彻底分清两者的接管深度与副作用，能帮助你按需开关而不踩坑。

| 对比维度 | 普通系统代理模式 | TUN 虚拟网卡模式 | 实际体验与配置影响 |
|---|---|---|---|
| 流量接管层级 | 应用层环境变量登记本地监听端口 | 操作系统网络层虚拟网卡（Wintun / utun / tun） | TUN 接管深度远高于系统代理，软件无法绕过 |
| 主流浏览器支持 | Chrome、Edge、Safari 等全面支持 | 全面支持，无需依赖浏览器独立配置 | 只用浏览器上网时开系统代理已经够轻快 |
| 终端命令与开发工具 | 大多忽略系统代理，必须手动配置环境变量 | 自动全面接管 `git`、`curl`、Docker、IDE 插件等 | 开发者与重度终端用户建议按需开启 TUN |
| UDP 流量与游戏联机 | 普通 HTTP 系统代理主要处理 TCP 请求 | 原生完整捕获 TCP 与 UDP 全部数据流 | 联机游戏、语音软件或 QUIC 传输需靠 TUN 接管 |
| 系统权限要求 | 无需管理员权限，普通用户即可运行 | 需要安装系统服务（Windows）或输入内核提权密码 | 权限不足或杀软拦截会直接导致 TUN 启动失败 |
| 耗电与路由冲突风险 | 极低耗电，基本不干扰内网或游戏加速器 | 略微增加唤醒功耗，且与企业 VPN、网游加速器互斥 | 使用内网专线 VPN 或网游加速器前务必先关 TUN |

这里再次强调高频误区，**TUN 模式和 Global 全局模式是两回事**。打个比方，系统代理和 TUN 模式决定的是“哪些软件发出的包裹允许进入分拣站（普通代理只收主动贴单的浏览器包裹，TUN 把所有软件的包裹全收进分拣站）”；而分拣站内部怎么派送，完全由 `Rule`（国内包裹直接放回本地宽带，海外包裹才送去代理节点）还是 `Global` 决定。因此日常打开 TUN 时，务必把模式开关维持在 `Rule` 状态。

## 标准的 Mihomo TUN 配置字段结构

现代桌面客户端如 [Clash Verge Rev](/clients/clash-verge-rev/)、[FlClash](/clients/flclash/)、[v2rayN](/clients/v2rayn/) 与 [Hiddify](/clients/hiddify/) 都已经把 TUN 做成了图形化一键开关。但如果你需要通过覆写配置解决部分系统回环或 DNS 抢占问题，了解底下对应的标准 YAML 字段会非常有帮助。以下是一段通用规范的 Mihomo `tun` 与配合参数示例。

```yaml
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16

tun:
  enable: true
  stack: system
  dns-hijack:
    - "any:53"
  auto-route: true
  auto-detect-interface: true
  strict-route: true
```

在这组参数中，`stack` 常见可选 `system`、`gvisor` 或 `mixed`，在 Windows 与 macOS 上 `mixed` 或 `system` 往往兼顾性能与稳定性；`dns-hijack` 负责劫持发往 53 端口的明文 DNS 请求送入内置解析模块防污染，相关细节可结合 [DNS 设置指南](/guides/dns-settings/) 理解；`auto-route` 与 `auto-detect-interface` 则让内核自动写入路由表并识别当前活跃的物理网卡，省去用户手动绑网卡的麻烦。

## Windows、macOS 与 Linux 开启实操与状态校验

三大桌面操作系统对虚拟网卡与底层路由表的管控强度各不相同，开启时的提权动作与验证方法也各有讲究。

### Windows 权限服务安装与校验

在 Windows 系统中创建 Wintun 虚拟网卡并调整系统路由表，必须拥有高权限系统服务支持。在 Clash Verge Rev 中首次开启前，需进入设置页面点击“服务模式（Service Mode）”右侧的安装管理按钮，按 UAC 系统弹窗授予管理员权限完成注册（只需安装一次）。当服务状态指示灯亮起后，再打开“TUN 模式”总开关。开启 TUN 之后，通常建议顺手关掉旁边的普通“系统代理”开关，避免部分应用反复读写双重配置产生端口冲突。如果服务安装受阻或开启后立刻断网，多半是被安全卫士拦截或安装路径含中文字符，具体排除方案请参考 [TUN 模式异常排查](/troubleshooting/tun-error/)。

### macOS 与 Linux 授权机制

在苹果 macOS 系统中，推荐先把客户端完整拖入 `/Applications`（应用程序）目录后再启动使用。首次拨动 TUN 开关时系统会弹出要求输入管理员开机密码的确认框，用于允许底层内核接管 `utun` 虚拟接口；切勿从临时解压目录直接运行，否则软件更新或重启后极易出现反复索要密码授权的问题。

在 Linux 桌面发行版下，开启 TUN 通常会通过 `pkexec` 弹窗请求当前用户的 sudo 密码，或者需要提前手动为 Mihomo 核心可执行文件赋予 `CAP_NET_ADMIN` 网络管理能力。各平台开启完成后，均可通过下面几条轻量命令核实虚拟网卡是否真正生效、以及命令行是否无需额外环境变量即可直连验证。

```bash
# Windows PowerShell 检查虚拟网卡适配器是否已生成
Get-NetAdapter | Where-Object { $_.InterfaceDescription -match "Wintun|Meta|Mihomo|sing-box" }

# macOS 终端查看已创建的 utun 虚拟网卡接口
ifconfig | grep -A 2 "^utun"

# Linux 终端查看核心权限及虚拟网卡状态
ip link show | grep -E "Meta|Mihomo|tun"

# 不设置 HTTP_PROXY 变量，直接验证终端 curl 能否通过 TUN 接管顺利访问海外测试接口
env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY curl -I -m 8 https://www.gstatic.com/generate_204
```

## 三类不建议长期常驻 TUN 的典型场景

虽然 TUN 模式在接管全系统流量上最为彻底，但在实际日常使用中并非所有场景都适合一直开着它。

1. **连接公司内网 VPN 或特定金融网银插件时**。许多企业远程办公专有客户端（例如部分 Cisco、Sangfor SSL VPN 客户端）以及带着防篡改检测的银行安全控件，本身也会强行接管路由表或校验真实物理网卡环境。代理软件的 TUN 模式和公司 VPN 同时运行几乎必然引发路由表死锁导致两边全断网，进入公司内网工作前请务必先关掉代理 TUN。
2. **同时使用专门的游戏加速器时**。市面上绝大多数网游加速器同样是依靠虚拟网卡驱动来捕获 UDP 游戏包。如果在开着网游加速器的同时开启代理软件 TUN 模式，两套虚拟驱动会在网卡层发生抢占冲突，导致加速失效甚至游戏掉线。联机打游戏时应关掉其中一方的网卡接管开关。
3. **笔记本外出脱离电源且只用浏览器时**。TUN 引擎需要持续拦截并拆解系统底层的所有并发连接与后台静默数据包，在老款轻薄本纯电池供电情况下，CPU 唤醒次数和电量消耗会比仅仅打开普通系统代理略高一些。如果外出移动办公只开网页查资料，关闭 TUN 只保留系统代理会让续航更持久；遇到网络彻底异常时，也可结合 [连接不上排查步骤](/troubleshooting/connection-failed/) 逐项关闭核对。

## 常见问题

### 为什么我已经打开了系统代理，电脑上的终端命令行还是连不上 GitHub？

普通系统代理只是写入了浏览器的默认 HTTP/SOCKS 端口变量，大量命令行工具（如 git、curl、Docker）、桌面游戏客户端以及部分独立软件默认忽略系统代理配置。开启 TUN 模式后，软件在操作系统底层虚拟出一张网卡，从网卡层直接拦截所有软件流量并送入分流规则。

### 开启 TUN 模式是不是就等于变成了 Global 全局代理？

不是的。TUN 模式解决的是流量能不能被客户端接管到的问题，而流量被接管进来之后走直连还是走节点，依然完全由你选择的 Rule 规则模式或 Global 全局模式决定。

### Windows 打开 TUN 模式提示安装 Service Mode 失败怎么处理？

TUN 创建虚拟网卡需要系统管理员级特权。如果以普通权限直接启动客户端或安装目录被杀毒软件拦截，就会安装服务失败。应右键使用管理员身份运行客户端安装服务模式，或者检查目录是否包含中文字符，具体排除方法见 TUN 模式异常排查。

### 开启 TUN 模式后，在命令行 ping 境外域名延迟只有 1 毫秒正常吗？

正常。开启 TUN 时绝大多数配置默认同时启用了 Fake-IP 解析，系统 ping 到的 198.18 网段其实是本机虚拟网卡地址，1 毫秒测出的是内存转发时间而非节点到海外服务器的真实延迟。
