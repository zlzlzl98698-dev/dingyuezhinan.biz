---
title: "FullCone UDP 和 RestrictedCone 对游戏联机和语音的影响 | 订阅指南"
description: "解释 FullCone（全锥形 NAT）、RestrictedCone（受限锥形 NAT）与 Unknown UDP 状态的原理差异，结合光速云 Shadowsocks 与 VLESS 双协议实测差异，分析其对 Switch/PS5 游戏联机、Discord 语音及 QUIC 协议的实际影响。"
pubDate: 2026-11-25
updatedDate: 2026-11-25
category: "线路与节点"
tags: ["FullCone", "RestrictedCone", "UDP NAT", "游戏联机", "Discord 语音", "MiaoKo"]
pillar: "network"
primaryKeyword: "FullCone UDP RestrictedCone 游戏联机"
searchIntent: "informational"
entities: ["FullCone", "RestrictedCone", "UDP", "NAT", "光速云", "VLESS", "Shadowsocks"]
sources: ["src/data/benchmarks.json", "src/content/reviews/guangsuyun.md"]
dataStatus: "measured"
faq:
  - question: "用代理加速 Switch 或 PS5 联机游戏，为什么一定要找 FullCone UDP 节点？"
    answer: "主机 P2P 联机需要玩家之间直接建立 UDP 通信。FullCone（NAT1）允许任何外部队友或房间主机向映射出来的端口发送数据包，联机匹配成功率最高；如果落入 RestrictedCone 甚至对称型 NAT，就经常出现找不到房间、队友掉线或显示 NAT 类型 D 的警告。"
  - question: "MiaoKo 测速图里的 UDP 列显示 Unknown，是不是代表这个节点完全不能用？"
    answer: "日常刷网页、看 YouTube 4K、用 ChatGPT 等常规场景主要走 TCP 或常规单向请求，UDP 显示 Unknown 并不影响网页浏览和流媒体播放。但如果你要用这个节点打 P2P 联机游戏、开 Discord 语音频道或走 HTTP/3 QUIC 加速，就会面临无法打洞或语音断续的问题。"
  - question: "同一家机场为什么 Shadowsocks 节点测出 Unknown，换成 VLESS 节点就成了 FullCone？"
    answer: "UDP NAT 类型同时取决于客户端配置、代理协议的 UDP 转发能力以及落地服务器的内核转发策略。以光速云 2026 年 8 月 19 日实测为例，62 节点 Shadowsocks 组的核心节点未开启完整 UDP Cone 映射而显示 Unknown，而切换到 70 节点 VLESS 订阅组后，香港、新加坡和美国全线均测出了 FullCone。"
draft: false
---

在代理测速图与网络协议测试中，**FullCone（全锥形 NAT，常对应游戏主机里的 NAT Type A / NAT1）能够让任意外部主机通过已映射端口向你主动回传 UDP 数据包，是海外 P2P 游戏联机、主机大厅组队以及 Discord / WebRTC 语音通话最理想的状态**；而 **RestrictedCone（受限锥形 NAT，分为地址受限和端口受限）只允许你主动发过包的目标 IP 或特定端口回传数据**，在需要多方直连打洞的场景下更容易出现匹配超时、语音单通或掉线；至于测速表里标为 `Unknown` 的节点，通常意味着节点未开启 UDP 转发、被策略阻断或采用了无法识别的对称转发方式。

如果你平时只看网页和视频，UDP 状态好不好感知并不强烈；一旦涉及主机游戏联机、远程桌面串流或跨国实时语音会议，UDP NAT 类型往往直接决定能不能连进房间。关于测速图其余基础列的解读方式，可先配合 [怎么看懂 MiaoKo 测速图](/guides/how-to-read-miaoko-speedtest/) 与 [低延迟网络原理](/network/low-latency/) 一起查看。

## 四种 UDP NAT 映射机制对真实通信的影响

要弄清 FullCone 和 RestrictedCone 差在哪里，只需要看一条核心规则，节点服务器替你的设备在公网上分配了一个临时端口后，它到底放行谁发回来的数据包。

当电脑上的游戏客户端或者语音软件通过代理节点向协调服务器发起一次 UDP 请求后，节点会在出口处建立一条端口映射。在 **FullCone（全锥形）** 模式下，只要这个映射端口还处于活动状态，哪怕后来是游戏房间里另一位完全陌生的新队友（你的设备之前从未向他的 IP 发过任何消息）直接往这个端口发数据，代理节点都会毫不犹豫地把数据转回你的设备。主机游戏（如任天堂 Switch、PS5、Xbox）以及大量 P2P 语音房都依赖这一特性完成 NAT 打洞。

在 **RestrictedCone（受限锥形）** 模式下，代理节点会记住你刚才联系过的目标服务器 IP（或 IP 加端口）。如果另一位陌生队友的客户端试图往你的端口发送联机握手包，因为他的 IP 不在你之前的沟通名单里，节点防火墙就会把包直接丢弃。反应到实际游戏里，就是你能连上游戏大厅服务器看到好友列表，但一点加入别人开的房就卡在“正在连接玩家”然后超时失败，或者语音会议里能听到主持人的声音却和另一位成员互相听不见。

| UDP 类型 | 外部回包放行条件 | 主机 P2P 联机表现 | Discord / WebRTC 语音表现 | HTTP/3 (QUIC) 网页与视频加载 |
| :--- | :--- | :--- | :--- | :--- |
| `FullCone` | 任何外部 IP 和端口均可回传至映射端口 | 极佳，接近 NAT1 / Type A，匹配顺畅 | 极佳，P2P 语音与屏幕共享几乎零阻碍 | 完整支持，连接迁移流畅 |
| `RestrictedCone` | 仅放行此前主动访问过的目标 IP 或端口 | 一般，部分 P2P 房间无法直连，易降级转接 | 中等，通常依赖中继服务器转发而略增延迟 | 基本可用，多数服务由固定服务端回包 |
| `Symmetric`（对称型） | 对不同目标分配不同外网端口，限制极严 | 极差，常显示 Type D 或严格 NAT，很难匹配成功 | 易出现单向无声或频繁重连 | 可连接，但打洞与部分实时协议受阻 |
| `Unknown` / 阻断 | 节点未启用 UDP 转发或测试包全丢包 | 无法进行 UDP 联机，游戏直接断网或回退直连 | 语音完全连不上，一直卡在“RTC 连接中” | 强迫浏览器退回慢速 TCP 模式重连 |

## 实测证据 同一机场不同协议组的 UDP 类型分化

很多用户以为同一家机场的所有节点在 UDP 支持上是一样的，但把真实测速原图翻出来对照就会发现，协议形态和单台落地机的系统策略会带来截然不同的结果。

以本站 `benchmarks.json` 与 [光速云深度评测](/reviews/guangsuyun/) 收录的 `2026-08-19` 五张 MiaoKo 实测原图为例。在当天中午跑出的 **62 节点 Shadowsocks** 订阅图（`photo_2026-08-19_12-13-01.jpg`）里，从香港专线 01 至 20、日本 01 至 10、新加坡 01 至 10、美国 01 至 10 到台湾 01 至 05 和马来西亚 01 至 02，整整 57 个亚太与北美主力节点在 `UDP 类型` 这一栏全部显示为 `Unknown`，反倒是排在最后面的英国 01、德国 01、法国 01、土耳其 01 和泰国 01 这 5 个边缘节点显示了 `FullCone`。

然而同一天下午，在切换到同一家品牌的 **70 节点 VLESS 加 AnyTLS** 订阅图（`photo_2026-08-19_12-20-10.jpg`）后，整个亚太与北美主力池的 UDP 状态发生了根本逆转。香港 01 至 20 全员跑出 `FullCone`，新加坡 01 至 10 全员跑出 `FullCone`，美国 01 至 10 全员跑出 `FullCone`（连传输速度极慢的异常样本美国 02 在探测字段上也标为 FullCone），日本和台湾组绝大多数节点同样变成了 `FullCone`。但即便在这一组内部依然存在个别异类，比如 `日本 06`、`日本 10` 和 `台湾 09` 回落为 `Unknown`，而 `台湾 02` 刚好测出了 `RestrictedCone`。

这组对比充分说明两件事。第一，机场服务端是否在对应协议组（比如 VLESS 对比 Shadowsocks）里打开了 UDP 转发与 Cone 映射，直接决定了主力节点能不能打游戏和开语音。第二，同一地区编号下的节点未必共用同一台落地主机或同一套防火墙策略，遇到某一个编号（例如上面例子里的 `台湾 02`）显示 `RestrictedCone` 或 `Unknown` 时，往旁边切一个同区节点往往就能立刻变成 `FullCone`。

## 客户端里必须同步打通的两个设置

哪怕节点本身在测速脚本里已经亮起了绿色的 `FullCone`，如果你的本地客户端没有正确处理 UDP 转发，实际进游戏或者开 Discord 依然会失败。

1. **开启客户端与协议的 UDP 转发开关**。在 [Clash Verge Rev](/clients/clash-verge-rev/)、FlClash、v2rayN 或 Shadowrocket 中，检查当前配置文件里对应节点的 `udp` 参数是否为 `true`（部分较老的订阅转换模板或手动添加的节点如果漏写了 `udp: true`，客户端会默认把所有 UDP 包丢弃或强迫直连）。对于基于 [sing-box](/clients/sing-box/) 内核的客户端，同样要确认出站配置未禁用 UDP 通道。
2. **游戏主机和桌面语音工具务必开启 TUN 模式**。绝大部分联机游戏客户端、Nintendo Switch 共享代理以及 Discord 的语音通信引擎并不会读取操作系统的 HTTP 系统代理端口，如果只打开系统代理，游戏匹配走的其实是你的本地裸宽带，语音流量才会半吊子撞到代理规则上。通过启用 [TUN 模式](/guides/tun-mode/) 接管全系统三层 UDP 数据包，同时在路由规则里确保目标游戏服务商域名与联机 IP 段指向对应的 `FullCone` 节点，才能在主机和电脑端跑通完整联机链路。

## 给游戏与语音用户的实用选节点策略

首先，机场并不是专业游戏加速器，对于国内可直连的低延迟国服或亚服游戏（例如延迟敏感且丢包零容忍的竞技射击端游），依然建议在分流规则里直连或搭配专用网游加速器，把机场留给海外冷门服、主机下载更新、语音大厅或需要跨区组队的场景。

其次，如果确实要靠机场节点联机 Switch、PS5 或长挂 Discord 语音频道，不要只看节点延迟数字就拍板，务必参考测速图里的 `UDP 类型` 列优先挑选标明 `FullCone` 且支持现代协议（如 VLESS、Hysteria 2 或开启完整 Cone 的 Shadowsocks）的地区节点，并避开高丢包且经常波动的冷门路线。如果当前使用 Shadowsocks 订阅组一直无法打通语音，先核对机场是否另行提供了 VLESS 或新内核订阅分支，换组测试往往立竿见影。
