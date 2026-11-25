import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_NAME, SITE_URL } from '../lib/seo';

export const GET: APIRoute = async () => {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  const compares = await getCollection('compare', ({ data }) => !data.draft);
  const troubles = await getCollection('troubleshooting', ({ data }) => !data.draft);
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  const items = [
    ...reviews.map((e) => ({ title: e.data.title, desc: e.data.description, date: e.data.updatedDate, url: `${SITE_URL}/reviews/${e.id.replace(/\.mdx?$/, '')}/` })),
    ...compares.map((e) => ({ title: e.data.title, desc: e.data.description, date: e.data.updatedDate, url: `${SITE_URL}/compare/${e.id.replace(/\.mdx?$/, '')}/` })),
    ...guides.map((e) => ({ title: e.data.title, desc: e.data.description, date: e.data.updatedDate, url: `${SITE_URL}/guides/${e.id.replace(/\.mdx?$/, '')}/` })),
    ...troubles.map((e) => ({ title: e.data.title, desc: e.data.description, date: e.data.updatedDate, url: `${SITE_URL}/troubleshooting/${e.id.replace(/\.mdx?$/, '')}/` })),
    ...articles.map((e) => ({ title: e.data.title, desc: e.data.description, date: e.data.updatedDate, url: `${SITE_URL}/articles/${e.id.replace(/\.mdx?$/, '')}/` })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}（Subscription Guide）</title>
    <link>${SITE_URL}/</link>
    <description>从订阅选择到日常使用，一站式网络订阅指南。</description>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .slice(0, 60)
      .map(
        (item) => `<item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description><![CDATA[${item.desc}]]></description>
    </item>`
      )
      .join('\n    ')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
