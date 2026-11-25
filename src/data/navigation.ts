export interface SubtopicNavItem {
  title: string;
  slug: string;
  href: string;
  description: string;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
}

export interface PillarNavItem {
  id: string;
  order: string;
  title: string;
  href: string;
  system: 'guides' | 'reviews' | 'commercial';
  tagline: string;
  groups: {
    label: string;
    items: SubtopicNavItem[];
  }[];
}

export const SITE_INFO = {
  domain: 'https://dingyuezhinan.biz',
  name: '订阅指南',
  enName: 'Subscription Guide',
  slogan: '从订阅选择到日常使用，一站式网络订阅指南。',
  disclosure:
    '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。商业精选排序与客观性能实测分开标注。',
  watermark: '订阅指南 · dingyuezhinan.biz',
};

export const PILLAR_NAV: PillarNavItem[] = [
  {
    id: 'recommend',
    order: '01',
    title: '机场推荐',
    href: '/recommend/',
    system: 'commercial',
    tagline: '按预算、设备规模与线路特征筛选可核验订阅方案',
    groups: [
      {
        label: '核心榜单与选型',
        items: [
          { title: '机场推荐', slug: 'recommend-index', href: '/recommend/', description: '全站订阅推荐总览与筛选方法', intent: 'commercial' },
          { title: '机场排行', slug: 'ranking', href: '/recommend/ranking/', description: '按资料完整度与实测口径分层对比', intent: 'commercial' },
          { title: '靠谱机场', slug: 'reliable', href: '/recommend/reliable/', description: '长期运营记录与透明度评估', intent: 'commercial' },
          { title: '稳定机场', slug: 'stable', href: '/recommend/stable/', description: 'IEPL/IPLC 专线与晚高峰考量', intent: 'commercial' },
        ],
      },
      {
        label: '人群与场景专题',
        items: [
          { title: '好用的机场', slug: 'easy-to-use', href: '/recommend/easy-to-use/', description: '客户端易用性与日常体验对比', intent: 'commercial' },
          { title: '新手机场', slug: 'beginner', href: '/recommend/beginner/', description: '零基础入门门槛与月付试错指南', intent: 'commercial' },
          { title: '长期使用机场', slug: 'long-term', href: '/recommend/long-term/', description: '续费策略与老牌运营档案分析', intent: 'commercial' },
          { title: '多设备机场', slug: 'multi-device', href: '/recommend/multi-device/', description: '多端同时在线与不限设备方案', intent: 'commercial' },
        ],
      },
    ],
  },
  {
    id: 'plans',
    order: '02',
    title: '价格与套餐',
    href: '/plans/',
    system: 'commercial',
    tagline: '核算真实月均成本、单GB单价与周期风险',
    groups: [
      {
        label: '价位与计费周期',
        items: [
          { title: '便宜机场', slug: 'budget', href: '/plans/budget/', description: '低门槛入门套餐与同质化规格拆解', intent: 'commercial' },
          { title: '一元机场', slug: 'one-yuan', href: '/plans/one-yuan/', description: '极低价宣传的真实周期与风险辨析', intent: 'commercial' },
          { title: '一分机场', slug: 'one-cent', href: '/plans/one-cent/', description: '超低价体验包与隐性限制分析', intent: 'commercial' },
          { title: '月付机场', slug: 'monthly', href: '/plans/monthly/', description: '低锁定风险的按月订阅筛选', intent: 'transactional' },
          { title: '年付机场', slug: 'annual', href: '/plans/annual/', description: '年付折算月均成本与跑路风险评估', intent: 'commercial' },
          { title: '不限时机场', slug: 'no-expiry', href: '/plans/no-expiry/', description: '一次性不过期流量包全库对比', intent: 'transactional' },
        ],
      },
      {
        label: '用量与成本计算工具',
        items: [
          { title: '性价比机场', slug: 'value', href: '/plans/value/', description: '单 GB 流量成本与线路均衡性排行', intent: 'commercial' },
          { title: '大流量机场', slug: 'high-traffic', href: '/plans/high-traffic/', description: '500GB 至 2TB 档位大流量方案汇总', intent: 'commercial' },
          { title: '机场流量计算器', slug: 'traffic-calculator', href: '/plans/traffic-calculator/', description: '交互式月流量需求与套餐匹配计算', intent: 'informational' },
          { title: '机场订阅费用对比', slug: 'cost-comparison', href: '/plans/cost-comparison/', description: '月付、年付、不限时横评计算工具', intent: 'commercial' },
        ],
      },
    ],
  },
  {
    id: 'brands',
    order: '03',
    title: '机场品牌',
    href: '/brands/',
    system: 'reviews',
    tagline: '31家独立品牌全量档案、冲突披露与主评测入口',
    groups: [
      {
        label: '品牌数据库与入口',
        items: [
          { title: '机场品牌大全', slug: 'brands-index', href: '/brands/', description: '31家独立品牌去重库与实时筛选', intent: 'navigational' },
          { title: '品牌深度评测', slug: 'brand-reviews', href: '/reviews/', description: '一品牌一主评测与原始测速证据', intent: 'commercial' },
          { title: '品牌官网入口', slug: 'brand-official', href: '/brands/official-entry/', description: '已记录入口格式校验与防仿冒说明', intent: 'navigational' },
          { title: '品牌套餐价格', slug: 'brand-pricing', href: '/brands/pricing/', description: '全品牌原始套餐价格明细汇总', intent: 'commercial' },
        ],
      },
      {
        label: '优惠、对比与状态',
        items: [
          { title: '品牌优惠信息', slug: 'deals', href: '/deals/', description: '全站优惠码冲突核验与折扣限制', intent: 'transactional' },
          { title: '品牌横向对比', slug: 'compare', href: '/compare/', description: '光速云等主流品牌双边深度对比', intent: 'commercial' },
          { title: '品牌运营状态', slug: 'brand-status', href: '/brands/status/', description: '开业年份、资料状态与历史档案追踪', intent: 'informational' },
          { title: '品牌替代方案', slug: 'brand-alternatives', href: '/brands/alternatives/', description: '同价位、同协议与备用订阅替代矩阵', intent: 'commercial' },
        ],
      },
    ],
  },
  {
    id: 'vpn',
    order: '04',
    title: 'VPN 与加速器',
    href: '/vpn/',
    system: 'reviews',
    tagline: '厘清传统 VPN、代理机场与游戏加速器的技术边界',
    groups: [
      {
        label: 'VPN 分类与平台',
        items: [
          { title: 'VPN 推荐', slug: 'vpn-recommend', href: '/vpn/recommend/', description: '常规加密通道适用条件与选型', intent: 'commercial' },
          { title: '免费 VPN', slug: 'free-vpn', href: '/vpn/free/', description: '免费 VPN 的带宽限制与隐私代价', intent: 'informational' },
          { title: '手机 VPN', slug: 'mobile-vpn', href: '/vpn/mobile/', description: '移动网络切换与电量影响', intent: 'commercial' },
          { title: '安卓 VPN', slug: 'android-vpn', href: '/vpn/android/', description: 'Android 端加密连接与分流兼容', intent: 'commercial' },
          { title: 'iOS VPN', slug: 'ios-vpn', href: '/vpn/ios/', description: 'App Store 外区下载与规则差异', intent: 'commercial' },
          { title: '电脑 VPN', slug: 'desktop-vpn', href: '/vpn/desktop/', description: 'Windows 与 macOS 桌面级选型', intent: 'commercial' },
        ],
      },
      {
        label: '加速器与机制差异',
        items: [
          { title: '游戏加速器', slug: 'game-booster', href: '/vpn/game-booster/', description: 'UDP 转发与联机低抖动机制', intent: 'commercial' },
          { title: 'VPN 软件评测', slug: 'vpn-reviews', href: '/vpn/reviews/', description: '商业 VPN 与通用协议软件评估', intent: 'commercial' },
          { title: 'VPN 与机场区别', slug: 'vpn-vs-airport', href: '/vpn/vpn-vs-airport/', description: '协议栈、分流粒度与计费模型对照', intent: 'informational' },
        ],
      },
    ],
  },
  {
    id: 'clients',
    order: '05',
    title: '客户端软件',
    href: '/clients/',
    system: 'guides',
    tagline: '全平台开源客户端、内核支持与兼容性查询',
    groups: [
      {
        label: '主流客户端专题',
        items: [
          { title: 'Clash Verge Rev', slug: 'clash-verge-rev', href: '/clients/clash-verge-rev/', description: 'Mihomo 内核桌面管理与 TUN 方案', intent: 'navigational' },
          { title: 'Clash Verge', slug: 'clash-verge', href: '/clients/clash-verge/', description: '原版演进与迁移到 Rev 的说明', intent: 'informational' },
          { title: 'Clash Meta', slug: 'clash-meta', href: '/clients/clash-meta/', description: 'Mihomo 核心生态与 Android 适配', intent: 'informational' },
          { title: 'v2rayN', slug: 'v2rayn', href: '/clients/v2rayn/', description: 'Windows/macOS/Linux 多核心图形客户端', intent: 'navigational' },
          { title: 'v2rayNG', slug: 'v2rayng', href: '/clients/v2rayng/', description: 'Android 端 Xray 轻量订阅工具', intent: 'navigational' },
          { title: 'Shadowrocket', slug: 'shadowrocket', href: '/clients/shadowrocket/', description: 'iOS 小火箭规则与付费说明', intent: 'navigational' },
          { title: 'Mihomo', slug: 'mihomo', href: '/clients/mihomo/', description: '新一代 Clash 兼容代理核心解析', intent: 'informational' },
          { title: 'sing-box', slug: 'sing-box', href: '/clients/sing-box/', description: '统一跨平台通用代理内核与官方端', intent: 'informational' },
          { title: 'FlClash', slug: 'flclash', href: '/clients/flclash/', description: 'Flutter 跨平台 Mihomo 客户端', intent: 'navigational' },
          { title: 'Hiddify', slug: 'hiddify', href: '/clients/hiddify/', description: '多协议自动选点与新手配置工具', intent: 'navigational' },
          { title: 'Karing', slug: 'karing', href: '/clients/karing/', description: 'sing-box 体系新手友好多端客户端', intent: 'navigational' },
        ],
      },
      {
        label: '按操作系统与模式',
        items: [
          { title: 'Windows 客户端', slug: 'windows', href: '/clients/windows/', description: '桌面端装机与分流推荐矩阵', intent: 'informational' },
          { title: 'macOS 客户端', slug: 'macos', href: '/clients/macos/', description: 'Intel 与 Apple Silicon 架构区分', intent: 'informational' },
          { title: 'Android 客户端', slug: 'android', href: '/clients/android/', description: '安卓安全下载渠道与防假包警告', intent: 'informational' },
          { title: 'iOS 客户端', slug: 'ios', href: '/clients/ios/', description: '美区商店付费软件与免费替代', intent: 'informational' },
          { title: 'Linux 客户端', slug: 'linux', href: '/clients/linux/', description: 'DEB/RPM/AppImage 与 v2rayA 方案', intent: 'informational' },
          { title: 'OpenWrt 客户端', slug: 'openwrt', href: '/clients/openwrt/', description: 'OpenClash/PassWall2/Nikki/HomeProxy 适配', intent: 'informational' },
          { title: '专属客户端与第三方客户端对比', slug: 'proprietary-vs-third-party', href: '/clients/proprietary-vs-third-party/', description: '订阅自由度、安全性与迁移成本比较', intent: 'commercial' },
        ],
      },
    ],
  },
  {
    id: 'ai-streaming',
    order: '06',
    title: 'AI 与流媒体',
    href: '/ai-streaming/',
    system: 'reviews',
    tagline: '基于原始解锁截图的 AI 工具与流媒体兼容性数据库',
    groups: [
      {
        label: 'AI 生产力工具',
        items: [
          { title: 'ChatGPT 机场', slug: 'chatgpt', href: '/ai-streaming/chatgpt/', description: '网页端与 App 端 IP 风控差异（含仅 APP 解锁现象）', intent: 'commercial' },
          { title: 'Claude 机场', slug: 'claude', href: '/ai-streaming/claude/', description: '地区合规节点与风控敏感度评估', intent: 'commercial' },
          { title: 'Gemini 机场', slug: 'gemini', href: '/ai-streaming/gemini/', description: '为什么多数节点标注“视节点而定”', intent: 'commercial' },
          { title: 'AI 工具网络兼容性', slug: 'ai-compatibility', href: '/ai-streaming/ai-compatibility/', description: 'IPRisk、ASN 与干净 IP 判断方法', intent: 'informational' },
        ],
      },
      {
        label: '海外流媒体矩阵',
        items: [
          { title: 'Netflix 解锁', slug: 'netflix', href: '/ai-streaming/netflix/', description: '全解锁、自制剧与跨区识别实测记录', intent: 'commercial' },
          { title: 'YouTube 加速', slug: 'youtube', href: '/ai-streaming/youtube/', description: '4K 码率需求与“送中”现象解读', intent: 'commercial' },
          { title: 'Disney+', slug: 'disney-plus', href: '/ai-streaming/disney-plus/', description: '台湾/香港地区常见解锁失败原因分析', intent: 'commercial' },
          { title: 'HBO Max', slug: 'hbo-max', href: '/ai-streaming/hbo-max/', description: '美区与特定亚太节点支持记录', intent: 'commercial' },
          { title: 'Spotify', slug: 'spotify', href: '/ai-streaming/spotify/', description: '账号所属区与流媒体低门槛支持', intent: 'informational' },
          { title: 'AI 与流媒体可用性测试', slug: 'availability-testing', href: '/ai-streaming/availability-testing/', description: 'MiaoKo 与 RegionRestrictionCheck 判读指南', intent: 'informational' },
        ],
      },
    ],
  },
  {
    id: 'network',
    order: '07',
    title: '线路与节点',
    href: '/network/',
    system: 'reviews',
    tagline: '拆解专线架构、区域节点延迟与真实测速条件',
    groups: [
      {
        label: '传输架构与线路',
        items: [
          { title: 'IEPL 专线', slug: 'iepl', href: '/network/iepl/', description: '以太网内网专线原理与厂商宣传边界', intent: 'informational' },
          { title: 'IPLC 专线', slug: 'iplc', href: '/network/iplc/', description: '国际私网专线与 IEPL 架构对照', intent: 'informational' },
          { title: 'BGP 网络', slug: 'bgp', href: '/network/bgp/', description: '三网智能入口调度与跨网丢包优化', intent: 'informational' },
          { title: '中转线路', slug: 'relay', href: '/network/relay/', description: '公网隧道中转与专线混合架构成本差异', intent: 'informational' },
        ],
      },
      {
        label: '节点区域与性能指标',
        items: [
          { title: '香港节点', slug: 'hong-kong', href: '/network/hong-kong/', description: '低延迟主力区域与 ChatGPT 网页限制说明', intent: 'informational' },
          { title: '日本节点', slug: 'japan', href: '/network/japan/', description: '高带宽与 OpenAI/日区流媒体表现', intent: 'informational' },
          { title: '新加坡节点', slug: 'singapore', href: '/network/singapore/', description: 'Gemini 较高解锁率区域与“送中”注意项', intent: 'informational' },
          { title: '美国节点', slug: 'usa', href: '/network/usa/', description: '跨太平洋高 RTT 下的流媒体与 AI 支持', intent: 'informational' },
          { title: '低延迟节点', slug: 'low-latency', href: '/network/low-latency/', description: 'TLS RTT 与 HTTPS Ping 真实差异解析', intent: 'informational' },
          { title: '原生 IP', slug: 'native-ip', href: '/network/native-ip/', description: '商宽/机房 IP 与住宅 IP 在解锁中的区别', intent: 'informational' },
          { title: '线路倍率', slug: 'multiplier', href: '/network/multiplier/', description: '全节点 1x 倍率与高倍率流量消耗账本', intent: 'informational' },
          { title: '带宽与延迟', slug: 'bandwidth-latency', href: '/network/bandwidth-latency/', description: '单线程与多线程测速脚本口径对比', intent: 'informational' },
          { title: '网络稳定性', slug: 'stability', href: '/network/stability/', description: '为什么单日测速截图不能代表全年稳定', intent: 'informational' },
        ],
      },
    ],
  },
  {
    id: 'guides',
    order: '08',
    title: '使用教程',
    href: '/guides/',
    system: 'guides',
    tagline: '从购买订阅、导入链接到分流规则与续费的实操文档',
    groups: [
      {
        label: '入门与核心配置',
        items: [
          { title: '机场订阅教程', slug: 'subscription-basics', href: '/guides/subscription-basics/', description: '订阅是什么以及全流程上手步骤', intent: 'informational' },
          { title: '订阅链接使用说明', slug: 'subscription-url', href: '/guides/subscription-url/', description: 'Base64、Clash YAML 与链接保密原则', intent: 'informational' },
          { title: '客户端安装', slug: 'client-install', href: '/guides/client-install/', description: '各平台安全下载与校验方法', intent: 'informational' },
          { title: 'Clash 配置知识', slug: 'clash-config', href: '/guides/clash-config/', description: 'Profile、Proxy Group 与策略组逻辑', intent: 'informational' },
          { title: '分流规则', slug: 'routing-rules', href: '/guides/routing-rules/', description: 'Rule、Global 与 Direct 模式实操区别', intent: 'informational' },
        ],
      },
      {
        label: '进阶设置与消费周期',
        items: [
          { title: 'TUN 模式', slug: 'tun-mode', href: '/guides/tun-mode/', description: '虚拟网卡接管系统全流量与终端代理', intent: 'informational' },
          { title: 'DNS 设置', slug: 'dns-settings', href: '/guides/dns-settings/', description: 'Fake-IP 与 Redir-Host 解析防泄漏', intent: 'informational' },
          { title: '订阅更新', slug: 'subscription-update', href: '/guides/subscription-update/', description: '定时拉取节点列表与订阅转换说明', intent: 'informational' },
          { title: '多设备使用', slug: 'multi-device-setup', href: '/guides/multi-device-setup/', description: '电脑、手机与路由器并发配额管理', intent: 'informational' },
          { title: '机场套餐购买指南', slug: 'subscription-selection', href: '/guides/subscription-selection/', description: '先月付试水还是直接年付的决策树', intent: 'commercial' },
          { title: '订阅续费指南', slug: 'renewal-guide', href: '/guides/renewal-guide/', description: '到期前评估是否值得续费的 5 项检查', intent: 'commercial' },
        ],
      },
    ],
  },
  {
    id: 'troubleshooting',
    order: '09',
    title: '故障排查',
    href: '/troubleshooting/',
    system: 'guides',
    tagline: '订阅失败、超时、DNS 异常与客户端报错逐项定位',
    groups: [
      {
        label: '订阅与连接异常',
        items: [
          { title: '节点超时', slug: 'node-timeout', href: '/troubleshooting/node-timeout/', description: '系统时间偏差、本地网络与入口失效排查', intent: 'informational' },
          { title: '全部节点不可用', slug: 'all-nodes-down', href: '/troubleshooting/all-nodes-down/', description: '流量耗尽、订阅过期与上游维护区分', intent: 'informational' },
          { title: '订阅失败', slug: 'subscription-failed', href: '/troubleshooting/subscription-failed/', description: '代理冲突或机场域名被阻断的处理', intent: 'informational' },
          { title: '订阅更新错误', slug: 'subscription-update-failed', href: '/troubleshooting/subscription-update-failed/', description: 'YAML 解析报错与 UA 拦截修复', intent: 'informational' },
          { title: '连接不上', slug: 'connection-failed', href: '/troubleshooting/connection-failed/', description: '系统代理端口占用与防火墙放行', intent: 'informational' },
        ],
      },
      {
        label: '环境、速度与兼容问题',
        items: [
          { title: 'DNS 错误', slug: 'dns-error', href: '/troubleshooting/dns-error/', description: 'Fake-IP 残留与局域网解析冲突修复', intent: 'informational' },
          { title: '客户端无法启动', slug: 'client-wont-start', href: '/troubleshooting/client-wont-start/', description: '权限不足、杀软误杀与端口冲突', intent: 'informational' },
          { title: 'TUN 模式异常', slug: 'tun-error', href: '/troubleshooting/tun-error/', description: '服务模式安装失败与虚拟网卡驱动冲突', intent: 'informational' },
          { title: '流量消耗异常', slug: 'abnormal-traffic', href: '/troubleshooting/abnormal-traffic/', description: '高倍率节点、后台同步与订阅泄漏核查', intent: 'informational' },
          { title: '网络速度慢', slug: 'slow-speed', href: '/troubleshooting/slow-speed/', description: '本地带宽瓶颈、运营商 QoS 与单线程限速', intent: 'informational' },
          { title: '客户端兼容性问题', slug: 'client-compatibility', href: '/troubleshooting/client-compatibility/', description: 'VLESS/AnyTLS 与老旧核心不兼容解决', intent: 'informational' },
        ],
      },
    ],
  },
  {
    id: 'risks',
    order: '10',
    title: '风险与替代',
    href: '/risks/',
    system: 'guides',
    tagline: '订阅消费风控、隐私合规提醒与品牌跑路应对预案',
    groups: [
      {
        label: '消费风险与避坑',
        items: [
          { title: '机场跑路', slug: 'exit-scam', href: '/risks/exit-scam/', description: '常见跑路前兆与止损操作步骤', intent: 'informational' },
          { title: '机场避坑', slug: 'pitfalls', href: '/risks/pitfalls/', description: '夸大专线、虚标不限速与假优惠识别', intent: 'informational' },
          { title: '机场替代', slug: 'alternatives', href: '/risks/alternatives/', description: '主用机场异常时的同价位替代方案库', intent: 'commercial' },
          { title: '机场退款', slug: 'refund-policy', href: '/risks/refund-policy/', description: '虚拟商品不支持退款条款与试错原则', intent: 'informational' },
          { title: '机场安全性', slug: 'security', href: '/risks/security/', description: '专属客户端权限、审计规则与账号隔离', intent: 'informational' },
        ],
      },
      {
        label: '套餐锁定与合规',
        items: [
          { title: '年付套餐风险', slug: 'annual-plan', href: '/risks/annual-plan/', description: '折算低价背后的资金锁定与变动风险', intent: 'informational' },
          { title: '不限时套餐风险', slug: 'no-expiry-plan', href: '/risks/no-expiry-plan/', description: '永久不过期的前提是服务商持续运营', intent: 'informational' },
          { title: '隐私与数据安全', slug: 'privacy', href: '/risks/privacy/', description: 'TLS 传输边界、浏览器安全与邮箱隔离', intent: 'informational' },
          { title: '免费服务风险', slug: 'free-service', href: '/risks/free-service/', description: '免费节点蜜罐与流量变现模式提醒', intent: 'informational' },
          { title: '品牌运营异常', slug: 'operational-issues', href: '/risks/operational-issues/', description: '工单失联、域名频繁更换与节点大面积超时', intent: 'informational' },
          { title: '机场选择检查清单', slug: 'selection-checklist', href: '/risks/selection-checklist/', description: '下单前必须核对的 10 项尽调清单', intent: 'informational' },
        ],
      },
    ],
  },
];
