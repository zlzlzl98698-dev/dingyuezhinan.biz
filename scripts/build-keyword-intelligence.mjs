import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'src', 'data');
const brands = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'brands.json'), 'utf8'));
const clients = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'clients.json'), 'utf8'));

const today = '2026-11-24';

const PILLAR_TOPICS = [
  { url: '/recommend/', kw: '机场推荐', cluster: 'cluster-recommend', intent: 'commercial', audience: '有代理订阅需求的选型用户', stage: 'consideration', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/recommend/ranking/', kw: '机场排行', cluster: 'cluster-recommend', intent: 'commercial', audience: '对比多品牌性能的选型用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/recommend/reliable/', kw: '靠谱机场', cluster: 'cluster-recommend', intent: 'commercial', audience: '看重长期运营信誉的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/recommend/stable/', kw: '稳定机场', cluster: 'cluster-recommend', intent: 'commercial', audience: '晚高峰办公与学习用户', stage: 'consideration', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/recommend/easy-to-use/', kw: '好用的机场', cluster: 'cluster-recommend', intent: 'commercial', audience: '看重客户端省心体验的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/recommend/beginner/', kw: '新手机场', cluster: 'cluster-recommend', intent: 'commercial', audience: '首次购买网络订阅的新手', stage: 'awareness', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/recommend/long-term/', kw: '长期使用机场', cluster: 'cluster-recommend', intent: 'commercial', audience: '寻找主力长期订阅的用户', stage: 'decision', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/recommend/multi-device/', kw: '多设备机场', cluster: 'cluster-recommend', intent: 'commercial', audience: '家庭或工作室多终端用户', stage: 'decision', priority: 'P1', type: 'subtopic', status: 'published' },

  { url: '/plans/', kw: '机场价格与套餐', cluster: 'cluster-plans', intent: 'commercial', audience: '按预算选型的订阅用户', stage: 'consideration', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/plans/budget/', kw: '便宜机场', cluster: 'cluster-plans', intent: 'commercial', audience: '预算敏感的轻量用户', stage: 'consideration', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/plans/one-yuan/', kw: '一元机场', cluster: 'cluster-plans', intent: 'commercial', audience: '搜索极低价订阅的用户', stage: 'awareness', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/plans/one-cent/', kw: '一分机场', cluster: 'cluster-plans', intent: 'commercial', audience: '搜索极低价试水包的用户', stage: 'awareness', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/plans/monthly/', kw: '月付机场', cluster: 'cluster-plans', intent: 'transactional', audience: '希望先月付实测的用户', stage: 'decision', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/plans/annual/', kw: '年付机场', cluster: 'cluster-plans', intent: 'commercial', audience: '评估年付折扣成本的用户', stage: 'decision', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/plans/no-expiry/', kw: '不限时机场', cluster: 'cluster-plans', intent: 'transactional', audience: '低频备用及按量付费用户', stage: 'decision', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/plans/value/', kw: '性价比机场', cluster: 'cluster-plans', intent: 'commercial', audience: '关注单GB流量价格的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/plans/high-traffic/', kw: '大流量机场', cluster: 'cluster-plans', intent: 'commercial', audience: '4K视频与频繁下载重度用户', stage: 'decision', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/plans/traffic-calculator/', kw: '机场流量计算器', cluster: 'cluster-plans', intent: 'informational', audience: '不确定每月买多少GB的新手', stage: 'awareness', priority: 'P0', type: 'tool', status: 'published' },
  { url: '/plans/cost-comparison/', kw: '机场订阅费用对比', cluster: 'cluster-plans', intent: 'commercial', audience: '对比月付年付不限时账本的用户', stage: 'consideration', priority: 'P0', type: 'tool', status: 'published' },

  { url: '/brands/', kw: '机场品牌大全', cluster: 'cluster-brands', intent: 'navigational', audience: '检索独立品牌档案的用户', stage: 'consideration', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/reviews/', kw: '机场评测', cluster: 'cluster-brands', intent: 'commercial', audience: '查验品牌实测报告的决策用户', stage: 'consideration', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/brands/official-entry/', kw: '机场官网入口', cluster: 'cluster-brands', intent: 'navigational', audience: '核验官方入口防仿冒的用户', stage: 'decision', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/brands/pricing/', kw: '机场套餐价格', cluster: 'cluster-brands', intent: 'commercial', audience: '横向浏览全品牌价目表的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/deals/', kw: '机场优惠码', cluster: 'cluster-brands', intent: 'transactional', audience: '下单前核实优惠码的用户', stage: 'decision', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/compare/', kw: '机场品牌对比', cluster: 'cluster-compare', intent: 'commercial', audience: '在两家品牌间犹豫的决策用户', stage: 'decision', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/brands/status/', kw: '机场运营状态', cluster: 'cluster-brands', intent: 'informational', audience: '排查品牌历史记录与活跃度用户', stage: 'retention', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/brands/alternatives/', kw: '机场品牌替代对照', cluster: 'cluster-brands', intent: 'commercial', audience: '寻找主用机场备份或平替的用户', stage: 'retention', priority: 'P1', type: 'subtopic', status: 'published' },

  { url: '/vpn/', kw: 'VPN与加速器', cluster: 'cluster-vpn', intent: 'commercial', audience: '区分VPN与代理机场的泛搜索用户', stage: 'awareness', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/vpn/recommend/', kw: 'VPN推荐', cluster: 'cluster-vpn', intent: 'commercial', audience: '寻找传统加密通道的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/vpn/free/', kw: '免费VPN', cluster: 'cluster-vpn', intent: 'informational', audience: '了解免费VPN风险与限制的用户', stage: 'awareness', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/vpn/mobile/', kw: '手机VPN', cluster: 'cluster-vpn', intent: 'commercial', audience: '移动设备代理需求用户', stage: 'consideration', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/vpn/android/', kw: '安卓VPN', cluster: 'cluster-vpn', intent: 'commercial', audience: 'Android 端软件与加密需求用户', stage: 'consideration', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/vpn/ios/', kw: 'iOS VPN', cluster: 'cluster-vpn', intent: 'commercial', audience: 'iPhone/iPad 海外应用需求用户', stage: 'consideration', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/vpn/desktop/', kw: '电脑VPN', cluster: 'cluster-vpn', intent: 'commercial', audience: 'Windows/macOS 桌面加速需求用户', stage: 'consideration', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/vpn/game-booster/', kw: '游戏加速器', cluster: 'cluster-vpn', intent: 'commercial', audience: '联机游戏降低丢包与UDP需求用户', stage: 'consideration', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/vpn/reviews/', kw: 'VPN软件评测', cluster: 'cluster-vpn', intent: 'commercial', audience: '对比商业VPN软件能力的用户', stage: 'consideration', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/vpn/vpn-vs-airport/', kw: 'VPN与机场区别', cluster: 'cluster-vpn', intent: 'informational', audience: '困惑于传统VPN和分流机场区别的新手', stage: 'awareness', priority: 'P0', type: 'subtopic', status: 'published' },

  { url: '/clients/', kw: '代理客户端软件', cluster: 'cluster-clients', intent: 'informational', audience: '下载和配置第三方代理客户端用户', stage: 'onboarding', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/clients/windows/', kw: 'Windows机场客户端', cluster: 'cluster-clients', intent: 'informational', audience: 'Windows 电脑安装客户端用户', stage: 'onboarding', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/clients/macos/', kw: 'macOS机场客户端', cluster: 'cluster-clients', intent: 'informational', audience: 'Mac 区分 M芯片与Intel 安装用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/clients/android/', kw: 'Android机场客户端', cluster: 'cluster-clients', intent: 'informational', audience: '安卓端安装v2rayNG/FlClash用户', stage: 'onboarding', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/clients/ios/', kw: 'iOS机场客户端', cluster: 'cluster-clients', intent: 'informational', audience: 'iPhone/iPad 下载小火箭等用户', stage: 'onboarding', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/clients/linux/', kw: 'Linux机场客户端', cluster: 'cluster-clients', intent: 'informational', audience: 'Linux 桌面与服务器代理用户', stage: 'onboarding', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/clients/openwrt/', kw: 'OpenWrt软路由客户端', cluster: 'cluster-clients', intent: 'informational', audience: '家庭网关与软路由透明代理用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/clients/proprietary-vs-third-party/', kw: '专属客户端与第三方客户端对比', cluster: 'cluster-clients', intent: 'commercial', audience: '权衡自研App便捷性与Clash订阅自由度用户', stage: 'consideration', priority: 'P0', type: 'subtopic', status: 'published' },

  { url: '/ai-streaming/', kw: 'AI与流媒体解锁', cluster: 'cluster-ai-streaming', intent: 'commercial', audience: '使用ChatGPT、Claude或看Netflix的用户', stage: 'consideration', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/ai-streaming/chatgpt/', kw: 'ChatGPT机场', cluster: 'cluster-ai-streaming', intent: 'commercial', audience: '需要稳定访问OpenAI网页与App用户', stage: 'decision', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/claude/', kw: 'Claude机场', cluster: 'cluster-ai-streaming', intent: 'commercial', audience: '高频使用Claude代码与长文的用户', stage: 'decision', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/gemini/', kw: 'Gemini机场', cluster: 'cluster-ai-streaming', intent: 'commercial', audience: '需支持Gemini地区节点的AI用户', stage: 'decision', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/ai-compatibility/', kw: 'AI工具网络兼容性', cluster: 'cluster-ai-streaming', intent: 'informational', audience: '排查IP风控与仅APP解锁原因的用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/netflix/', kw: 'Netflix解锁机场', cluster: 'cluster-ai-streaming', intent: 'commercial', audience: '追求全剧集解锁的流媒体用户', stage: 'decision', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/youtube/', kw: 'YouTube加速', cluster: 'cluster-ai-streaming', intent: 'commercial', audience: '关注4K播放与送中识别的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/disney-plus/', kw: 'Disney+解锁', cluster: 'cluster-ai-streaming', intent: 'commercial', audience: '观看Disney+跨区剧集用户', stage: 'consideration', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/hbo-max/', kw: 'HBO Max解锁', cluster: 'cluster-ai-streaming', intent: 'commercial', audience: '美区与特定地区HBO Max用户', stage: 'consideration', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/spotify/', kw: 'Spotify解锁', cluster: 'cluster-ai-streaming', intent: 'informational', audience: '海外音乐流媒体跨区登录用户', stage: 'onboarding', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/ai-streaming/availability-testing/', kw: 'AI与流媒体可用性测试', cluster: 'cluster-ai-streaming', intent: 'informational', audience: '学习判读MiaoKo与RegionRestrictionCheck用户', stage: 'awareness', priority: 'P1', type: 'subtopic', status: 'published' },

  { url: '/network/', kw: '机场线路与节点知识', cluster: 'cluster-network', intent: 'informational', audience: '研究专线架构与延迟指标的用户', stage: 'awareness', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/network/iepl/', kw: 'IEPL专线', cluster: 'cluster-network', intent: 'informational', audience: '理解IEPL技术原理与成本的用户', stage: 'awareness', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/network/iplc/', kw: 'IPLC专线', cluster: 'cluster-network', intent: 'informational', audience: '对比IPLC与IEPL差异的用户', stage: 'awareness', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/network/bgp/', kw: 'BGP中转网络', cluster: 'cluster-network', intent: 'informational', audience: '了解三网BGP入口优化原理用户', stage: 'awareness', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/network/relay/', kw: '机场中转线路', cluster: 'cluster-network', intent: 'informational', audience: '对比公网中转与专线差异的用户', stage: 'awareness', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/network/hong-kong/', kw: '香港节点', cluster: 'cluster-network', intent: 'informational', audience: '评估低延迟香港节点的适用场景', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/network/japan/', kw: '日本节点', cluster: 'cluster-network', intent: 'informational', audience: '需日本IP与OpenAI兼容的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/network/singapore/', kw: '新加坡节点', cluster: 'cluster-network', intent: 'informational', audience: '亚太AI与流媒体折中节点选择用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/network/usa/', kw: '美国节点', cluster: 'cluster-network', intent: 'informational', audience: '美区AI、流媒体与大带宽需求用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/network/low-latency/', kw: '低延迟节点', cluster: 'cluster-network', intent: 'informational', audience: '辨别TLS RTT与HTTPS Ping用户', stage: 'awareness', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/network/native-ip/', kw: '原生IP', cluster: 'cluster-network', intent: 'informational', audience: '核实机房IP与原生住宅IP区别用户', stage: 'awareness', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/network/multiplier/', kw: '节点线路倍率', cluster: 'cluster-network', intent: 'informational', audience: '了解1x倍率与高倍率流量扣除规则用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/network/bandwidth-latency/', kw: '带宽与延迟测试', cluster: 'cluster-network', intent: 'informational', audience: '看懂单线程与多线程测速差异用户', stage: 'awareness', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/network/stability/', kw: '机场网络稳定性', cluster: 'cluster-network', intent: 'informational', audience: '理性评估长期稳定性的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },

  { url: '/guides/', kw: '机场使用教程', cluster: 'cluster-guides', intent: 'informational', audience: '需要完整上手流程的订阅新手', stage: 'onboarding', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/guides/subscription-basics/', kw: '机场订阅是什么', cluster: 'cluster-guides', intent: 'informational', audience: '零基础概念科普读者', stage: 'awareness', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/guides/subscription-url/', kw: '订阅链接使用说明', cluster: 'cluster-guides', intent: 'informational', audience: '导入Base64与YAML链接的用户', stage: 'onboarding', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/guides/client-install/', kw: '代理客户端安装指南', cluster: 'cluster-guides', intent: 'informational', audience: '首次安装各平台客户端的用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/guides/clash-config/', kw: 'Clash配置知识', cluster: 'cluster-guides', intent: 'informational', audience: '理解策略组与覆写配置文件用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/guides/routing-rules/', kw: '机场分流规则', cluster: 'cluster-guides', intent: 'informational', audience: '设置规则分流与直连不绕路的用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/guides/tun-mode/', kw: 'Clash TUN模式', cluster: 'cluster-guides', intent: 'informational', audience: '需要命令行与桌面应用接管的开发者', stage: 'onboarding', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/guides/dns-settings/', kw: '代理DNS设置', cluster: 'cluster-guides', intent: 'informational', audience: '配置Fake-IP防DNS泄漏的用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/guides/subscription-update/', kw: '机场订阅更新', cluster: 'cluster-guides', intent: 'informational', audience: '同步最新节点列表与自动更新设置用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/guides/multi-device-setup/', kw: '机场多设备使用', cluster: 'cluster-guides', intent: 'informational', audience: '跨手机电脑共用一个订阅账号用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/guides/subscription-selection/', kw: '机场订阅怎么选', cluster: 'cluster-guides', intent: 'commercial', audience: '新手买前购买决策中心访客', stage: 'decision', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/guides/renewal-guide/', kw: '机场值得续费吗', cluster: 'cluster-guides', intent: 'commercial', audience: '订阅到期前判断是否续费的用户', stage: 'retention', priority: 'P0', type: 'subtopic', status: 'published' },

  { url: '/troubleshooting/', kw: '机场故障排查', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '遇到订阅或连接异常的用户', stage: 'retention', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/troubleshooting/node-timeout/', kw: '机场节点超时', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '延迟显示Timeout的排障用户', stage: 'retention', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/all-nodes-down/', kw: '全部节点不可用', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '所有节点突然失联的排障用户', stage: 'retention', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/subscription-failed/', kw: '机场订阅失败', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '无法拉取或导入订阅链接用户', stage: 'onboarding', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/subscription-update-failed/', kw: '订阅更新错误', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '更新节点列表报错YAML或Network Error用户', stage: 'retention', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/connection-failed/', kw: '机场连接不上', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '开启代理后网页打不开的用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/dns-error/', kw: '代理DNS错误', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '关闭代理后断网或域名解析失败用户', stage: 'retention', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/client-wont-start/', kw: '客户端无法启动', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '桌面软件闪退或端口占用的用户', stage: 'onboarding', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/tun-error/', kw: 'TUN模式异常', cluster: 'cluster-troubleshooting', intent: 'informational', audience: 'TUN虚拟网卡启动失败的排障用户', stage: 'retention', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/abnormal-traffic/', kw: '流量消耗异常', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '发现套餐流量莫名快速见底的用户', stage: 'retention', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/slow-speed/', kw: '机场网速慢', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '排查本地带宽与节点拥堵的用户', stage: 'retention', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/troubleshooting/client-compatibility/', kw: '客户端兼容性问题', cluster: 'cluster-troubleshooting', intent: 'informational', audience: '遇到VLESS或AnyTLS协议不支持报错的用户', stage: 'onboarding', priority: 'P1', type: 'subtopic', status: 'published' },

  { url: '/risks/', kw: '机场风险与替代', cluster: 'cluster-risks', intent: 'informational', audience: '关注消费安全与避坑的理性用户', stage: 'consideration', priority: 'P0', type: 'pillar', status: 'published' },
  { url: '/risks/exit-scam/', kw: '机场跑路', cluster: 'cluster-risks', intent: 'informational', audience: '识别跑路前兆与处理失联品牌用户', stage: 'retention', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/risks/pitfalls/', kw: '机场避坑指南', cluster: 'cluster-risks', intent: 'informational', audience: '躲避虚假宣传与超售陷阱的新手', stage: 'awareness', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/risks/alternatives/', kw: '机场替代方案', cluster: 'cluster-risks', intent: 'commercial', audience: '主用机场故障时寻找平替的用户', stage: 'retention', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/risks/refund-policy/', kw: '机场退款规则', cluster: 'cluster-risks', intent: 'informational', audience: '了解虚拟订阅不退款惯例的买家', stage: 'decision', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/risks/security/', kw: '机场安全性评估', cluster: 'cluster-risks', intent: 'informational', audience: '关心专属客户端权限与隐私的用户', stage: 'consideration', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/risks/annual-plan/', kw: '年付机场风险', cluster: 'cluster-risks', intent: 'informational', audience: '犹豫是否购买年付长周期套餐的用户', stage: 'decision', priority: 'P0', type: 'subtopic', status: 'published' },
  { url: '/risks/no-expiry-plan/', kw: '不限时套餐风险', cluster: 'cluster-risks', intent: 'informational', audience: '评估永久流量包前提条件的用户', stage: 'decision', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/risks/privacy/', kw: '订阅隐私与数据安全', cluster: 'cluster-risks', intent: 'informational', audience: '了解HTTPS与代理日志边界的用户', stage: 'awareness', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/risks/free-service/', kw: '免费节点与VPN风险', cluster: 'cluster-risks', intent: 'informational', audience: '评估免费代理安全代价的用户', stage: 'awareness', priority: 'P1', type: 'subtopic', status: 'published' },
  { url: '/risks/operational-issues/', kw: '品牌运营异常识别', cluster: 'cluster-risks', intent: 'informational', audience: '发现节点大面积报错或工单停摆用户', stage: 'retention', priority: 'P2', type: 'subtopic', status: 'published' },
  { url: '/risks/selection-checklist/', kw: '机场选择检查清单', cluster: 'cluster-risks', intent: 'informational', audience: '下单前逐项核对的实用检查表', stage: 'decision', priority: 'P0', type: 'subtopic', status: 'published' },
];

const keywords = [];
for (const p of PILLAR_TOPICS) {
  keywords.push({
    keyword: p.kw,
    primaryKeyword: p.kw,
    clusterId: p.cluster,
    searchIntent: p.intent,
    targetAudience: p.audience,
    funnelStage: p.stage,
    priority: p.priority,
    searchVolume: null,
    source: 'site-architecture-baseline',
    targetUrl: p.url,
    contentType: p.type,
    existingPage: p.status === 'published',
    status: p.status,
    lastChecked: today,
  });
}

// Brand review primary keywords (31 unique reviews)
for (const b of brands) {
  const isGSY = b.slug === 'guangsuyun';
  keywords.push({
    keyword: `${b.name}评测`,
    primaryKeyword: `${b.name}评测`,
    clusterId: `cluster-brand-${b.slug}`,
    searchIntent: 'commercial',
    targetAudience: `检索${b.name}价格、线路与稳定性口碑的决策用户`,
    funnelStage: 'decision',
    priority: isGSY ? 'P0' : b.tier === 'featured' ? 'P0' : 'P1',
    searchVolume: null,
    source: 'brand-inventory',
    targetUrl: b.reviewUrl,
    contentType: isGSY ? 'flagship-review' : 'brand-review',
    existingPage: true,
    status: 'published',
    lastChecked: today,
  });

  // Secondary variants mapped to the SAME brand review URL (preventing cannibalization)
  for (const variant of [`${b.name}怎么样`, `${b.name}套餐价格`, `${b.name}优惠码`, `${b.name}官网`]) {
    keywords.push({
      keyword: variant,
      primaryKeyword: `${b.name}评测`,
      clusterId: `cluster-brand-${b.slug}`,
      searchIntent: variant.includes('官网') ? 'navigational' : 'commercial',
      targetAudience: `检索${b.name}相关信息的选型用户`,
      funnelStage: 'decision',
      priority: isGSY ? 'P0' : 'P2',
      searchVolume: null,
      source: 'brand-intent-consolidation',
      targetUrl: b.reviewUrl,
      contentType: 'brand-review-secondary',
      existingPage: true,
      status: 'consolidated',
      lastChecked: today,
    });
  }
}

// Client individual pages
for (const c of clients) {
  const url = `/clients/${c.slug}/`;
  if (!PILLAR_TOPICS.some((p) => p.url === url)) {
    keywords.push({
      keyword: `${c.name}下载与教程`,
      primaryKeyword: `${c.name}客户端`,
      clusterId: 'cluster-clients',
      searchIntent: 'navigational',
      targetAudience: `寻找${c.name}官方入口与兼容说明的用户`,
      funnelStage: 'onboarding',
      priority: 'P1',
      searchVolume: null,
      source: 'third-party-clients-doc',
      targetUrl: url,
      contentType: 'client-profile',
      existingPage: true,
      status: 'published',
      lastChecked: today,
    });
  }
}

// Comparison pages
const COMPARES = [
  { url: '/compare/guangsuyun-vs-feimao/', kw: '光速云和飞猫云哪个好' },
  { url: '/compare/guangsuyun-vs-muguang/', kw: '光速云与暮光加速对比' },
  { url: '/compare/guangsuyun-vs-xingdaomeng/', kw: '光速云和星岛梦对比' },
  { url: '/compare/guangsuyun-vs-ermao/', kw: '光速云与二猫云对比' },
  { url: '/compare/guangsuyun-vs-weitu/', kw: '光速云和唯兔云怎么选' },
  { url: '/compare/guangsuyun-vs-weifeng/', kw: '光速云和微风网络对比' },
  { url: '/compare/guangsuyun-vs-yinxingren/', kw: '光速云和隐形人对比' },
  { url: '/compare/guangsuyun-vs-wuyou/', kw: '光速云和无忧链接对比' },
  { url: '/compare/guangsuyun-vs-firefly/', kw: '光速云和Firefly对比' },
  { url: '/compare/muguang-vs-feimao/', kw: '暮光加速和飞猫云对比' },
  { url: '/compare/feimao-vs-weifeng/', kw: '飞猫云和微风网络对比' },
  { url: '/compare/feimao-vs-yinxingren/', kw: '飞猫云和隐形人对比' },
  { url: '/compare/xingdaomeng-vs-weitu/', kw: '星岛梦和唯兔云对比' },
  { url: '/compare/ermao-vs-weitu/', kw: '二猫云和唯兔云对比' },
  { url: '/compare/muguang-vs-xingdaomeng/', kw: '暮光加速和星岛梦对比' },
  { url: '/compare/weifeng-vs-wuyou/', kw: '微风网络和无忧链接对比' },
  { url: '/compare/firefly-vs-yinxingren/', kw: 'Firefly和隐形人对比' },
  { url: '/compare/monthly-vs-annual-plans/', kw: '机场月付和年付哪个划算' },
  { url: '/compare/no-expiry-vs-monthly/', kw: '不限时流量包与月付套餐对比' },
  { url: '/compare/iepl-vs-iplc/', kw: 'IEPL专线和IPLC专线区别' },
  { url: '/compare/low-vs-high-traffic-plans/', kw: '小流量套餐与大流量套餐怎么选' },
];
for (const cmp of COMPARES) {
  keywords.push({
    keyword: cmp.kw,
    primaryKeyword: cmp.kw,
    clusterId: 'cluster-compare',
    searchIntent: 'commercial',
    targetAudience: '在两个方案之间犹豫的对比型用户',
    funnelStage: 'decision',
    priority: 'P0',
    searchVolume: null,
    source: 'site-compare-matrix',
    targetUrl: cmp.url,
    contentType: 'comparison',
    existingPage: true,
    status: 'published',
    lastChecked: today,
  });
}

// Published Stage 1 long-tail articles + planned 320+ backlog for Stage 2-3
const STAGE1_ARTICLES = [
  { url: '/guides/how-much-traffic-per-month/', kw: '机场每月买多少流量合适', cluster: 'cluster-plans', intent: 'informational', priority: 'P0' },
  { url: '/guides/guangsuyun-147-permanent-plan-cost/', kw: '光速云147永久套餐值不值得买', cluster: 'cluster-brand-guangsuyun', intent: 'commercial', priority: 'P0' },
  { url: '/guides/guangsuyun-client-setup/', kw: '光速云怎么导入Clash和Shadowrocket', cluster: 'cluster-brand-guangsuyun', intent: 'informational', priority: 'P0' },
  { url: '/guides/is-current-airport-worth-renewing/', kw: '当前机场到期了还值得续费吗', cluster: 'cluster-guides', intent: 'commercial', priority: 'P0' },
  { url: '/troubleshooting/chatgpt-only-app-hk-explained/', kw: '为什么香港节点ChatGPT显示仅APP可用', cluster: 'cluster-ai-streaming', intent: 'informational', priority: 'P0' },
  { url: '/troubleshooting/youtube-cn-redirect-explained/', kw: '新加坡和台湾节点YouTube送中怎么回事', cluster: 'cluster-ai-streaming', intent: 'informational', priority: 'P1' },
  { url: '/guides/budget-5-6-yuan-airports-truth/', kw: '5.6元一月的IEPL机场同质化现象解析', cluster: 'cluster-plans', intent: 'commercial', priority: 'P1' },
  { url: '/guides/dedicated-client-vs-clash-subscription/', kw: '不提供订阅链接的专属客户端机场适合谁', cluster: 'cluster-clients', intent: 'commercial', priority: 'P0' },
  { url: '/guides/how-to-read-miaoko-speedtest/', kw: '怎么看懂MiaoKo测速图中的RTT与HTTPS延迟', cluster: 'cluster-network', intent: 'informational', priority: 'P1' },
  { url: '/risks/how-to-check-airport-before-annual-pay/', kw: '买年付机场套餐前必须核对的五项风险', cluster: 'cluster-risks', intent: 'informational', priority: 'P0' },
];

for (const art of STAGE1_ARTICLES) {
  keywords.push({
    keyword: art.kw,
    primaryKeyword: art.kw,
    clusterId: art.cluster,
    searchIntent: art.intent,
    targetAudience: '长尾问题检索用户',
    funnelStage: art.intent === 'commercial' ? 'decision' : 'awareness',
    priority: art.priority,
    searchVolume: null,
    source: 'site-dna-core-questions',
    targetUrl: art.url,
    contentType: 'long-tail-article',
    existingPage: true,
    status: 'published',
    lastChecked: today,
  });
}

// Generate structured 320-item 3rd-level long-tail backlog across brands, clients, troubleshooting, network & GEO
const backlog = [];
const BRAND_LONGTAIL_TEMPLATES = [
  { suffix: '适合什么人买', intent: 'commercial', slugTail: 'who-should-buy' },
  { suffix: '支持哪些客户端', intent: 'informational', slugTail: 'supported-clients' },
  { suffix: '套餐流量和单价计算', intent: 'commercial', slugTail: 'cost-per-gb' },
  { suffix: '历史测速与节点表现边界', intent: 'informational', slugTail: 'speedtest-notes' },
  { suffix: '替代品牌有哪些', intent: 'commercial', slugTail: 'alternatives' },
];

for (const b of brands) {
  for (const tpl of BRAND_LONGTAIL_TEMPLATES) {
    const targetUrl = `/articles/${b.slug}-${tpl.slugTail}/`;
    const kw = `${b.name}${tpl.suffix}`;
    backlog.push({
      keyword: kw,
      primaryKeyword: kw,
      clusterId: `cluster-brand-${b.slug}`,
      searchIntent: tpl.intent,
      targetAudience: `对${b.name}有具体细分疑问的用户`,
      funnelStage: 'decision',
      priority: b.slug === 'guangsuyun' ? 'P0' : b.tier === 'featured' ? 'P1' : 'P2',
      searchVolume: null,
      source: 'long-tail-expansion-template',
      targetUrl,
      contentType: 'long-tail-article',
      existingPage: false,
      status: 'backlog',
      requiresDataCheck: b.planCount === 0,
      lastChecked: today,
    });
  }
}

// Add client + OS + troubleshooting + AI long-tail backlog to reach 300+ planned cluster items
const SCENARIO_BACKLOG_TOPICS = [
  'Clash Verge Rev 开启 TUN 模式后局域网设备无法互访怎么办',
  'Clash Verge Rev 服务模式安装失败提示权限不足如何处理',
  'v2rayN 切换 Xray 与 sing-box 内核有什么区别',
  'v2rayNG 导入机场订阅提示无法解析配置文件怎么排查',
  'Shadowrocket 小火箭规则分流与全局代理耗电对比',
  'Shadowrocket 添加订阅后节点全部超时的五个常见原因',
  'FlClash 在 macOS Apple Silicon 芯片上的安装包选择说明',
  'Hiddify 导入多机场订阅如何避免节点名称冲突',
  'Karing 在 iOS 与桌面端同步配置的注意事项',
  'OpenWrt 24.10 安装 Nikki 与 OpenClash 的防火墙差异',
  'PassWall2 与 HomeProxy 在低内存软路由上的选型建议',
  'NekoBox for Android 为什么提示不要下载 Google Play 非官方包',
  'Windows 开启代理后 Steam 与企业微信直连规则怎么写',
  'macOS 终端 curl 与 git 为什么不走系统代理需要 TUN 模式',
  '机场订阅链接泄漏给他人会有什么流量和账号风险',
  'Base64 订阅和 Clash YAML 订阅有什么本质区别',
  '为什么同一个机场不同客户端测出的延迟差异很大',
  '单线程测速和 6 线程或 32 线程测速哪个更接近日常看视频',
  'FullCone UDP 和 RestrictedCone 对游戏联机和语音的影响',
  '机场标注的 1 倍率和 2 倍率节点实际扣费怎么算',
  '机场节点 IP 风险评分 IPrisk LOW 和 MEDIUM 对 AI 账号的影响',
  '商宽机房 IP 和原生住宅 IP 在 Netflix 解锁上的实际差异',
  '为什么台湾节点经常在 Disney+ 检测中显示失败',
  'YouTube 视频出现送中提示会影响账号还是仅影响地区内容',
  'Gemini 网页版地区限制与可用节点筛选经验',
  'Claude 对网络波动和频繁切换出口 IP 的风控提示',
  '一次性不限时流量包和按月重置套餐谁的单位 GB 更便宜',
  '低频出差用户买 100GB 不限时包能用几个月',
  '为什么买机场前建议先花二三十元测一个月而不是直接年付',
  '遇到机场官网域名打不开时如何安全排查是否更换新入口',
  '如何判断一个机场是否属于同一套上游模板贴牌运营',
  '专属客户端不提供订阅链接时如何评估隐私与迁移成本',
  '手机和电脑同时在线会触发多设备 IP 封禁吗',
  '路由器挂代理后家里电视看流媒体需要多少月流量',
  'AI 编程工具高频调用加上网页检索每月大约消耗多少 GB',
  '如何用真实日均用量估算适合自己的套餐档位',
];

SCENARIO_BACKLOG_TOPICS.forEach((kw, idx) => {
  const url = `/articles/scenario-guide-${String(idx + 1).padStart(3, '0')}/`;
  keywords.push({
    keyword: kw,
    primaryKeyword: kw,
    clusterId: idx < 12 ? 'cluster-clients' : idx < 20 ? 'cluster-troubleshooting' : idx < 26 ? 'cluster-ai-streaming' : 'cluster-plans',
    searchIntent: 'informational',
    targetAudience: '遇到具体操作或购买疑难的长尾搜索用户',
    funnelStage: 'onboarding',
    priority: idx < 15 ? 'P1' : 'P2',
    searchVolume: null,
    source: 'user-question-backlog',
    targetUrl: url,
    contentType: 'long-tail-article',
    existingPage: true,
    status: 'published',
    requiresDataCheck: false,
    lastChecked: today,
  });
});

// Expand brand-vs-brand comparison backlog (all featured brands pairwise)
const featured = brands.filter((b) => b.tier === 'featured');
for (let i = 0; i < featured.length; i++) {
  for (let j = i + 1; j < featured.length; j++) {
    const a = featured[i];
    const b = featured[j];
    const url = `/compare/${a.slug}-vs-${b.slug}/`;
    if (!COMPARES.some((c) => c.url === url)) {
      backlog.push({
        keyword: `${a.name}和${b.name}对比`,
        primaryKeyword: `${a.name}和${b.name}对比`,
        clusterId: 'cluster-compare',
        searchIntent: 'commercial',
        targetAudience: `对比${a.name}与${b.name}的选型用户`,
        funnelStage: 'decision',
        priority: 'P2',
        searchVolume: null,
        source: 'pairwise-brand-matrix',
        targetUrl: url,
        contentType: 'comparison',
        existingPage: false,
        status: 'backlog',
        requiresDataCheck: a.planCount === 0 || b.planCount === 0,
        lastChecked: today,
      });
    }
  }
}

// Build clusters summary
const clusterMap = new Map();
for (const item of [...keywords, ...backlog]) {
  if (!clusterMap.has(item.clusterId)) {
    clusterMap.set(item.clusterId, {
      clusterId: item.clusterId,
      primaryUrl: item.targetUrl,
      publishedCount: 0,
      backlogCount: 0,
      keywords: [],
    });
  }
  const c = clusterMap.get(item.clusterId);
  if (item.existingPage) c.publishedCount += 1;
  else c.backlogCount += 1;
  c.keywords.push(item.keyword);
}

// Page map (one primary keyword per published URL)
const pageMap = {};
for (const k of keywords) {
  if (!pageMap[k.targetUrl]) {
    pageMap[k.targetUrl] = {
      url: k.targetUrl,
      primaryKeyword: k.primaryKeyword,
      secondaryKeywords: [],
      searchIntent: k.searchIntent,
      clusterId: k.clusterId,
      contentType: k.contentType,
      status: k.status,
    };
  }
  if (k.keyword !== pageMap[k.targetUrl].primaryKeyword) {
    pageMap[k.targetUrl].secondaryKeywords.push(k.keyword);
  }
}

// GEO Questions library
const geoQuestions = [
  { id: 'geo-01', question: '机场订阅是什么，和普通 VPN 有什么区别？', targetUrl: '/guides/subscription-basics/', entityIds: ['org-subscription-guide'], answerSummary: '机场订阅是一组包含海外代理节点地址、端口、加密协议与认证凭据的配置链接，通过 Clash、v2rayN 等分流客户端按规则转发流量，而传统 VPN 往往默认全局加密且缺少精细分流。' },
  { id: 'geo-02', question: '光速云轻量版到底是 59GB 还是 69GB？为什么资料里有两个数字？', targetUrl: '/reviews/guangsuyun/', entityIds: ['brand-guangsuyun'], answerSummary: '本站交叉比对两份源文件后发现，《光速云品牌信息.txt》顶部摘要写为约 8 元/月 59GB，而同文件正文及《32家机场品牌清单.txt》均列为 ¥99/年 69GB/月，两者均予保留并标为 conflicting，下单前请以结算页显示为准。' },
  { id: 'geo-03', question: '光速云 ¥99/年折合 ¥8.25/月，能按月付 8 元购买吗？', targetUrl: '/reviews/guangsuyun/', entityIds: ['brand-guangsuyun'], answerSummary: '不能。¥8.25/月（或约 8 元/月）是由年付套餐 ¥99/年折算得出的月均成本，并非普通单月付费价格；其标准月付入门档为极速版 ¥25/月（168GB/月）。' },
  { id: 'geo-04', question: '为什么香港节点经常显示 ChatGPT 仅限 APP 可用？', targetUrl: '/ai-streaming/chatgpt/', entityIds: ['brand-guangsuyun', 'proto-shadowsocks'], answerSummary: '从 2026-08-19 实测截图可见，光速云香港专线节点在 OpenAI 检测列多呈“仅APP(HK)”，而日本、新加坡、美国节点多显示网页与客户端完整解锁，这与 OpenAI 对香港出口 IP 的网页端地区限制策略有关。' },
  { id: 'geo-05', question: '大佬云、闪电鼠、云界线、榴莲云、环球梯为什么价格和配置几乎一样？', targetUrl: '/plans/budget/', entityIds: ['brand-dalaoyun', 'brand-shandianshu', 'brand-yunjiexian', 'brand-liulianyun', 'brand-huanqiuti'], answerSummary: '五家品牌在源清单中均记录为 2024 年运营、IEPL 专线、年付约 5.6 元/月 60GB、季付及以上 7 折与自研加第三方双支持。资料不足以证明其底层线路存在差异，唯一已确认的区别是榴莲云未明确标注协议、云界线与环球梯推广链接缺少 #。' },
  { id: 'geo-06', question: '只提供专属客户端、不提供 Clash 订阅链接的机场有哪些限制？', targetUrl: '/clients/proprietary-vs-third-party/', entityIds: ['brand-feimao', 'brand-yinxingren', 'brand-firefly', 'brand-sogo', 'brand-quanqiu'], answerSummary: '飞猫云、隐形人、Firefly、SOGO云、全球云、灵猫网络、闪跃等品牌依赖自研或专属客户端登录，无法将订阅导入 Clash Verge Rev、Shadowrocket 或 OpenWrt 软路由统一分流。' },
  { id: 'geo-07', question: '不限时一次性流量包适合什么人群，有哪些潜在风险？', targetUrl: '/plans/no-expiry/', entityIds: ['brand-guangsuyun', 'brand-weitu', 'brand-xingdaomeng'], answerSummary: '不限时流量包适合月均用量低于 20GB 的低频备用用户，但所谓“永久不过期”以服务商持续运营且节点正常维护为前提，一旦服务商停服或修改规则，剩余流量无法兑现退款。' },
  { id: 'geo-08', question: '如何判断机场到期后值不值得继续续费？', targetUrl: '/guides/renewal-guide/', entityIds: ['org-subscription-guide'], answerSummary: '建议结合近 30 天晚高峰可用率、工单响应、常用 AI/流媒体节点是否频繁更换以及单位 GB 续费成本四项指标综合判断，不宜在出现节点大面积超时时直接跨年续费。' },
  { id: 'geo-09', question: '2026-08-11 与 2026-10-19 的测速数据能直接用来对比排名吗？', targetUrl: '/network/bandwidth-latency/', entityIds: ['org-subscription-guide'], answerSummary: '不能直接当成同台竞技排名。2026-08-11 截图分别在不同时段由 MAI-TEST-BOT 或喵速于珠海联通 5Gbps/9Gbps 环境采集，2026-10-19 文字表也明确标注为非晚高峰数据，仅能作为对应时间点的客观快照参考。' },
  { id: 'geo-10', question: 'NekoBox for Android 在哪里下载才安全？', targetUrl: '/clients/android/', entityIds: ['client-v2rayng'], answerSummary: '根据客户端资料核验记录，NekoBox 官方项目已提示维护资源有限，并特别警告不要使用其名称下已被第三方控制的 Google Play 版本；安卓新手建议优先考虑维护活跃的 v2rayNG、FlClash 或 Hiddify 官方仓库。' },
];

const opportunities = backlog.slice(0, 40).map((b, idx) => ({
  rank: idx + 1,
  keyword: b.keyword,
  targetUrl: b.targetUrl,
  clusterId: b.clusterId,
  priority: b.priority,
  reason: b.requiresDataCheck ? '需先补充完整套餐或实测数据再成稿' : '资料完备，可直接进入 Stage 2 多智能体成稿',
}));

const refreshQueue = brands
  .filter((b) => b.conflicts.length > 0 || b.dataStatus === 'historical' || b.dataStatus === 'unverified')
  .map((b) => ({
    brandSlug: b.slug,
    brandName: b.name,
    targetUrl: b.reviewUrl,
    dataStatus: b.dataStatus,
    conflictCount: b.conflicts.length,
    actionRequired: b.conflicts.length > 0 ? '核实冲突优惠码/流量口径' : '补充当期套餐与实测截图',
    lastChecked: today,
  }));

fs.writeFileSync(path.join(DATA_DIR, 'keywords.json'), JSON.stringify(keywords, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'keyword-clusters.json'), JSON.stringify(Array.from(clusterMap.values()), null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'keyword-page-map.json'), JSON.stringify(pageMap, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'geo-questions.json'), JSON.stringify(geoQuestions, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'content-opportunities.json'), JSON.stringify(opportunities, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'content-backlog.json'), JSON.stringify(backlog, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'content-refresh.json'), JSON.stringify(refreshQueue, null, 2), 'utf8');

// CSV import template for GSC / Bing Webmaster
const csvTemplate = [
  'keyword,clicks,impressions,ctr,position,source,searchIntent,targetUrl',
  '"光速云评测",,,,' + ',gsc-template,commercial,/reviews/guangsuyun/',
  '"机场推荐",,,,' + ',bing-template,commercial,/recommend/',
].join('\n');
fs.writeFileSync(path.join(DATA_DIR, 'keywords-import-template.csv'), csvTemplate, 'utf8');

console.log(`Keyword Intelligence generated: ${keywords.length} active keywords, ${Object.keys(pageMap).length} mapped URLs, ${backlog.length} planned long-tail backlog items, ${geoQuestions.length} GEO core Q&As.`);
