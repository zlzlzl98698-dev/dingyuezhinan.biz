import brands from '../data/brands.json';
import clients from '../data/clients.json';

export interface RelatedLink {
  title: string;
  href: string;
  category: string;
  description: string;
}

export function getBrandBySlug(slug: string) {
  return brands.find((b) => b.slug === slug);
}

export function getAllBrandsSorted() {
  return [...brands].sort((a, b) => a.priorityRank - b.priorityRank);
}

export function getPeerAlternatives(brandSlug: string, limit = 4): RelatedLink[] {
  const current = getBrandBySlug(brandSlug);
  if (!current) return [];

  return brands
    .filter((b) => b.slug !== brandSlug)
    .sort((a, b) => {
      // Prioritize featured peers with similar client mode or price tier
      const aScore =
        (a.tier === 'featured' ? 3 : 0) +
        (a.clientMode === current.clientMode ? 2 : 0) +
        (a.hasNoExpiryPlan === current.hasNoExpiryPlan ? 1 : 0);
      const bScore =
        (b.tier === 'featured' ? 3 : 0) +
        (b.clientMode === current.clientMode ? 2 : 0) +
        (b.hasNoExpiryPlan === current.hasNoExpiryPlan ? 1 : 0);
      if (bScore !== aScore) return bScore - aScore;
      return a.priorityRank - b.priorityRank;
    })
    .slice(0, limit)
    .map((b) => ({
      title: `${b.name} 深度评测`,
      href: b.reviewUrl,
      category: '品牌替代参考',
      description: b.fallbackEntryText || `${b.routeType}，点击核对套餐与测速档案`,
    }));
}

export function getDefaultCrossLinksForReview(brandSlug: string): RelatedLink[] {
  const brand = getBrandBySlug(brandSlug);
  const links: RelatedLink[] = [
    {
      title: '机场订阅套餐选择指南',
      href: '/guides/subscription-selection/',
      category: '购买决策',
      description: '下单前先确认月付试错、流量估算与客户端兼容条件',
    },
    {
      title: '机场流量与成本计算器',
      href: '/plans/traffic-calculator/',
      category: '交互工具',
      description: '按日常视频、AI 工具与同步设备数估算月度流量',
    },
    {
      title: '年付套餐与跑路风险核查清单',
      href: '/risks/annual-plan/',
      category: '风险控制',
      description: '折算低价年付前需核对的资金锁定与退订边界',
    },
  ];

  if (brand && ['third_party', 'dual'].includes(brand.clientMode)) {
    links.push({
      title: 'Clash Verge Rev 安装与配置教程',
      href: '/clients/clash-verge-rev/',
      category: '客户端指南',
      description: '支持第三方订阅的桌面端导入与 TUN 模式设置说明',
    });
  } else if (brand && brand.clientMode === 'proprietary') {
    links.push({
      title: '专属客户端与第三方客户端对比',
      href: '/clients/proprietary-vs-third-party/',
      category: '客户端对比',
      description: '了解不提供订阅链接时对软路由与多端分流的影响',
    });
  }

  if (brandSlug === 'guangsuyun') {
    links.unshift(
      {
        title: '光速云 vs 飞猫云全面对比',
        href: '/compare/guangsuyun-vs-feimao/',
        category: '品牌横评',
        description: '从客户端形态、套餐跨度与实测快照对比两款热门品牌',
      },
      {
        title: '光速云 147 元永久套餐成本拆解',
        href: '/guides/guangsuyun-147-permanent-plan-cost/',
        category: '套餐拆解',
        description: '按 247GB 不限时计算单 GB 成本与适用周期',
      }
    );
  }

  return links.slice(0, 6);
}

export function getClientLinksForBrand(brandSlug: string) {
  const b = getBrandBySlug(brandSlug);
  if (!b) return [];
  if (b.clientMode === 'proprietary') return [];
  return clients.slice(0, 6).map((c) => ({
    name: c.name,
    href: `/clients/${c.slug}/`,
    platforms: c.platforms.join(' / '),
  }));
}
