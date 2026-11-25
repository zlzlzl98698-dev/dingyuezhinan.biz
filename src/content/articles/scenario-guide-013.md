---
title: "Windows 开启代理后 Steam 与企业微信直连规则怎么写 | 订阅指南"
description: "说明 Windows 开启 Clash Verge Rev 或 v2rayN 后 Steam 游戏下载与企业微信走直连的分流规则写法，区分商店网页与 CDN 下载域名，避免误耗机场流量。"
pubDate: 2026-11-25
updatedDate: 2026-11-25
category: "客户端配置"
tags: ["Windows 代理", "Steam 直连", "企业微信", "分流规则", "Clash Verge Rev", "v2rayN"]
pillar: "clients"
primaryKeyword: "Windows 代理 Steam 企业微信直连规则"
searchIntent: "informational"
entities: ["Windows", "Steam", "企业微信", "Clash Verge Rev", "v2rayN", "Mihomo"]
sources: ["src/data/clients.json", "src/content/guides/guangsuyun-client-setup.md"]
dataStatus: "vendor"
faq:
  - question: "把 Steam 下载域名设为直连后，打不开 Steam 商店或社区页面怎么办？"
    answer: "Steam 商店网页、创意工坊和游戏下载服务器使用的是不同域名。正确的做法是只把下载 CDN 域名设为 DIRECT，而让 store.steampowered.com 和 steamcommunity.com 继续走代理规则组，这样既不会消耗机场流量下游戏，也能正常浏览商店与社区。"
  - question: "企业微信只配置了域名直连，为什么发大文件或视频会议还是卡顿？"
    answer: "企业微信的语音通话、屏幕共享和部分内网文件传输会使用动态 IP 或 P2P UDP 端口，纯域名规则无法全部覆盖。在 Windows 客户端中配合进程名规则放行 WXWork.exe，并开启局域网私有网段绕过，就能让所有通信稳定走本地宽带。"
  - question: "在 Clash Verge Rev 里写了直连规则，为什么流量统计里 Steam 还是在走节点？"
    answer: "常见原因有两个，第一是全局模式忘记切回规则模式，第二是新规则追加到了配置文件底部而没有放到顶部，被靠前的 MATCH 兜底规则或通用代理规则提前截胡。另外还要关闭已经建立的长连接，让 Steam 重新发起请求。"
draft: false
---

Windows 电脑开启代理客户端后，要让 Steam 游戏下载与企业微信办公流量走本地宽带直连，核心做法是在分流规则顶部加入针对下载 CDN 域名和办公进程名的 `DIRECT` 规则，并保留 `RULE-SET` 或规则模式作为运行基础。如果直接让整个 `steam.exe` 进程直连，往往会导致 Steam 商店打折页面、好友聊天或创意工坊无法加载；反过来如果不做分流隔离，动辄上百 GB 的游戏更新包就会把机场月度流量配额瞬间刷光，企业微信会议也会因为跨国绕行而出现语音延迟与掉线。

要写出既稳定又不互相冲突的规则，先要弄清软件在 Windows 下的流量走向。浏览器或只读系统代理的应用通常遵循 HTTP 端口规则，而游戏下载器、企业微信音视频模块在开启 [TUN 模式](/guides/tun-mode/) 后会被虚拟网卡全面接管，此时规则匹配顺序就成为决定流量去向的唯一依据。关于桌面端软件选型与基础环境搭建，可先对照 [Windows 客户端专题](/clients/windows/)。

## Steam 商店浏览与游戏下载分离的写法

Steam 客户端在后台同时连接三类不同的服务器，分别是身份验证与商店页面、社区与创意工坊，以及专门分发游戏安装包的 CDN 节点。在绝大多数国内宽带环境下，Steam 官方已经部署了大量的国内下载节点，直接走本地宽带往往能跑满百兆或千兆下行速率，根本不需要经过代理节点中转。

因此，不建议一刀切地写 `PROCESS-NAME,steam.exe,DIRECT`，更合理的方案是按域名拆开控制。下面列出核心域名与对应的处理策略，你可以根据自己平时是否需要访问社区自由组合。

| 目标域名后缀 | 业务功能说明 | 推荐策略 | 原因说明 |
| :--- | :--- | :--- | :--- |
| `steamcontent.com` | 游戏本体、补丁包与着色器下载 | `DIRECT` | 防止几十 GB 安装包耗尽机场月流量 |
| `steamserver.net` | 联机大厅、下载调度与内容分发 | `DIRECT` | 保障国内下载调度节点正常就近分配 |
| `dl.steam.clngaa.com` | Steam 客户端更新与特定 CDN 资源 | `DIRECT` | 避免客户端启动自检更新卡死 |
| `steampowered.com` | Steam 商店首页、账号登录与购物车 | 代理或按需切换 | 提升商店图片加载速度与购物车稳定性 |
| `steamcommunity.com` | 个人主页、市场、评测与创意工坊 | 代理 | 国内直连常出现页面超时或加载失败 |
| `steamstatic.com` | 商店封面图、预告片与静态样式资源 | 代理或直连 | 体积较小，走代理可让商店海报秒开 |

如果你平时在电脑上购买的是有 [节点倍率](/network/multiplier/) 差异的机场，一旦 100GB 游戏更新包误入 2 倍率节点，后台面板就会直接扣掉 200GB 额度。把 `steamcontent.com` 与 `steamserver.net` 明确写进直连清单顶部，是保护流量钱包最有效的一道防线。

## 企业微信在代理与 TUN 模式下的直连配置

企业微信在办公室网络和居家远程办公环境中，既要连腾讯公网服务器收发消息，也经常通过内网穿透或公司 VPN 访问财务、审批等内部网页系统。一旦开启全局代理或 TUN 模式但缺少直连条款，就会出现微信二维码刷不出来、传输大附件反复中断、内部 OA 页面提示无法连接或视频会议声音断续等问题。

针对企业微信的规则建议采用“域名后缀加进程名双保险”写法。在域名层面，覆盖腾讯企业办公常见域名，包括 `work.weixin.qq.com`、`qyapi.weixin.qq.com`、`weixin.qq.com`、`qq.com` 以及公司自建的内部域名后缀。在进程层面，Windows 版企业微信的主程序名通常为 `WXWork.exe`，部分版本还会拉起 `WXWorkWeb.exe` 用于加载内嵌浏览器页面。在 Clash Verge Rev 等支持进程匹配的内核中，把这两个进程名直接指定为 `DIRECT`，就能一次性免去大量子域名的遗漏烦恼。

需要特别留意的是，企业微信内的审批链接如果指向公司内网域名（例如 `oa.company.local`），在开启 TUN 模式且启用了 `Fake-IP` 时，客户端可能会把内网域名解析成 `198.18.x.x` 段的虚拟地址。此时光写 `DIRECT` 规则还不够，必须在客户端 DNS 配置的 `fake-ip-filter` 跳过列表中补上公司内部域名后缀与 `*.weixin.qq.com`，具体域名解析排错思路可查看 [DNS 设置指南](/guides/dns-settings/) 与 [DNS 错误排查](/troubleshooting/dns-error/)。

## Clash Verge Rev 与 Mihomo 内核实操配置

目前在 Windows 上主流推荐使用基于 Mihomo 内核的 [Clash Verge Rev](/clients/clash-verge-rev/) 或 FlClash，它们都支持通过“全局扩展覆写脚本”或“配置覆写”在不破坏机场原订阅更新的前提下，把自定义直连规则永久插到所有规则的最前面。

操作步骤非常直接。打开 Clash Verge Rev 的“订阅”页面，右键你正在使用的机场配置文件，选择“编辑规则”或进入“全局扩展覆写（Merge / Script）”界面，在规则列表最顶部插入以下内容。如果使用文本覆写格式，重点在于把新增规则挂载到 `prepend-rules` 字段下，确保优先级高于机场下发的 `MATCH` 或兜底规则。

```yaml
prepend-rules:
  # Steam 下载 CDN 强制直连，保留商店与社区走策略组
  - DOMAIN-SUFFIX,steamcontent.com,DIRECT
  - DOMAIN-SUFFIX,steamserver.net,DIRECT
  - DOMAIN-SUFFIX,dl.steam.clngaa.com,DIRECT
  - DOMAIN-KEYWORD,steamcdn,DIRECT
  # 企业微信域名与 Windows 进程强制直连
  - DOMAIN-SUFFIX,work.weixin.qq.com,DIRECT
  - DOMAIN-SUFFIX,qyapi.weixin.qq.com,DIRECT
  - PROCESS-NAME,WXWork.exe,DIRECT
  - PROCESS-NAME,WXWorkWeb.exe,DIRECT
```

保存覆写配置后，切换到 Clash Verge Rev 的“连接”标签页，点击右上角按钮关闭现有的 Steam 和企业微信旧连接，或者直接重启 Steam 下载任务与企业微信客户端。随后在连接列表搜索 `steamcontent` 或 `WXWork`，只要右侧链路列显示为 `DIRECT`，就说明规则已经准确生效。如果你想继续精简其他国产软件或网盘规则，可进一步阅读 [分流规则指南](/guides/routing-rules/)。

## v2rayN 路由规则与进程放行做法

如果你在 Windows 上使用的是 [v2rayN](/clients/v2rayn/)，配置逻辑同样遵循自上而下的匹配顺序，只是界面入口有所不同。

打开 v2rayN 主界面，进入“设置”菜单里的“路由设置”，建议先启用一套包含绕过大陆地址的基础规则集作为底座，再在自定义规则面板中新建一条名为“办公与游戏下载直连”的规则条目，并将其排序上移至列表第一位。在 `outboundTag`（出站标签）中选择 `direct`，然后在 `domain` 栏填入 `domain:steamcontent.com`、`domain:steamserver.net`、`domain:work.weixin.qq.com` 和 `domain:qyapi.weixin.qq.com`。如果已经开启了 v2rayN 的 TUN 模式，还可以在路由规则的 `process` 字段中填入 `WXWork.exe` 与 `WXWorkWeb.exe`，注意在 Windows 下填写进程名时通常保留 `.exe` 后缀并保持大小写准确。

修改完成后点击确定保存，在主界面底部状态栏切换一次路由模式以触发内核重载，随后观察 v2rayN 底部日志窗口。看到相关域名后面输出 `-> direct` 而不再指向代理出站名称，即代表配置成功。

## 规则生效后的四项自检核对

规则写好并保存后，很多用户仍会在实际使用中遇到流量偶尔绕路的现象，通常源于下面四个容易忽略的细节。

1. 核对客户端运行模式是否为“规则（Rule）”。无论规则写得多精细，只要主界面还停留在“全局（Global）”，所有非直连的策略判断都会被绕过，流量依然全部涌向选定节点。
2. 清理 Steam 下载地区缓存。如果之前开着全局代理打开过 Steam，Steam 可能把下载地区自动切换成了香港、日本或新加坡 CDN。进入 Steam 设置里的“下载”选项卡，手动将下载地区改回离你物理位置最近的国内城市（如上海、北京或广州），再清理一次下载缓存，本地宽带速度才会恢复满速。
3. 排查 IPv6 分流遗漏。部分企业内部系统或新版下载节点支持 IPv6 接入，若机场订阅规则中未写明 `IP-CIDR6` 本地回环与内网直连，建议在规则里同步保留局域网私有段直连规则，避免多网卡环境出现路由冲突。
4. 定期关注机场流量异常扣减。如果某个月在未看高清视频的情况下流量掉得很快，先到客户端“连接”记录里排查是不是新增了未命中的游戏平台下载域名（例如 Epic、Battle.net 或微软商店），及时补充进 `prepend-rules` 即可堵住漏洞，更多排查办法可对照 [流量消耗异常分析](/troubleshooting/abnormal-traffic/)。
