---
title: "FlClash 在 macOS Apple Silicon 芯片上的安装包选择说明 | 订阅指南"
description: "说明 MacBook M1 至 M4 等 Apple Silicon 芯片安装 FlClash 时如何区分 arm64、aarch64 与 amd64/x64 镜像文件，解决首次打开损坏提示及权限授权问题。"
pubDate: 2026-11-25
updatedDate: 2026-11-25
category: "客户端配置"
tags: ["FlClash", "macOS", "Apple Silicon", "arm64", "安装指南"]
pillar: "clients"
primaryKeyword: "FlClash 在 macOS Apple Silicon 芯片上的安装包选择说明"
searchIntent: "informational"
entities: ["FlClash", "macOS", "Apple Silicon", "arm64", "Mihomo", "Rosetta 2"]
sources: ["src/data/clients.json", "第三方代理客户端.txt"]
dataStatus: "vendor"
draft: false
faq:
  - question: "M1、M2、M3 和 M4 芯片的 MacBook 安装 FlClash 应该选哪个文件？"
    answer: "搭载上述 M 系列 Apple Silicon 芯片的苹果电脑都属于 ARM 架构，在 FlClash 的 GitHub Releases 页面下载时，应当选择文件名包含 arm64 或 aarch64 且以 .dmg 结尾的安装镜像，避免误选 amd64 或 x64 版本。"
  - question: "如果不小心装了 Intel 版（x64 / amd64）的 FlClash 会怎么样？"
    answer: "系统要么提示需要安装 Rosetta 2 转译环境才能运行，要么内置的 Mihomo 代理核心在创建虚拟网卡时性能下降甚至报错。最稳妥的做法是卸载后重新换回原生 arm64 安装包，获得最低内存占用与最佳续航表现。"
  - question: "下载完 FlClash 后提示“已损坏，无法打开”或“无法验证开发者”怎么办？"
    answer: "这是 macOS 对非 App Store 开源应用触发的门禁隔离机制，并非文件真的损坏。先将应用拖入应用程序文件夹，然后在系统设置的隐私与安全性页面点击仍要打开，或者在终端使用 xattr 清除隔离属性即可。"
---

FlClash 在搭载 M1、M2、M3、M4 等 Apple Silicon 芯片的 macOS 电脑上安装时，必须选择文件名中带有 `arm64`（或 `aarch64`）标识的 `.dmg` 镜像安装包，切勿下载对应老款 Intel 处理器的 `amd64` 或 `x64` 版本。选对原生架构包不仅能绕开 Rosetta 2 指令转译带来的额外电量消耗与后台发热，还能确保 FlClash 内置的 Mihomo 代理核心在开启系统代理和 TUN 虚拟网卡时获得最高网络吞吐效率。

作为一款基于 Flutter 框架与 Mihomo 内核开发的轻量级开源客户端，FlClash 在 macOS 桌面端和移动端保持了高度一致的界面逻辑，适合希望简化桌面规则配置的用户。但由于 GitHub 发布页同时面向多个操作系统与处理器平台放出十几个打包文件，很多新手 Mac 用户很容易下错架构包或者卡在苹果系统的首次启动安全拦截上。想要全面了解客户端基础特点与支持平台，可先查阅 [FlClash 客户端档案](/clients/flclash/) 与 [macOS 客户端选型指南](/clients/macos/)。

## 第一步 核对 Mac 处理器架构与发布包命名规则

在打开下载页面前，用十秒钟先确认自己手头这台 Mac 的真实芯片型号，避免凭印象猜错架构。点击屏幕左上角的苹果菜单图标，打开“关于本机”，查看“芯片”或“处理器”一栏显示的文字。只要名称里写着 `Apple M1`、`Apple M2`、`Apple M3`、`Apple M4` 及其衍生型号（如 Pro、Max、Ultra），这台机器就确定属于 Apple Silicon 阵营，对应 ARM64 指令集；只有明确写着 `Intel Core` 字样的老款苹果电脑，才需要下载传统 Intel 架构包。

前往 FlClash 在 GitHub 上的官方项目 `chen08209/FlClash` 的 Releases 页面后，展开最新的正式发行版资源列表（Assets），可以看到多个不同后缀的文件。下表整理了 macOS 用户在面对这些文件名时的选择依据。

| 文件名关键词特征 | 对应硬件与系统环境 | Apple Silicon 用户选择建议 |
| :--- | :--- | :--- |
| `macos-arm64.dmg` 或 `aarch64.dmg` | M1/M2/M3/M4 系列 Apple Silicon 芯片 | 首选下载，原生硬件架构运行最省电且无转译损耗 |
| `macos-amd64.dmg` 或 `macos-x64.dmg` | 老款 Intel 处理器 Mac 电脑 | 请勿下载，依赖 Rosetta 转译会增加功耗且容易内核异常 |
| `macos-universal.dmg` | 同时包含两种架构的通用胖二进制包 | 仅在官方提供且未拆分单独包时可选，文件体积通常更大 |
| `windows` / `linux` / `.apk` 字样 | Windows、Linux 桌面或安卓手机端 | 其他操作系统专属安装包，macOS 系统无法运行 |

需要特别提醒的是，不要通过搜索引擎广告或来历不明的国内网盘合集搜索“FlClash Mac 中文版”。开源社区软件经常被第三方打包站点注入恶意修改文件或推广劫持脚本，务必坚持从项目官方 GitHub 仓库下载原始 `.dmg` 镜像并比对发布说明中的校验值。更多安全安装渠道规范可参阅 [客户端安全下载教程](/guides/client-install/)。

## 第二步 正确完成 DMG 镜像拖拽与首次启动授权

下载完正确的 `arm64` 安装镜像后，不少 macOS 新用户习惯直接双击打开 `.dmg` 挂载窗口，在里面直接双击 FlClash 图标就开始用。这种做法会导致后续配置权限异常、服务组件找不到固定应用路径，甚至卸载磁盘镜像后软件直接消失。

规范安装动作是双击 `.dmg` 文件打开虚拟磁盘窗口后，用鼠标把 FlClash 图标拖拽到旁边的 `Applications`（应用程序）文件夹快捷方式中完成本地写入，然后右键桌面或访达左侧栏推出刚挂载的虚拟磁盘，最后再进入“应用程序”目录或启动台打开软件。

### 解决系统提示“无法验证开发者”或“文件已损坏”

由于 FlClash 属于独立开源项目，部分构建版本可能没有购买或绑定苹果官方的公证开发者签名，初次运行时 macOS 的门禁机制（Gatekeeper）几乎必然弹出拦截提醒。处理方式有两种，可以按顺序尝试。

1. **通过隐私与安全性界面放行**，在弹出无法验证开发者的警告窗口时先点击“好”或“取消”，随后打开苹果“系统设置”，进入“隐私与安全性”菜单向下滑动，在安全性区域看到关于已阻止使用 FlClash 的提示条后，点击右侧的“仍要打开”并输入开机密码确认。
2. **使用终端指令移除下载隔离标签**，如果系统直接提示应用“已损坏，建议移到废纸篓”，通常是因为浏览器写入的隔离属性引发的误判。确保 FlClash 已经放入“应用程序”文件夹后，打开 macOS 自带的“终端”应用，执行以下命令行指令移除扩展隔离属性，输入密码（屏幕上不会显示星号，输完直接按回车）即可恢复正常启动。

```bash
sudo xattr -rd com.apple.quarantine /Applications/FlClash.app
```

如果上述命令执行后启动依然闪退，可以检查之前是否误装了 `amd64` 版本并残留了旧配置缓存，参考 [客户端无法启动排查](/troubleshooting/client-wont-start/) 清理配置目录后重装。

## 第三步 Apple Silicon 上的订阅导入与 TUN 权限配置

顺利进入 FlClash 主界面后，接下来的核心动作是导入机场订阅与合理配置代理接管模式。

### 确认机场支持第三方 Clash 订阅

FlClash 底层运行的是 Mihomo 核心，标准适配所有提供 Clash YAML 配置文件的第三方订阅链接。在机场网页控制台复制专属订阅地址后，切换到 FlClash 的“配置”栏目点击添加，粘贴网址即可自动拉取策略组。注意，如果使用的服务商属于仅支持自研软件登录的专属客户端机场，通常无法导出 YAML 链接，也就无法直接在 FlClash 上部署，购买前可通过 [专属客户端与第三方客户端对比](/clients/proprietary-vs-third-party/) 核实。

### 开启系统代理与虚拟网卡的区别选择

在日常办公和网页浏览场景中，直接打开 FlClash 主界面顶部的“系统代理”开关就能接管 Safari、Chrome 以及绝大多数桌面端常规软件，且不需要额外赋予底层系统服务权限。这种方式对笔记本电脑日常移动办公最为省电，拔掉电源出门带走也不容易出现后台路由表残留。

如果你是开发者，经常需要在终端里使用 `git`、`brew`、`curl` 或者运行 Docker 拉取海外镜像，普通系统代理默认不会生效。这时可以在 FlClash 设置里启用“虚拟网卡（TUN 模式）”，并在系统弹出管理员密码输入框时授权网络接口权限。开启后务必核对“绕过局域网”选项保持启用，防止本机无法访问公司内网或家里 NAS。遇到权限授予异常或虚拟网卡启动失败时，可以结合 [TUN 模式异常排查](/troubleshooting/tun-error/) 与 [TUN 模式操作手册](/guides/tun-mode/) 逐一处理。

## 如何核查自己是否误装了 Intel 转译版本

如果之前安装过 FlClash 但不清楚当时下载的是不是原生架构包，可以通过 macOS 系统自带的“活动监视器”在三十秒内直接查明。打开活动监视器后，切换到“CPU”标签页并在右上角搜索框输入 `FlClash` 或 `mihomo`，观察“种类”那一列显示的文字。

如果种类明确显示为 `Apple`，代表应用程序和代理核心均以原生 Apple Silicon 指令集全速运行，无需任何改动；如果种类显示为 `Intel`，则意味着这台 M 系列 Mac 正被迫通过 Rosetta 2 实时转译运行老架构代码。遇到后者情况，建议先退出 FlClash 主程序，将应用程序文件夹中的旧应用移入废纸篓，再重新下载原生 `arm64` 镜像覆盖安装。原有导入的机场订阅和本地配置通常会保留在用户支持目录中，重新打开后核对一次即可继续使用，也能借此彻底消除无谓的后台发热和电量虚耗。
