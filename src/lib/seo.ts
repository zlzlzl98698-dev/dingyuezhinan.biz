export const SITE_URL = 'https://dingyuezhinan.biz';
export const SITE_NAME = '订阅指南';
export const SITE_EN_NAME = 'Subscription Guide';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return new URL(normalized, SITE_URL).toString();
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_EN_NAME,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/avatars/brand-avatar.webp`,
    },
    description: '从订阅选择到日常使用，一站式网络订阅指南、机场评测数据库与客户端使用知识平台。',
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_EN_NAME,
    url: `${SITE_URL}/`,
    inLanguage: 'zh-CN',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function buildArticleSchema(opts: {
  title: string;
  description: string;
  url: string;
  pubDate: Date;
  updatedDate: Date;
  author: string;
  reviewedBy?: string;
  image?: string;
  aboutId?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: absoluteUrl(opts.url),
    datePublished: opts.pubDate.toISOString(),
    dateModified: opts.updatedDate.toISOString(),
    inLanguage: 'zh-CN',
    author: {
      '@type': 'Organization',
      name: opts.author,
      url: absoluteUrl('/editorial-policy/#editorial-team'),
    },
    ...(opts.reviewedBy
      ? {
          reviewedBy: {
            '@type': 'Organization',
            name: opts.reviewedBy,
            url: absoluteUrl('/editorial-policy/#editorial-team'),
          },
        }
      : {}),
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    ...(opts.aboutId ? { about: { '@id': `${SITE_URL}/#${opts.aboutId}` } } : {}),
  };
}

export function buildCollectionPageSchema(
  name: string,
  description: string,
  url: string,
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(url),
    inLanguage: 'zh-CN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: buildItemListSchema(name, url, items),
  };
}

export function buildItemListSchema(name: string, url: string, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: absoluteUrl(url),
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

export function buildSoftwareSchema(opts: {
  name: string;
  platforms: string[];
  url: string;
  description: string;
  isFree: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    operatingSystem: opts.platforms.join(', '),
    applicationCategory: 'UtilitiesApplication',
    url: absoluteUrl(opts.url),
    description: opts.description,
    ...(opts.isFree
      ? {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'CNY',
          },
        }
      : {}),
  };
}
