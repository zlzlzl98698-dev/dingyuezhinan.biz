import type { APIRoute } from 'astro';
import brands from '../data/brands.json';
import { PILLAR_NAV, SITE_INFO } from '../data/navigation';

export const GET: APIRoute = async () => {
  const lines = [
    `# ${SITE_INFO.name} (${SITE_INFO.enName})`,
    `> ${SITE_INFO.slogan}`,
    '',
    `Website: ${SITE_INFO.domain}/`,
    `Language: zh-CN`,
    `Data Policy: ${SITE_INFO.domain}/editorial-policy/`,
    '',
    '## Core Pillars',
    ...PILLAR_NAV.map((p) => `- [${p.title}](${SITE_INFO.domain}${p.href}): ${p.tagline}`),
    '',
    '## Flagship & Brand Database (31 Unique Brands)',
    ...brands.map(
      (b) =>
        `- [${b.name} (${b.enName})](${SITE_INFO.domain}${b.reviewUrl}): ${b.routeType}; status=${b.dataStatus}; plans=${b.planCount}`
    ),
    '',
    '## Decision Tools',
    `- [机场流量需求计算器](${SITE_INFO.domain}/plans/traffic-calculator/)`,
    `- [订阅费用与单GB对比工具](${SITE_INFO.domain}/plans/cost-comparison/)`,
    `- [客户端兼容性查询](${SITE_INFO.domain}/clients/)`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
