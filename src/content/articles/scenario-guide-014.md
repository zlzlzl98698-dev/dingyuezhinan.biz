---
title: "macOS 终端 curl 与 git 为什么不走系统代理需要 TUN 模式 | 订阅指南"
description: "解释 macOS 终端里的 curl、git、brew 等命令行工具为何忽略系统代理设置，对比临时环境变量配置与 Clash Verge Rev / FlClash 开启 TUN 模式的优劣与 DNS 避坑。"
pubDate: 2026-11-25
updatedDate: 2026-11-25
category: "客户端配置"
tags: ["macOS", "TUN 模式", "终端代理", "curl", "git", "Clash Verge Rev"]
pillar: "clients"
primaryKeyword: "macOS 终端 curl git 不走系统代理 TUN 模式"
searchIntent: "informational"
entities: ["macOS", "curl", "git", "TUN 模式", "Clash Verge Rev", "FlClash", "utun"]
sources: ["src/data/clients.json", "src/content/subtopics/guides/tun-mode.md"]
dataStatus: "vendor"
faq:
  - question: "已经在 macOS 代理软件里打开了系统代理，为什么浏览器能上外网，终端 git clone 还是超时？"
    answer: "macOS 的系统代理开关修改的是系统网络偏好设置中的 HTTP 和 SOCKS 键值，只有调用苹果系统网络框架的应用才会主动读取它。终端里的 git、curl、npm 和 ssh 等工具遵循 POSIX 命令行规范，默认只读取终端环境变量或直接发起底层套接字请求，因此根本不会经过系统代理端口。"
  - question: "不想每次开 TUN 模式，只靠在 zsh 里配置 http_proxy 环境变量不行吗？"
    answer: "环境变量可以解决大部分 HTTP 和 HTTPS 请求的 curl、brew 或 pip 下载问题，但对基于 SSH 22 端口的 git 操作、ICMP ping 测试以及内部子进程丢弃环境变量的工具依然无效。TUN 模式在操作系统网络层创建虚拟网卡，能够无差别接管所有终端工具和端口。"
  - question: "macOS 开启 TUN 模式后，如何防止公司内网 git 仓库域名解析失败？"
    answer: "在客户端配置的 Fake-IP 跳过列表（fake-ip-filter）中加入公司内部域名后缀，并在 nameserver-policy 中将内网域名指向公司内网或路由器本地 DNS，同时确保私有 IP 网段走直连，就能兼顾外网代理与内网仓库访问。"
draft: false
---

macOS 用户打开代理客户端的“系统代理”后，浏览器能正常访问海外网页，但终端里的 `curl`、`git`、`brew` 等命令却依然连接超时，核心原因在于 macOS 系统代理只是一套写给图形界面应用的配置通知，并非操作系统网络层的强制流量拦截。绝大多数 UNIX 命令行工具出于跨平台设计并不会读取苹果系统设置的 HTTP 或 SOCKS 代理键值，只有开启基于虚拟网卡的 [TUN 模式](/guides/tun-mode/)，才能从操作系统内核网络栈层把所有终端进程发出的数据包统一收进代理隧道。

理解这层差异，能省去大量反复折腾终端配置文件的时间。如果你刚在 Mac 上配置代理工具，也可以结合 [macOS 客户端推荐专题](/clients/macos/) 一并了解各客户端的内核差异。

## 系统代理、环境变量与 TUN 模式的机制差异

要看清为什么浏览器和终端表现截然不同，需要把 macOS 上的网络请求分成三条路径来看。

第一条路径是“系统代理（System Proxy）”。当你在 [Clash Verge Rev](/clients/clash-verge-rev/) 或 [FlClash](/clients/flclash/) 里勾选系统代理时，客户端实际上调用了 macOS 的 `networksetup` 接口，把当前 Wi-Fi 或有线网口的代理地址设为 `127.0.0.1:7897`（端口号视具体客户端而定）。Safari、Chrome 等浏览器以及依赖苹果 `CFNetwork` 或 `URLSession` 框架的桌面应用会主动去查询这个地址并把流量送过去；但底层用 C 语言或 Go 语言写的终端工具根本不理会系统偏好设置里的这个开关，请求直接从本地物理网卡发出并撞墙超时。

第二条路径是“终端环境变量”。部分工具（如 `curl`、`wget`、`pip`、HTTPS 方式的 `git`）会检查终端当前的 `http_proxy`、`https_proxy` 和 `all_proxy` 变量。你在 `~/.zshrc` 里手动导出端口后，这些工具确实能走通，但遇到通过 SSH 22 端口执行的 `git clone git@github.com:...`、部分自动剥离环境变量的构建脚本（如某些 `sudo` 命令或容器内命令），以及使用纯 UDP 协议的 CLI 程序时，环境变量依然束手无策。

第三条路径是“TUN 虚拟网卡模式”。开启 TUN 模式后，代理内核会向 macOS 内核申请创建一个虚拟网络接口（通常命名为 `utun` 加数字），并自动更新系统路由表，将默认流量路由指向这块虚拟网卡。从此之后，终端里的任何程序只要向外发起 TCP、UDP 或 DNS 请求，数据包在离开电脑之前就会被虚拟网卡整包拦截并交由 Mihomo 或 sing-box 核心按规则分流，终端工具本身甚至感知不到代理的存在。

| 代理方式 | 生效范围 | 能否接管 `git` SSH 协议 | 是否需要手动配置脚本 | 常见短板 |
| :--- | :--- | :--- | :--- | :--- |
| 系统代理 | 浏览器与调用系统框架的桌面 App | 不能 | 不需要 | 终端工具几乎全部绕过 |
| Shell 环境变量 | 仅支持读取 `http_proxy` 的 CLI 工具 | 不能（需另配 SSH Config） | 需要修改 `~/.zshrc` | 新开无配置环境或部分脚本易失效 |
| TUN 模式（utun） | 系统全流量（含终端、Docker、CLI） | 可以（需注意 DNS 与端口规则） | 客户端一键开启 | 需要授权管理员服务权限，需处理内网 DNS |

## 在 macOS 上正确启用 TUN 模式的步骤

以目前维护活跃的 Clash Verge Rev 为例，macOS 启用虚拟网卡需要提前安装并激活权限服务组件，才能修改系统的 `utun` 设备与路由表。

第一步是安装服务模式（Service Mode）。打开 Clash Verge Rev 左侧“设置”页面，在“Clash 设置”或“系统设置”区域找到“服务模式”右侧的开关或安装图标，点击安装并输入 Mac 开机管理员密码授权后台守护进程运行。如果跳过这一步直接打开 TUN 开关，内核往往会因权限不足而启动失败，或者只运行在无权修改默认路由的受限状态。

第二步是核对 TUN 核心参数。点开“TUN 模式”旁边的设置齿轮，确认堆栈（Stack）选择 `Mixed` 或 `System`。在 macOS 上，`System` 堆栈性能开销较低，而 `Mixed` 兼顾兼容性与高并发下载表现。将“自动配置路由（Auto Route）”和“自动识别出口网卡（Auto Detect Interface）”保持开启；至于“严格路由（Strict Route）”，日常使用建议保持关闭，除非你明确需要彻底锁死所有非隧道连接，否则开启后极易干扰 Mac 上的 AirDrop、隔空投送和局域网共享。

第三步是回到主界面打开 TUN 模式开关，并确认上方模式停留在“规则（Rule）”。打开终端运行一条带详细输出参数的测试命令，例如 `curl -I https://www.google.com` 或 `curl -v https://api.github.com`，如果能顺利返回 `HTTP/2 200` 状态码，说明虚拟网卡已经接管了终端的 TCP 连接。若开启过程中弹出报错，可对照 [TUN 模式异常排查](/troubleshooting/tun-error/) 检查服务进程状态。

## 开启 TUN 后终端常见疑难与排查

即使虚拟网卡已经开启，macOS 终端开发者依然常碰到以下三类典型问题，按顺序排查即可快速定位。

### 现象一 `curl` 成功但 `git` 走 SSH 协议依然卡死

当你执行 `git clone git@github.com:...` 时，流量走的是 TCP 22 端口而不是 443 端口，且使用的是本地 `~/.ssh/` 密钥协商。如果机场服务商为了防滥用在服务器端屏蔽了 22 端口出站，或者订阅规则把特定端口漏掉了，哪怕开了 TUN 模式，SSH 依然会卡在连接超时。

解决办法有两个。最简单的是在 GitHub 的场景下改用 HTTPS 克隆地址，或者把端口映射到 GitHub 官方提供的 443 备用 SSH 端口（在 `~/.ssh/config` 中为 `github.com` 指定 `Hostname ssh.github.com` 与 `Port 443`）。这样请求就会像普通 HTTPS 流量一样顺利通过任何商业机场节点，同时保留 SSH 密钥免密推送的便利。

### 现象二 终端提示 SSL 证书异常或本地局域网地址不通

在公司的办公网络里使用终端拉取内网 GitLab 代码，或者访问本地启动的调试服务时，如果开了 `Fake-IP` 模式且没有做好排除配置，内网域名会被虚拟网卡映射成 `198.18.x.x` 的假地址，从而引发证书域名不匹配或连接被拒绝。

要从根源消除这类冲突，应当在客户端配置覆写中做两层隔离。首先在 `dns.fake-ip-filter` 中添加公司内网域名后缀以及 `*.local`、`*.lan`，确保终端解析内网域名时拿到的是真实的内网 IP 地址；其次在 `dns.nameserver-policy` 里指定公司内网后缀交由内网 DNS 服务器解析；最后确认 `tun.route-exclude-address` 列表中完整保留了 `192.168.0.0/16`、`10.0.0.0/8` 和 `172.16.0.0/12` 等私有网段，具体规则配置细节可查看 [DNS 设置指南](/guides/dns-settings/)。

### 现象三 以前在 `~/.zshrc` 写过固定代理变量引起冲突

很多用户在启用 TUN 模式之前，曾经为了临时救急在 `~/.zshrc` 或 `~/.bash_profile` 里写死了 `export https_proxy=http://127.0.0.1:7890` 这样的固定端口命令，甚至写进了 `git config --global http.proxy`。后来换了新客户端（端口变成了 `7897`）或者切到 TUN 模式后，只要开启终端，命令就会继续死磕已经失效的 `7890` 端口，导致报错 `Connection refused`。

检查方法是直接在终端输入 `env | grep -i proxy` 和 `git config --global --get http.proxy`。如果打印出旧端口号，请立刻打开配置文件删掉那些历史代理变量，再执行 `git config --global --unset http.proxy` 与 `git config --global --unset https.proxy` 清空全局绑定，并重启终端窗口，让请求完全交由 TUN 虚拟网卡接管。

## 不适合常驻 TUN 模式时的轻量替代方案

如果偶尔只需要在一台低权限办公 Mac 上临时用一次 `curl` 或 `brew upgrade`，或者当前运行的虚拟网卡与公司专用的商业 VPN 软件发生路由表抢占冲突，也可以暂时关闭 TUN 模式，回归更轻量的终端按需代理方式。

可以在 `~/.zshrc` 里定义一个简短的开关函数，例如 `proxy_on` 与 `proxy_off`，只在需要拉取海外代码包时在当前终端标签页临时注入 `http_proxy`、`https_proxy` 与 `ALL_PROXY` 变量指向客户端实际监听的混合端口，操作完毕后立刻清除环境变量。而在没有专用 VPN 冲突的个人主力开发机上，保持 [Clash Verge Rev](/clients/clash-verge-rev/) 或 [FlClash](/clients/flclash/) 的 TUN 模式常驻并配合准确的 [分流规则](/guides/routing-rules/)，依然是让终端全生态工具稳定运行最省心的方案。
