import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息';
const DATA_DIR = path.join(ROOT, 'src', 'data');
const LOGOS_DIR = path.join(ROOT, 'public', 'images', 'logos');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(LOGOS_DIR, { recursive: true });

const brandListRaw = fs.readFileSync(path.join(SRC_DIR, '32家机场品牌清单.txt'), 'utf8');
const speedManifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'public', 'images', 'speedtests', 'speedtest-manifest.json'), 'utf8')
);

// Canonical 31 brands in commercial priority order (first 11 featured, 12-28 regular, 29-31 appended historical)
const BRAND_META = [
  { id: 'brand-guangsuyun', slug: 'guangsuyun', name: '光速云', enName: 'LightSpeed Cloud', aliases: ['光速云机场', 'LightSpeed'], tier: 'featured', priorityRank: 1, accentColor: '#0E7490', logoFile: '光速云主图.png', foundedYear: '2020', paymentMethods: ['支付宝', '微信', 'USDT'] },
  { id: 'brand-muguang', slug: 'muguang', name: '暮光加速', enName: 'Twilight', aliases: ['暮光网络', 'muguang'], tier: 'featured', priorityRank: 2, accentColor: '#4338CA', logoFile: null, foundedYear: '2023', paymentMethods: [] },
  { id: 'brand-feimao', slug: 'feimao', name: '飞猫云', enName: 'FlyCat Cloud', aliases: ['飞猫', 'feimao'], tier: 'featured', priorityRank: 3, accentColor: '#D97706', logoFile: '飞猫云主图.png', foundedYear: '2023', paymentMethods: [] },
  { id: 'brand-weifeng', slug: 'weifeng', name: '微风网络', enName: 'Breezenet', aliases: ['微风', 'weifeng'], tier: 'featured', priorityRank: 4, accentColor: '#0D9488', logoFile: null, foundedYear: '2023', paymentMethods: [] },
  { id: 'brand-dalaoyun', slug: 'dalaoyun', name: '大佬云', enName: 'Dalaoyun', aliases: ['dalaoyun'], tier: 'featured', priorityRank: 5, accentColor: '#1D4ED8', logoFile: null, foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-xingdaomeng', slug: 'xingdaomeng', name: '星岛梦', enName: 'StarDream', aliases: ['xingdaomeng'], tier: 'featured', priorityRank: 6, accentColor: '#0284C7', logoFile: 'xdm_logo.webp', foundedYear: '2020', paymentMethods: [] },
  { id: 'brand-yinxingren', slug: 'yinxingren', name: '隐形人', enName: 'Invisible', aliases: ['yinxingren'], tier: 'featured', priorityRank: 7, accentColor: '#334155', logoFile: '隐形人256x256.png', foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-ermao', slug: 'ermao', name: '二猫云', enName: '2mao Cloud', aliases: ['2mao', 'ermao'], tier: 'featured', priorityRank: 8, accentColor: '#EA580C', logoFile: '2mao_logo.webp', foundedYear: '2023', paymentMethods: [] },
  { id: 'brand-wuyou', slug: 'wuyou', name: '无忧链接', enName: 'WorryFree', aliases: ['无忧', 'wuyou'], tier: 'featured', priorityRank: 9, accentColor: '#059669', logoFile: null, foundedYear: '2025', paymentMethods: [] },
  { id: 'brand-weitu', slug: 'weitu', name: '唯兔云', enName: 'V2Yun', aliases: ['V2云', 'weitu'], tier: 'featured', priorityRank: 10, accentColor: '#0369A1', logoFile: 'v2云主图.png', foundedYear: '2023', paymentMethods: [] },
  { id: 'brand-firefly', slug: 'firefly', name: 'Firefly', enName: 'Firefly', aliases: ['Firefly 萤火虫', '萤火虫', '飞为', 'firefly'], tier: 'featured', priorityRank: 11, accentColor: '#CA8A04', logoFile: null, foundedYear: null, paymentMethods: ['支付宝', 'USDT（历史资料标注无微信）'] },
  { id: 'brand-yuzhou', slug: 'yuzhou', name: '宇宙云', enName: 'YuZhou Cloud', aliases: ['yuzhou'], tier: 'regular', priorityRank: 12, accentColor: '#1E40AF', logoFile: 'yuzhou_logo.webp', foundedYear: null, paymentMethods: [] },
  { id: 'brand-u1s1', slug: 'u1s1', name: 'U1S1', enName: 'U1S1', aliases: ['有一说一', 'u1s1'], tier: 'regular', priorityRank: 13, accentColor: '#0F766E', logoFile: 'u1s1主图.png', foundedYear: '2025', paymentMethods: [] },
  { id: 'brand-lingmao', slug: 'lingmao', name: '灵猫网络', enName: 'CivetNet', aliases: ['灵猫', 'lingmao'], tier: 'regular', priorityRank: 14, accentColor: '#B45309', logoFile: null, foundedYear: '2025', paymentMethods: [] },
  { id: 'brand-jilian', slug: 'jilian', name: '极连云', enName: 'Jilian Cloud', aliases: ['jilian'], tier: 'regular', priorityRank: 15, accentColor: '#047857', logoFile: '极连云主图.png', foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-guangnian', slug: 'guangnian', name: '光年梯', enName: 'LightYear', aliases: ['guangnian'], tier: 'regular', priorityRank: 16, accentColor: '#0369A1', logoFile: '光年梯主图.png', foundedYear: '2025', paymentMethods: [] },
  { id: 'brand-yifan', slug: 'yifan', name: '一翻云', enName: '1Fly Cloud', aliases: ['yifan', '1fly'], tier: 'regular', priorityRank: 17, accentColor: '#2563EB', logoFile: '1fly_logo.webp', foundedYear: '2025', paymentMethods: [] },
  { id: 'brand-sogo', slug: 'sogo', name: 'SOGO云', enName: 'SOGO Cloud', aliases: ['Sogo云', 'sogo'], tier: 'regular', priorityRank: 18, accentColor: '#0E7490', logoFile: 'sogo.webp', foundedYear: '2026', paymentMethods: [] },
  { id: 'brand-kexin', slug: 'kexin', name: '可信云', enName: 'Kosing Cloud', aliases: ['kexin'], tier: 'regular', priorityRank: 19, accentColor: '#0D9488', logoFile: null, foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-sujie', slug: 'sujie', name: '速界', enName: 'SpeedWorld', aliases: ['sujie'], tier: 'regular', priorityRank: 20, accentColor: '#0284C7', logoFile: 'sujie_logo.webp', foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-shanyue', slug: 'shanyue', name: '闪跃', enName: 'FlashLeap', aliases: ['shanyue'], tier: 'regular', priorityRank: 21, accentColor: '#D97706', logoFile: null, foundedYear: null, paymentMethods: [] },
  { id: 'brand-quanqiu', slug: 'quanqiu', name: '全球云', enName: 'GlobalCloud', aliases: ['quanqiu'], tier: 'regular', priorityRank: 22, accentColor: '#1D4ED8', logoFile: '全球云主图.png', foundedYear: '2026', paymentMethods: [] },
  { id: 'brand-shandianshu', slug: 'shandianshu', name: '闪电鼠', enName: 'FlashMouse', aliases: ['shandianshu'], tier: 'regular', priorityRank: 23, accentColor: '#CA8A04', logoFile: null, foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-yunjiexian', slug: 'yunjiexian', name: '云界线', enName: 'CloudLine', aliases: ['yunjiexian'], tier: 'regular', priorityRank: 24, accentColor: '#475569', logoFile: null, foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-liulianyun', slug: 'liulianyun', name: '榴莲云', enName: 'DurianCloud', aliases: ['liulianyun'], tier: 'regular', priorityRank: 25, accentColor: '#65A30D', logoFile: null, foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-shenxing', slug: 'shenxing', name: '神行加速', enName: 'Shenxing', aliases: ['shenxing'], tier: 'regular', priorityRank: 26, accentColor: '#0F766E', logoFile: null, foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-huanqiuti', slug: 'huanqiuti', name: '环球梯', enName: 'GlobalLadder', aliases: ['huanqiuti'], tier: 'regular', priorityRank: 27, accentColor: '#1E3A8A', logoFile: null, foundedYear: '2024', paymentMethods: [] },
  { id: 'brand-tiziyun', slug: 'tiziyun', name: '梯子云', enName: 'LadderCloud', aliases: ['tiziyun'], tier: 'regular', priorityRank: 28, accentColor: '#0891B2', logoFile: '梯子云256x256.png', foundedYear: '2025', paymentMethods: [] },
  { id: 'brand-lingdong', slug: 'lingdong', name: '灵动云', enName: 'Lingdong Cloud', aliases: ['lingdong'], tier: 'appended_historical', priorityRank: 29, accentColor: '#0284C7', logoFile: '灵动云256x256.png', foundedYear: '2025', paymentMethods: ['支付宝', 'USDT（微信需客服，历史资料）'] },
  { id: 'brand-langwang', slug: 'langwang', name: '浪网', enName: 'WaveNet', aliases: ['langwang'], tier: 'appended_historical', priorityRank: 30, accentColor: '#334155', logoFile: null, foundedYear: null, paymentMethods: [] },
  { id: 'brand-edgenova', slug: 'edgenova', name: '边缘节点 EdgeNova', enName: 'EdgeNova', aliases: ['边缘节点', 'EdgeNova', 'edgenova'], tier: 'appended_historical', priorityRank: 31, accentColor: '#0E7490', logoFile: 'edgenova_logo.webp', foundedYear: null, paymentMethods: ['支付宝', '微信', 'USDT（历史资料）'] },
];

// Generate crisp SVG monogram badges for brands without bitmap logos
for (const b of BRAND_META) {
  if (!b.logoFile) {
    const svgName = `brand-${b.slug}.svg`;
    const initials = b.enName
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect width="128" height="128" rx="24" fill="${b.accentColor}" fill-opacity="0.12"/>
  <rect x="6" y="6" width="116" height="116" rx="20" fill="#0B1324" stroke="${b.accentColor}" stroke-width="4"/>
  <text x="64" y="72" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, sans-serif" font-size="38" font-weight="700" fill="#F8FAFC">${initials}</text>
</svg>\n`;
    fs.writeFileSync(path.join(LOGOS_DIR, svgName), svg, 'utf8');
    b.logoPath = `/images/logos/${svgName}`;
  } else {
    b.logoPath = `/images/logos/${b.logoFile}`;
  }
}

// Parse sections from 32家机场品牌清单.txt
const lines = brandListRaw.split(/\r?\n/);

function extractBlock(startLineIdx, endLineIdx) {
  return lines.slice(startLineIdx, endLineIdx).join('\n');
}

// Locate section boundaries precisely
const markers = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (/^(主推)?##\s+\d+\./.test(line)) {
    markers.push({ idx: i, header: line });
  } else if (line === '灵动云' || line === '浪网' || line === '边缘节点 EdgeNova' || line === 'Firefly 萤火虫') {
    markers.push({ idx: i, header: line });
  } else if (line.startsWith('## 完整数据表')) {
    markers.push({ idx: i, header: line });
  } else if (line.startsWith('## 合规提醒') && i > 1180) {
    markers.push({ idx: i, header: line });
  }
}

function matchSlugFromHeader(header) {
  if (header.includes('光速云')) return 'guangsuyun';
  if (header.includes('暮光加速')) return 'muguang';
  if (header.includes('飞猫云')) return 'feimao';
  if (header.includes('微风网络')) return 'weifeng';
  if (header.includes('大佬云')) return 'dalaoyun';
  if (header.includes('星岛梦')) return 'xingdaomeng';
  if (header.includes('二猫云')) return 'ermao';
  if (header.includes('无忧链接')) return 'wuyou';
  if (header.includes('唯兔云')) return 'weitu';
  if (header === 'Firefly 萤火虫') return 'firefly_extra';
  if (header.includes('Firefly')) return 'firefly';
  if (header.includes('宇宙云')) return 'yuzhou';
  if (header.includes('U1S1')) return 'u1s1';
  if (header.includes('灵猫网络')) return 'lingmao';
  if (header.includes('极连云')) return 'jilian';
  if (header.includes('光年梯')) return 'guangnian';
  if (header.includes('一翻云')) return 'yifan';
  if (header.includes('SOGO')) return 'sogo';
  if (header.includes('可信云')) return 'kexin';
  if (header.includes('速界')) return 'sujie';
  if (header.includes('闪跃')) return 'shanyue';
  if (header.includes('全球云')) return 'quanqiu';
  if (header.includes('闪电鼠')) return 'shandianshu';
  if (header.includes('云界线')) return 'yunjiexian';
  if (header.includes('榴莲云')) return 'liulianyun';
  if (header.includes('神行加速')) return 'shenxing';
  if (header.includes('环球梯')) return 'huanqiuti';
  if (header.includes('隐形人')) return 'yinxingren';
  if (header.includes('梯子云')) return 'tiziyun';
  if (header === '灵动云') return 'lingdong';
  if (header === '浪网') return 'langwang';
  if (header === '边缘节点 EdgeNova') return 'edgenova';
  return null;
}

const sectionMap = {};
for (let m = 0; m < markers.length; m++) {
  const key = matchSlugFromHeader(markers[m].header);
  if (!key) continue;
  const endIdx = m + 1 < markers.length ? markers[m + 1].idx : lines.length;
  sectionMap[key] = extractBlock(markers[m].idx, endIdx);
}

// Parse summary table (lines 920-950)
const summaryTable = {};
for (const line of lines) {
  if (line.startsWith('|') && !line.startsWith('| #') && !line.startsWith('|---')) {
    const cols = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cols.length >= 5 && /^\d+$/.test(cols[0])) {
      const name = cols[1];
      const url = cols[2].replace(/`/g, '');
      const coupon = cols[3].replace(/`/g, '');
      const usp = cols[4];
      summaryTable[name] = { rankInTable: Number(cols[0]), url, coupon, usp };
    }
  }
}

function parsePlanPrice(str) {
  const m = str.match(/[\d.]+/);
  return m ? Number(m[0]) : null;
}

function parseTrafficGB(str) {
  if (!str || str.includes('遮挡') || str === '—') return null;
  if (/[\d.]+TB|[\d.]+T/i.test(str)) {
    const m = str.match(/([\d.]+)\s*T/i);
    return m ? Math.round(Number(m[1]) * 1000) : null;
  }
  const m = str.match(/([\d.]+)\s*G/i);
  return m ? Number(m[1]) : null;
}

function parseBillingCycle(cycleText) {
  if (cycleText.includes('一次性')) return 'one-time';
  if (cycleText.includes('三年')) return 'triennial';
  if (cycleText.includes('两年')) return 'biennial';
  if (cycleText.includes('年')) return 'annual';
  if (cycleText.includes('半年')) return 'semiannual';
  if (cycleText.includes('季')) return 'quarterly';
  if (cycleText.includes('月')) return 'monthly';
  return 'unverified';
}

function normalizeMonthlyPrice(price, cycle) {
  if (price === null) return null;
  switch (cycle) {
    case 'monthly': return Number(price.toFixed(2));
    case 'quarterly': return Number((price / 3).toFixed(2));
    case 'semiannual': return Number((price / 6).toFixed(2));
    case 'annual': return Number((price / 12).toFixed(2));
    case 'biennial': return Number((price / 24).toFixed(2));
    case 'triennial': return Number((price / 36).toFixed(2));
    default: return null;
  }
}

function parseSectionData(block, slug) {
  if (!block) return { plans: [], speed20261019: [], unlock: null, regUrl: null, coupons: [], summaryLines: [], intro: null };
  const sLines = block.split(/\r?\n/);

  let regUrl = null;
  const regMatch = block.match(/\*\*注册链接\*\*：`([^`]+)`/) || block.match(/品牌入口[^：]*：\s*(https?:\/\/\S+)/);
  if (regMatch) regUrl = regMatch[1].trim();

  // Parse plans table
  const plans = [];
  let inPlans = false;
  for (const l of sLines) {
    if (l.startsWith('套餐名称\t') || l.startsWith('套餐名\t')) {
      inPlans = true;
      continue;
    }
    if (inPlans) {
      if (!l.trim() || !l.includes('\t')) {
        if (plans.length > 0 || l.trim() === '') inPlans = false;
        continue;
      }
      const cols = l.split('\t').map((c) => c.trim());
      if (cols.length >= 4) {
        const planName = cols[0];
        const cycleRaw = cols[1];
        const priceRaw = cols[2];
        const trafficRaw = cols[3];
        const periodRaw = cols[4] || (trafficRaw.includes('不过期') ? '一次性' : '每月');
        if (planName === '待补充') continue;
        const priceCny = parsePlanPrice(priceRaw);
        const trafficGb = parseTrafficGB(trafficRaw);
        const cycle = parseBillingCycle(cycleRaw);
        const effectiveMonthlyCny = normalizeMonthlyPrice(priceCny, cycle);
        let costPerGbCny = null;
        if (priceCny && trafficGb) {
          if (cycle === 'one-time') {
            costPerGbCny = Number((priceCny / trafficGb).toFixed(3));
          } else if (effectiveMonthlyCny) {
            costPerGbCny = Number((effectiveMonthlyCny / trafficGb).toFixed(3));
          }
        }
        plans.push({
          brandSlug: slug,
          planName,
          billingCycleLabel: cycleRaw,
          billingCycle: cycle,
          priceRaw,
          priceCny,
          trafficRaw,
          trafficGb,
          trafficPeriod: periodRaw,
          effectiveMonthlyCny,
          costPerGbCny,
          isNoExpiry: cycle === 'one-time',
          isCustom: planName.includes('定制'),
          dataStatus: trafficRaw.includes('遮挡') ? 'unverified' : slug === 'lingdong' || slug === 'langwang' || slug === 'edgenova' || slug === 'firefly_extra' ? 'historical' : 'vendor',
        });
      }
    }
  }

  // Parse 2026-10-19 speed table
  const speed20261019 = [];
  let inSpeed = false;
  for (const l of sLines) {
    if (l.startsWith('节点\t延迟\t下载')) {
      inSpeed = true;
      continue;
    }
    if (inSpeed) {
      if (!l.trim() || !l.includes('\t')) {
        inSpeed = false;
        continue;
      }
      const cols = l.split('\t').map((c) => c.trim());
      if (cols.length >= 3 && cols[1] !== '—' && !cols[0].includes('暂无')) {
        const latencyMs = parsePlanPrice(cols[1]);
        const speedMbps = parsePlanPrice(cols[2]);
        speed20261019.push({
          region: cols[0],
          latencyRaw: cols[1],
          latencyMs,
          downloadRaw: cols[2],
          downloadMbps: speedMbps,
        });
      }
    }
  }

  // Parse unlock
  const supportLine = sLines.find((l) => l.startsWith('- 支持：'));
  const nodeLine = sLines.find((l) => l.startsWith('- 视节点而定：'));
  const introLine = sLines.find((l) => l.startsWith('介绍说明：'));
  const features = [];
  let inFeat = false;
  for (const l of sLines) {
    if (l.trim() === '核心特色' || l.startsWith('**品牌资料明确说了的**')) {
      inFeat = true;
      continue;
    }
    if (inFeat) {
      if (l.startsWith('- ')) features.push(l.slice(2).trim());
      else if (l.trim() && !l.startsWith('- ')) inFeat = false;
    }
  }

  return {
    regUrl,
    plans,
    speed20261019,
    unlockSupported: supportLine ? supportLine.replace('- 支持：', '').split('、').map((s) => s.trim()).filter((s) => s !== '待核实') : [],
    unlockConditional: nodeLine ? nodeLine.replace('- 视节点而定：', '').split('、').map((s) => s.trim()).filter((s) => s !== '待核实') : [],
    intro: introLine ? introLine.replace('介绍说明：', '').trim() : null,
    features,
  };
}

// Explicit audited conflict & protocol & client capability matrix
const AUDIT_DETAILS = {
  guangsuyun: {
    routeType: 'IEPL专线 / IPLC / 隧道中转（不同来源描述并存）',
    protocols: ['VLESS', 'Shadowsocks', 'AnyTLS'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅（Clash / Shadowrocket）',
    deviceLimit: '不限设备（多档套餐标注）',
    coupons: [{ code: 'AMM', discount: '新人优惠券（具体额度以结算页为准）', status: 'vendor' }],
    conflicts: ['轻量版月流量在《光速云品牌信息》顶部写 59GB，正文及总表写 69GB/月（¥99/年）', '《光速云品牌信息》列 4 档套餐，总清单列 7 档套餐', '协议在文档标 VLESS，08-11 截图显示 Shadowsocks，08-19 截图同时包含 62 节点 Shadowsocks 与 70 节点 Vless+AnyTLS'],
    dataStatus: 'measured',
  },
  muguang: {
    routeType: 'BGP 智能调度 + 专线级出口',
    protocols: ['未明确标注（待核实）'],
    clientMode: 'unverified',
    clientModeLabel: '覆盖全平台，具体订阅方式待核实',
    deviceLimit: '多设备同时在线（具体上限待核实）',
    coupons: [{ code: 'muguang5555', discount: '优惠额度未标注（介绍正文同时称未查到公开优惠码）', status: 'conflicting' }],
    conflicts: ['基础数据与总表有优惠码 muguang5555，介绍正文称未查到公开优惠码', '月付起步 ¥20/120GB，年付轻量版 ¥109/年（折合约 ¥9.08/月）'],
    dataStatus: 'vendor',
  },
  feimao: {
    routeType: '亚太及欧美优化线路（非主打顶级专线）',
    protocols: ['Shadowsocks（08-11 测速截图显示）'],
    clientMode: 'proprietary',
    clientModeLabel: '专属客户端下载登录即用（不配第三方订阅）',
    deviceLimit: '待核实',
    coupons: [{ code: 'flycat888', discount: '8折（总表标注）', status: 'vendor' }],
    conflicts: [],
    dataStatus: 'measured',
  },
  weifeng: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS（文案）', 'Shadowsocks（08-11 测速图）'],
    clientMode: 'unverified',
    clientModeLabel: '待核实（兼容主流桌面与移动平台）',
    deviceLimit: '待核实',
    coupons: [{ code: 'flat888', discount: '9折（总表标注）', status: 'vendor' }],
    conflicts: ['基础数据与总表写“年付约7元/月 50GB”，套餐表最低为“清风 ¥137/年 100GB/月”（折合约 ¥11.42/月）', '文案标 VLESS，08-11 测速图显示 Shadowsocks'],
    dataStatus: 'measured',
  },
  dalaoyun: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    deviceLimit: '待核实',
    coupons: [{ code: 'dly888', discount: '季付及以上 7 折（品牌资料）', status: 'vendor' }],
    conflicts: ['与闪电鼠、云界线、榴莲云、环球梯基础规格高度重合，目前资料无独立差异点'],
    dataStatus: 'vendor',
  },
  xingdaomeng: {
    routeType: 'IEPL 专线',
    protocols: ['Trojan（文案）', 'Shadowsocks（08-11 测速图）'],
    clientMode: 'third_party',
    clientModeLabel: '通用订阅（1倍流量，不限设备）',
    deviceLimit: '不限设备',
    coupons: [{ code: 'nmw888', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: ['介绍正文标 Trojan，08-11 测速截图协议为 Shadowsocks'],
    dataStatus: 'measured',
  },
  yinxingren: {
    routeType: '企业级 IPLC 专线直连',
    protocols: ['未标注'],
    clientMode: 'proprietary',
    clientModeLabel: '自带专属客户端（明确不提供第三方订阅链接）',
    deviceLimit: '以套餐而定',
    coupons: [
      { code: 'yxr888', discount: '总表记录（未标折扣）', status: 'conflicting' },
      { code: 'moon80', discount: '8折（正文记录）', status: 'conflicting' },
    ],
    conflicts: ['优惠码同时存在 yxr888 与 moon80 两条记录', '基础数据写 24元/月 100GB，套餐表白银纪元为 ¥24/月 144GB'],
    dataStatus: 'vendor',
  },
  ermao: {
    routeType: '全线 IEPL 专线',
    protocols: ['VLESS（文案）', 'Shadowsocks（08-11 测速图）'],
    clientMode: 'proprietary_plus',
    clientModeLabel: '独家定制客户端（第三方订阅兼容性待核实）',
    deviceLimit: '不限设备连接数',
    coupons: [{ code: 'ermao5555', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: ['2026-10-19 测速表含新加坡节点，但介绍正文称“少了新加坡这一站”', '文案标 VLESS，08-11 测速截图显示 Shadowsocks'],
    dataStatus: 'measured',
  },
  wuyou: {
    routeType: '跨境电商/轻度优化线路',
    protocols: ['未标注'],
    clientMode: 'conflicting',
    clientModeLabel: '正文称 2026-10 起用专属客户端，总表称“订阅无需转换”',
    deviceLimit: '不限设备数量',
    coupons: [{ code: 'wuyou666', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: ['订阅方式存在“专属客户端登录即用”与总表“订阅无需转换”口径冲突'],
    dataStatus: 'conflicting',
  },
  weitu: {
    routeType: 'IPLC 专线（总表另注三网优化+智能负载均衡）',
    protocols: ['Trojan（文案）', 'Shadowsocks（08-11 测速图）'],
    clientMode: 'third_party',
    clientModeLabel: '支持通用第三方客户端（1倍流量，不限设备）',
    deviceLimit: '不限设备连接',
    coupons: [{ code: 'weitu666', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: ['介绍写 Trojan，08-11 测速截图显示 Shadowsocks'],
    dataStatus: 'measured',
  },
  firefly: {
    routeType: 'IPLC 专线（原生 IP）',
    protocols: ['VLESS'],
    clientMode: 'proprietary',
    clientModeLabel: '专属客户端下载登录即用（不提供订阅链接）',
    deviceLimit: '不限客户端及设备数量',
    coupons: [{ code: 'firefly', discount: '新用户 8 折（年付版不适用）', status: 'vendor' }],
    conflicts: ['清单第 8 条与文末《Firefly 萤火虫》存在两套推广码（2n7VURre 与 jTp9wSgZ）及不同周期展开，已合并为同一品牌实体'],
    dataStatus: 'vendor',
  },
  yuzhou: {
    routeType: 'IEPL + 三网优化（早期及总表资料）',
    protocols: ['VLESS'],
    clientMode: 'conflicting',
    clientModeLabel: '正文标注待核实，总表标注自研客户端',
    deviceLimit: '待核实',
    coupons: [{ code: 'YUZHOU553', discount: '历史资料称新用户 8 折', status: 'historical' }],
    conflicts: ['正文称套餐、节点与测速均待核实，但总表标明 IEPL+VLESS+自研客户端，且 08-11 压缩包内含 VLESS 测速截图'],
    dataStatus: 'unverified',
  },
  u1s1: {
    routeType: 'IPLC 专线',
    protocols: ['Shadowsocks（08-11 测速图）'],
    clientMode: 'unverified',
    clientModeLabel: '待核实',
    deviceLimit: '不限设备同时连接',
    coupons: [{ code: 'akaka', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: ['介绍正文提及 1000GB 一次性大流量包，但套餐价格表中未列出该档位'],
    dataStatus: 'measured',
  },
  lingmao: {
    routeType: '中转优化线路',
    protocols: ['Shadowsocks（08-11 测速图，正文未标注）'],
    clientMode: 'proprietary',
    clientModeLabel: '专属客户端下载登录即用（不提供订阅链接）',
    deviceLimit: '不限设备使用',
    coupons: [
      { code: 'lmao888', discount: '基础数据与总表记录', status: 'conflicting' },
      { code: 'lingmao', discount: '8折（年付小包不适用）', status: 'conflicting' },
    ],
    conflicts: ['优惠码同时存在 lmao888 与 lingmao', '基础数据写 19元/月 150GB，套餐表月付 Small 为 ¥25 150GB'],
    dataStatus: 'measured',
  },
  jilian: {
    routeType: 'IEPL 专线',
    protocols: ['未标注（08-11 测速图显示 Shadowsocks）'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 支持第三方客户端',
    deviceLimit: '待核实',
    coupons: [{ code: 'ji8888', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: [],
    dataStatus: 'measured',
  },
  guangnian: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS（文案）', 'Shadowsocks（08-11 测速图）'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    deviceLimit: '待核实',
    coupons: [{ code: 'gnt6666', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: ['文案标 VLESS，08-11 测速截图显示 Shadowsocks'],
    dataStatus: 'measured',
  },
  yifan: {
    routeType: '全节点 IEPL 物理专线 + 原生住宅 IP（品牌资料）',
    protocols: ['Hysteria 2', 'VLESS-Reality', 'Shadowsocks'],
    clientMode: 'third_party',
    clientModeLabel: '宽松兼容第三方客户端（多协议可选）',
    deviceLimit: '不限设备数量',
    coupons: [
      { code: 'yfy6666', discount: '基础数据与总表记录', status: 'conflicting' },
      { code: '1FLYYUN', discount: '9折（介绍正文记录）', status: 'conflicting' },
    ],
    conflicts: ['优惠码存在 yfy6666 与 1FLYYUN（9折）两套记录'],
    dataStatus: 'measured',
  },
  sogo: {
    routeType: '全线 IEPL 专线 + 三网 BGP 优化',
    protocols: ['VLESS（文案）', 'Shadowsocks（08-11 测速图）'],
    clientMode: 'proprietary',
    clientModeLabel: '仅自研专属客户端（不提供 Clash/Shadowrocket 订阅链接）',
    deviceLimit: '不限设备数量',
    coupons: [
      { code: 'SOGO10000', discount: '9折（正文记录）', status: 'conflicting' },
      { code: 'sss777', discount: '总表记录', status: 'conflicting' },
    ],
    conflicts: ['优惠码存在 SOGO10000（9折）与 sss777 两套记录', '文案标 VLESS，08-11 测速截图显示 Shadowsocks'],
    dataStatus: 'measured',
  },
  kexin: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS（文案）', 'Shadowsocks（08-11 测速图）'],
    clientMode: 'third_party',
    clientModeLabel: '支持第三方客户端',
    deviceLimit: '待核实',
    coupons: [{ code: 'kkk333', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: ['文案标 VLESS，08-11 测速截图显示 Shadowsocks；品牌资料主动声明 AI 与流媒体缺乏统一实测数据'],
    dataStatus: 'measured',
  },
  sujie: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS（文案）', 'Shadowsocks（08-11 测速图）'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    deviceLimit: '待核实',
    coupons: [{ code: 'sss1111', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: ['文案标 VLESS，08-11 测速截图显示 Shadowsocks'],
    dataStatus: 'measured',
  },
  shanyue: {
    routeType: 'IPLC 纯专线（骨干网接入）',
    protocols: ['未标注'],
    clientMode: 'proprietary',
    clientModeLabel: '专属客户端下载登录即用（不提供订阅链接）',
    deviceLimit: '待核实',
    coupons: [{ code: 'shanyue', discount: '8折（仅限闪动/飞跃/瞬移/跃迁，年付不适用）', status: 'vendor' }],
    conflicts: [],
    dataStatus: 'vendor',
  },
  quanqiu: {
    routeType: 'IPLC / IEPL 专线中转 + BGP 智能优化',
    protocols: ['Trojan', 'Shadowsocks'],
    clientMode: 'proprietary',
    clientModeLabel: '专属客户端下载登录即用（不提供订阅链接）',
    deviceLimit: '待核实',
    coupons: [
      { code: 'qq88', discount: '8折（基础信息记录）', status: 'conflicting' },
      { code: 'qqy7777', discount: '总表记录', status: 'conflicting' },
    ],
    conflicts: ['优惠码存在 qq88（8折）与 qqy7777 两套记录', '基础信息写起步 ¥20/月，套餐表含年付轻量版 ¥99/年 59GB/月'],
    dataStatus: 'measured',
  },
  shandianshu: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    deviceLimit: '待核实',
    coupons: [{ code: 'sd88', discount: '季付及以上 7 折', status: 'vendor' }],
    conflicts: ['与大佬云、云界线、榴莲云、环球梯基础规格几乎完全一致'],
    dataStatus: 'vendor',
  },
  yunjiexian: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    deviceLimit: '待核实',
    coupons: [{ code: 'yjx888', discount: '季付及以上 7 折', status: 'vendor' }],
    conflicts: ['注册链接存在 code=aycnwNUi 与总表 code=HBaZ91c6 两个版本', '推广链接缺少 SPA hash 符号 #，打开前需核验'],
    dataStatus: 'conflicting',
    urlFormatWarning: true,
  },
  liulianyun: {
    routeType: 'IEPL 专线',
    protocols: ['未统一提供'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    deviceLimit: '待核实',
    coupons: [{ code: 'll88', discount: '季付及以上 7 折', status: 'vendor' }],
    conflicts: ['协议类型未明确；其余基础规格与大佬云、闪电鼠等 5.6 元档一致'],
    dataStatus: 'vendor',
  },
  shenxing: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    deviceLimit: '待核实',
    coupons: [{ code: 'xs0077', discount: '新用户 7 折', status: 'vendor' }],
    conflicts: [],
    dataStatus: 'vendor',
  },
  huanqiuti: {
    routeType: 'IEPL 专线',
    protocols: ['VLESS'],
    clientMode: 'dual',
    clientModeLabel: '自研客户端 + 第三方订阅导入',
    deviceLimit: '待核实',
    coupons: [{ code: 'HQ66', discount: '季付及以上 7 折', status: 'vendor' }],
    conflicts: ['推广链接缺少 SPA hash 符号 #，与标准链接结构不同'],
    dataStatus: 'conflicting',
    urlFormatWarning: true,
  },
  tiziyun: {
    routeType: 'IEPL 专线（2Gbps+ 独立带宽含 500Mbps 高峰冗余，品牌资料）',
    protocols: ['VLESS'],
    clientMode: 'dual',
    clientModeLabel: '自研全平台客户端（一键登录）+ 支持通用订阅',
    deviceLimit: '待核实',
    coupons: [{ code: 'tiziyun', discount: '具体折扣未标注', status: 'vendor' }],
    conflicts: [],
    dataStatus: 'vendor',
  },
  lingdong: {
    routeType: 'IEPL 专线（历史资料）',
    protocols: ['VLESS（实测）', 'Trojan（页面混提）'],
    clientMode: 'unverified',
    clientModeLabel: '不限速不限设备（具体客户端列表待核实）',
    deviceLimit: '不限设备',
    coupons: [{ code: '待核实', discount: '优惠码尚未核实', status: 'unverified' }],
    conflicts: ['页面文案混提 VLESS/trojan；至尊私人定制版月流量被截图遮挡'],
    dataStatus: 'historical',
  },
  langwang: {
    routeType: 'IEPL 专线（截图标注）',
    protocols: ['待核实'],
    clientMode: 'unverified',
    clientModeLabel: '客户端、协议与设备限制尚缺',
    deviceLimit: '待核实（截图遮挡）',
    coupons: [{ code: '待核实', discount: '优惠码尚未核实', status: 'unverified' }],
    conflicts: ['入门套餐流量显示“截150G”（截图遮挡），协议/设备/测速/解锁全缺'],
    dataStatus: 'historical',
  },
  edgenova: {
    routeType: '高速直连 / IPLC（多线路自动分配）',
    protocols: ['待核实'],
    clientMode: 'unverified',
    clientModeLabel: '具体客户端兼容性待核实',
    deviceLimit: '待核实',
    coupons: [{ code: 'TH888', discount: '8 折（历史资料）', status: 'historical' }],
    conflicts: ['缺乏可比逐地区测速与逐项流媒体/AI 实测数据'],
    dataStatus: 'historical',
  },
};

const brands = [];
const allPlans = [];
const allBenchmarks = [];
const allUnlockResults = [];
const clientCompatibility = [];
const brandSources = [];
const brandStatus = [];
const affiliateEntries = [];

for (const meta of BRAND_META) {
  const parsed = parseSectionData(sectionMap[meta.slug], meta.slug);
  const extraFirefly = meta.slug === 'firefly' ? parseSectionData(sectionMap['firefly_extra'], meta.slug) : null;
  const details = AUDIT_DETAILS[meta.slug];

  // Merge plans (for Firefly, prefer the expanded firefly_extra plan table while recording original)
  let plans = parsed.plans;
  if (extraFirefly && extraFirefly.plans.length > plans.length) {
    plans = extraFirefly.plans;
  }
  // For Guangsuyun, cross-check 光速云品牌信息.txt note (59GB vs 69GB)
  if (meta.slug === 'guangsuyun') {
    for (const p of plans) {
      if (p.planName.includes('轻量版')) {
        p.note = '《光速云品牌信息.txt》顶部摘要另有“约8元/月 59GB”记录，正文与总清单为 69GB/月，已标注 conflicting';
        p.dataStatus = 'conflicting';
      }
    }
  }
  allPlans.push(...plans);

  // Entry price calculations
  const monthlyPlans = plans.filter((p) => p.billingCycle === 'monthly' && !p.isCustom && p.priceCny !== null);
  const annualPlans = plans.filter((p) => p.billingCycle === 'annual' && p.priceCny !== null);
  const noExpiryPlans = plans.filter((p) => p.isNoExpiry && p.priceCny !== null);
  const minMonthlyPlan = monthlyPlans.sort((a, b) => a.priceCny - b.priceCny)[0] || null;
  const minAnnualPlan = annualPlans.sort((a, b) => a.priceCny - b.priceCny)[0] || null;

  // Fallback entry price from summary text if no plan table (like 5.6元/月 60GB, 18元/月 100GB, 14元/月 120GB)
  let fallbackEntryText = null;
  let fallbackMonthlyEquivalent = null;
  const secText = sectionMap[meta.slug] || '';
  const baseLine = secText.split(/\r?\n/).find((l) => l.startsWith('**基础数据**'));
  if (baseLine) {
    fallbackEntryText = baseLine.replace('**基础数据**：', '').trim();
    const mAnnual = baseLine.match(/年付约([\d.]+)元\/月/);
    const mMonth = baseLine.match(/\|\s*([\d.]+)元\/月/);
    if (mAnnual) fallbackMonthlyEquivalent = Number(mAnnual[1]);
    else if (mMonth) fallbackMonthlyEquivalent = Number(mMonth[1]);
  }

  const speedAsset = speedManifest.assets.find(
    (a) => a.brand === meta.name || a.brand.replace(/\s+/g, '') === meta.name.replace(/\s+/g, '')
  );

  const gsyScreenshots =
    meta.slug === 'guangsuyun'
      ? [
          {
            file: '/images/guangsuyun/photo_2026-08-19_12-13-01.jpg',
            title: '光速云 MiaoKo 62节点普通测速（长沙电信 @2Gbps）',
            testedAt: '2026-08-19',
            protocol: 'Shadowsocks',
            backend: '长沙电信@2Gbps（6线程，62/62节点）',
            summary: '日本平均 39.92–49.38MB/s，香港专线平均 35.35–42.57MB/s，OpenAI 香港专线仅APP(HK)，Gemini 仅新加坡/土耳其/马来西亚解锁',
          },
          {
            file: '/images/guangsuyun/photo_2026-08-19_12-13-50.jpg',
            title: '光速云 MiaoKo 62节点普通测速（广西移动 @2Gbps）',
            testedAt: '2026-08-19',
            protocol: 'Shadowsocks',
            backend: '广西移动@2Gbps（6线程，62/62节点）',
            summary: '新加坡与日本头部节点均值 50–53MB/s，香港专线 33–52MB/s，德国01 出现 43.08KB/s 低速样本',
          },
          {
            file: '/images/guangsuyun/photo_2026-08-19_12-13-58.jpg',
            title: '光速云 MiaoKo 62节点普通测速（河北联通 @2Gbps）',
            testedAt: '2026-08-19',
            protocol: 'Shadowsocks',
            backend: '河北联通@2Gbps（6线程，62/62节点）',
            summary: '新加坡01 41.85MB/s，台湾03 37.49MB/s，香港专线部分节点出现 1200ms+ HTTPS 延迟波动',
          },
          {
            file: '/images/guangsuyun/photo_2026-08-19_12-18-40.jpg',
            title: '光速云 MiaoKo 70节点基础流媒体与 AI 解锁检测',
            testedAt: '2026-08-19',
            protocol: 'VLESS + AnyTLS',
            backend: '珠海联通 9Gbps 单线程（70/70节点）',
            summary: '日本/美国/香港 YouTube 与 Netflix 多数解锁，新加坡与台湾 YouTube 呈“送中(CN)”提示，OpenAI 多节点可用',
          },
          {
            file: '/images/guangsuyun/photo_2026-08-19_12-20-10.jpg',
            title: '光速云 MiaoKo 订阅单线程测速（珠海联通 9Gbps）',
            testedAt: '2026-08-19',
            protocol: 'VLESS',
            backend: '珠海联通 9Gbps 单线程（60/70显示）',
            summary: '香港节点平均 375–424MB/s，美国节点平均 313–370MB/s（美国02出现 1.60KB/s 异常节点）',
          },
        ]
      : [];

  // Benchmark record
  const benchmarkObj = {
    brandSlug: meta.slug,
    brandName: meta.name,
    textRecord20261019: parsed.speed20261019.length
      ? {
          testedAt: '2026-10-19',
          condition: '非晚高峰（上传资料原文标注）',
          dataStatus: 'historical',
          nodes: parsed.speed20261019,
        }
      : null,
    screenshot20260811: speedAsset
      ? {
          file: `/images/speedtests/${speedAsset.file}`,
          testedAt: speedAsset.testedAt,
          protocolDisplayed: speedAsset.protocolDisplayed,
          toolFamily: speedAsset.toolFamily,
          dateConfidence: speedAsset.dateConfidence,
          reviewNote: speedAsset.reviewNote || null,
          dataStatus: 'measured',
          limitations: speedManifest.commonLimitations,
        }
      : null,
    additionalScreenshots: gsyScreenshots,
    specialSummaryNote:
      meta.slug === 'lingdong'
        ? '2026-07-20/21 珠海联通 9Gbps（60 测速 / 60 解锁）历史摘要：速度 20–80MB/s、HTTPS 延迟偏高，OpenAI 基本全解锁，TikTok 多失败、新/台 YouTube 送中、美国01 整节点失败。'
        : null,
  };
  allBenchmarks.push(benchmarkObj);

  // Unlock record
  const unlockSupported = extraFirefly && extraFirefly.unlockSupported.length ? extraFirefly.unlockSupported : parsed.unlockSupported;
  const unlockConditional = parsed.unlockConditional;
  allUnlockResults.push({
    brandSlug: meta.slug,
    brandName: meta.name,
    supported: unlockSupported,
    conditional: unlockConditional,
    rawNote:
      meta.slug === 'kexin'
        ? '品牌资料明确指出“AI 与流媒体目前缺乏统一实测数据，应保持中性描述”。'
        : meta.slug === 'sujie'
          ? '品牌资料强调 ChatGPT、Claude、Gemini 使用场景，并注明可用性受 IP 与平台规则影响。'
          : meta.slug === 'lingdong'
            ? '历史摘要显示 OpenAI 基本全解锁，TikTok 多失败，新加坡/台湾 YouTube 送中，台湾落地识别偏欧（NF/D+ 识别 ES）。'
            : null,
    dataStatus:
      meta.slug === 'guangsuyun'
        ? 'measured'
        : unlockSupported.length > 0
          ? 'vendor'
          : 'unverified',
  });

  // Client compatibility record
  const compatObj = {
    brandSlug: meta.slug,
    brandName: meta.name,
    mode: details.clientMode,
    modeLabel: details.clientModeLabel,
    supportsProprietaryClient: ['proprietary', 'proprietary_plus', 'dual'].includes(details.clientMode),
    supportsThirdPartySubscription: ['third_party', 'dual'].includes(details.clientMode),
    recommendedClients:
      details.clientMode === 'third_party' || details.clientMode === 'dual'
        ? ['Clash Verge Rev', 'FlClash', 'v2rayN', 'v2rayNG', 'Shadowrocket', 'Hiddify', 'Karing']
        : details.clientMode === 'proprietary'
          ? ['仅品牌官方专属客户端（不兼容 Clash / Shadowrocket）']
          : ['需在注册前向客服确认是否支持通用订阅链接'],
    dataStatus: details.clientMode === 'conflicting' ? 'conflicting' : details.clientMode === 'unverified' ? 'unverified' : 'vendor',
  };
  clientCompatibility.push(compatObj);

  // Affiliate entry
  affiliateEntries.push({
    brandSlug: meta.slug,
    brandName: meta.name,
    registerUrl: parsed.regUrl,
    secondaryRegisterUrl: extraFirefly ? extraFirefly.regUrl : null,
    coupons: details.coupons,
    urlFormatWarning: Boolean(details.urlFormatWarning),
    isHistoricalUrl: meta.tier === 'appended_historical',
    rel: 'nofollow sponsored noopener',
    target: '_blank',
    disclosure: '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。',
  });

  // Brand status & sources
  brandStatus.push({
    brandSlug: meta.slug,
    brandName: meta.name,
    priorityRank: meta.priorityRank,
    tier: meta.tier,
    foundedYear: meta.foundedYear,
    overallDataStatus: details.dataStatus,
    hasPlansTable: plans.length > 0,
    has20261019Speed: parsed.speed20261019.length > 0,
    has20260811Screenshot: Boolean(speedAsset),
    hasConflicts: details.conflicts.length > 0,
    conflictCount: details.conflicts.length,
    lastVerified: '2026-11-24',
  });

  brandSources.push({
    brandSlug: meta.slug,
    brandName: meta.name,
    sources: [
      { source: '机场品牌信息/32家机场品牌清单.txt', type: meta.tier === 'appended_historical' ? 'historical' : 'vendor', retrievedAt: '2026-11-24' },
      ...(meta.slug === 'guangsuyun'
        ? [
            { source: '机场品牌信息/光速云品牌信息.txt', type: 'vendor', retrievedAt: '2026-11-24' },
            { source: '光速云测试图解锁图/photo_2026-08-19_*.jpg', type: 'measured', retrievedAt: '2026-08-19' },
          ]
        : []),
      ...(speedAsset
        ? [{ source: `机场测速实测资料包/${speedAsset.file}`, type: 'measured', retrievedAt: speedAsset.testedAt }]
        : []),
    ],
    conflicts: details.conflicts,
  });

  brands.push({
    id: meta.id,
    slug: meta.slug,
    name: meta.name,
    enName: meta.enName,
    aliases: meta.aliases,
    tier: meta.tier,
    priorityRank: meta.priorityRank,
    accentColor: meta.accentColor,
    logo: meta.logoPath,
    foundedYear: meta.foundedYear,
    reviewUrl: `/reviews/${meta.slug}/`,
    routeType: details.routeType,
    protocols: details.protocols,
    clientMode: details.clientMode,
    clientModeLabel: details.clientModeLabel,
    deviceLimit: details.deviceLimit,
    paymentMethods: meta.paymentMethods,
    coupons: details.coupons,
    entryMonthlyPriceCny: minMonthlyPlan ? minMonthlyPlan.priceCny : null,
    entryAnnualPriceCny: minAnnualPlan ? minAnnualPlan.priceCny : null,
    entryAnnualEffectiveMonthlyCny: minAnnualPlan ? minAnnualPlan.effectiveMonthlyCny : fallbackMonthlyEquivalent,
    hasNoExpiryPlan: noExpiryPlans.length > 0,
    planCount: plans.length,
    fallbackEntryText,
    features: parsed.features.length ? parsed.features : extraFirefly?.features || [],
    introSummary: parsed.intro || extraFirefly?.intro || `${meta.name}在原始品牌库中记录为 ${details.routeType}。`,
    has20261019Speed: parsed.speed20261019.length > 0,
    has20260811Screenshot: Boolean(speedAsset),
    dataStatus: details.dataStatus,
    conflicts: details.conflicts,
    urlFormatWarning: Boolean(details.urlFormatWarning),
    updatedAt: '2026-11-24',
  });
}

// Parse third-party clients database from 第三方代理客户端.txt
const CLIENTS_DB = [
  {
    id: 'client-clash-verge-rev',
    slug: 'clash-verge-rev',
    name: 'Clash Verge Rev',
    category: '图形化代理管理客户端',
    platforms: ['Windows', 'macOS', 'Linux'],
    cores: ['Mihomo'],
    pricing: '免费开源',
    officialType: 'GitHub 开源项目',
    officialUrl: 'https://github.com/clash-verge-rev/clash-verge-rev',
    maintenanceStatus: '活跃维护（以官方仓库最新发布为准）',
    verifiedAt: '2026-11-24',
    summary: '基于 Mihomo 内核的跨平台桌面代理管理软件，支持订阅管理、规则分流与 TUN 虚拟网卡模式，兼顾新手与进阶用户。',
    notes: 'macOS 安装需区分 Intel 与 Apple Silicon 架构安装包；Linux 提供 DEB/RPM/AppImage 格式。',
  },
  {
    id: 'client-v2rayn',
    slug: 'v2rayn',
    name: 'v2rayN',
    category: '图形化多核心代理客户端',
    platforms: ['Windows', 'macOS', 'Linux'],
    cores: ['Xray', 'sing-box', 'Mihomo'],
    pricing: '免费开源',
    officialType: 'GitHub 开源项目',
    officialUrl: 'https://github.com/2dust/v2rayN',
    maintenanceStatus: '活跃维护',
    verifiedAt: '2026-11-24',
    summary: '老牌多协议多核心桌面客户端，支持 Xray 与 sing-box 核心切换，适合多协议订阅与节点精细管理。',
    notes: '从 GitHub Releases 下载官方发布包时建议核对签名与压缩包校验值。',
  },
  {
    id: 'client-flclash',
    slug: 'flclash',
    name: 'FlClash',
    category: '图形化代理管理客户端',
    platforms: ['Windows', 'macOS', 'Linux', 'Android'],
    cores: ['Mihomo'],
    pricing: '免费开源',
    officialType: 'GitHub 开源项目',
    officialUrl: 'https://github.com/chen08209/FlClash',
    maintenanceStatus: '活跃维护',
    verifiedAt: '2026-11-24',
    summary: '基于 Mihomo 内核开发的跨平台极简界面客户端，桌面与移动端交互一致，支持订阅与规则分流。',
    notes: 'macOS 版本同样需注意选择 arm64 或 x64 对应构建。',
  },
  {
    id: 'client-hiddify',
    slug: 'hiddify',
    name: 'Hiddify',
    category: '图形化多协议客户端',
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    cores: ['sing-box'],
    pricing: '免费开源',
    officialType: 'GitHub 开源项目',
    officialUrl: 'https://github.com/hiddify/hiddify-app',
    maintenanceStatus: '活跃维护',
    verifiedAt: '2026-11-24',
    summary: '支持多种订阅格式、自动节点测速选择与远程配置的多平台客户端，对初次配置代理的新手友好。',
    notes: '支持导入 Clash、sing-box 与通用分享链接，需注意部分区域路由模式差异。',
  },
  {
    id: 'client-karing',
    slug: 'karing',
    name: 'Karing',
    category: '图形化代理管理客户端',
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    cores: ['sing-box'],
    pricing: '免费（iOS 商店上架）',
    officialType: 'GitHub / App Store',
    officialUrl: 'https://github.com/KaringX/karing',
    maintenanceStatus: '活跃维护',
    verifiedAt: '2026-11-24',
    summary: '基于 sing-box 体系的跨平台订阅工具，针对新手简化了规则分流与多订阅合并流程。',
    notes: 'iOS 端通常需使用海外地区 Apple ID 在 App Store 获取。',
  },
  {
    id: 'client-v2rayng',
    slug: 'v2rayng',
    name: 'v2rayNG',
    category: '移动端图形代理客户端',
    platforms: ['Android'],
    cores: ['Xray'],
    pricing: '免费开源',
    officialType: 'GitHub 开源项目',
    officialUrl: 'https://github.com/2dust/v2rayNG',
    maintenanceStatus: '活跃维护',
    verifiedAt: '2026-11-24',
    summary: 'Android 端最常见的 Xray 协议客户端，支持单节点链接、二维码与 Base64 订阅导入，内存占用低。',
    notes: '不原生直接解析复杂 Clash YAML 策略组，导入 Clash 专属订阅时需配合机场提供的通用/V2Ray 链接。',
  },
  {
    id: 'client-shadowrocket',
    slug: 'shadowrocket',
    name: 'Shadowrocket（小火箭）',
    category: 'iOS 规则代理客户端',
    platforms: ['iOS'],
    cores: ['专有规则引擎'],
    pricing: '美区 App Store 付费（一次性购买，具体以商店地区为准）',
    officialType: 'App Store 官方应用',
    officialUrl: 'https://apps.apple.com/app/shadowrocket/id932747118',
    maintenanceStatus: '持续更新',
    verifiedAt: '2026-11-24',
    summary: 'iPhone 与 iPad 上普及度最高的规则代理应用，支持 VLESS、Trojan、VMess、Hysteria 2 等主流协议及订阅托管。',
    notes: '中国区 App Store 未上架，切勿购买或使用来源不明的共享破解包，避免 Apple ID 锁机风险。',
  },
  {
    id: 'client-mihomo',
    slug: 'mihomo',
    name: 'Mihomo（原 Clash.Meta 内核）',
    category: '网络代理核心',
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'OpenWrt'],
    cores: ['Mihomo'],
    pricing: '免费开源',
    officialType: 'GitHub 开源内核项目',
    officialUrl: 'https://github.com/MetaCubeX/mihomo',
    maintenanceStatus: '活跃维护',
    verifiedAt: '2026-11-24',
    summary: '目前 Clash 生态的事实标准底层代理核心，支持 VLESS Reality、Hysteria 2、AnyTLS、TUN 与增强 DNS 分流。',
    notes: '本身为命令行核心，日常使用一般搭配 Clash Verge Rev、FlClash、OpenClash 等前端界面。',
  },
  {
    id: 'client-sing-box',
    slug: 'sing-box',
    name: 'sing-box',
    category: '统一通用网络代理核心',
    platforms: ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'OpenWrt'],
    cores: ['sing-box'],
    pricing: '免费开源',
    officialType: '官方文档与开源项目',
    officialUrl: 'https://sing-box.sagernet.org/',
    maintenanceStatus: '活跃维护',
    verifiedAt: '2026-11-24',
    summary: '统一通用代理平台内核，提供官方 SFA（Android）、SFI（iOS）、SFM（macOS）与桌面/路由组件。',
    notes: '原生 JSON 配置格式与 Clash YAML 不同，使用前需确认机场是否下发 sing-box 订阅或进行合规转换。',
  },
  {
    id: 'client-clash-meta',
    slug: 'clash-meta',
    name: 'Clash Meta for Android',
    category: '移动端规则代理客户端',
    platforms: ['Android'],
    cores: ['Mihomo'],
    pricing: '免费开源',
    officialType: 'GitHub 开源项目',
    officialUrl: 'https://github.com/MetaCubeX/ClashMetaForAndroid',
    maintenanceStatus: '按上游社区分支维护',
    verifiedAt: '2026-11-24',
    summary: '基于 Mihomo 内核的 Android Clash 规则客户端，兼容标准 Clash YAML 配置与分流策略组。',
    notes: '部分旧版 Clash for Android 已停止维护，安卓端应选用基于 Mihomo 的合法构建或 FlClash。',
  },
  {
    id: 'client-clash-verge',
    slug: 'clash-verge',
    name: 'Clash Verge（原版演进说明）',
    category: '历史与迁移参考客户端',
    platforms: ['Windows', 'macOS', 'Linux'],
    cores: ['Clash / Mihomo'],
    pricing: '免费开源',
    officialType: '历史参考项目',
    officialUrl: 'https://github.com/clash-verge-rev/clash-verge-rev',
    maintenanceStatus: '原仓库已归档，当前生态由 Clash Verge Rev 接续维护',
    verifiedAt: '2026-11-24',
    summary: '早期替代 Clash for Windows 的跨平台前端，目前新装机与教程均建议迁移至 Clash Verge Rev。',
    notes: '切勿从搜索引擎广告下载伪造“Clash 官网中文版”安装包。',
  },
  {
    id: 'client-openwrt-suite',
    slug: 'openwrt-clients',
    name: 'OpenWrt 软路由代理组件（OpenClash / PassWall2 / Nikki / HomeProxy）',
    category: '路由器网络管理组件',
    platforms: ['OpenWrt'],
    cores: ['Mihomo', 'Xray', 'sing-box'],
    pricing: '免费开源',
    officialType: 'GitHub 开源路由器插件',
    officialUrl: 'https://github.com/vernesong/OpenClash',
    maintenanceStatus: '活跃维护（各项目固件依赖不同）',
    verifiedAt: '2026-11-24',
    summary: '路由器透明代理核心组件，部署前必须核对 OpenWrt 版本、CPU 架构、防火墙（fw3/fw4）与包管理器（opkg/apk）。',
    notes: '例如 Nikki 项目明确要求 OpenWrt 24.10 及以上版本，不可盲目跨版本安装 ipk/apk。',
  },
];

// Write core JSON databases
fs.writeFileSync(path.join(DATA_DIR, 'brands.json'), JSON.stringify(brands, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'plans.json'), JSON.stringify(allPlans, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'benchmarks.json'), JSON.stringify(allBenchmarks, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'unlock-results.json'), JSON.stringify(allUnlockResults, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'client-compatibility.json'), JSON.stringify(clientCompatibility, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'brand-sources.json'), JSON.stringify(brandSources, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'brand-status.json'), JSON.stringify(brandStatus, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'clients.json'), JSON.stringify(CLIENTS_DB, null, 2), 'utf8');

// Write affiliate-links.ts
const affiliateTs = `export interface CouponRecord {
  code: string;
  discount: string;
  status: string;
}

export interface AffiliateLinkRecord {
  brandSlug: string;
  brandName: string;
  registerUrl: string | null;
  secondaryRegisterUrl: string | null;
  coupons: CouponRecord[];
  urlFormatWarning: boolean;
  isHistoricalUrl: boolean;
  rel: 'nofollow sponsored noopener';
  target: '_blank';
  disclosure: string;
}

export const AFFILIATE_LINKS: Record<string, AffiliateLinkRecord> = ${JSON.stringify(
  Object.fromEntries(affiliateEntries.map((e) => [e.brandSlug, e])),
  null,
  2
)};

export function getAffiliateLink(slug: string): AffiliateLinkRecord | undefined {
  return AFFILIATE_LINKS[slug];
}
`;
fs.writeFileSync(path.join(DATA_DIR, 'affiliate-links.ts'), affiliateTs, 'utf8');

// Build GEO Entity Graph (entities.json, entity-relations.json, entity-aliases.json, entity-sources.json)
const entities = [
  { id: 'org-subscription-guide', type: 'Organization', name: '订阅指南', enName: 'Subscription Guide', url: 'https://dingyuezhinan.biz/' },
  ...brands.map((b) => ({
    id: b.id,
    type: 'Brand',
    name: b.name,
    enName: b.enName,
    slug: b.slug,
    url: `https://dingyuezhinan.biz${b.reviewUrl}`,
    dataStatus: b.dataStatus,
  })),
  ...CLIENTS_DB.map((c) => ({
    id: c.id,
    type: 'ClientSoftware',
    name: c.name,
    slug: c.slug,
    url: `https://dingyuezhinan.biz/clients/${c.slug}/`,
    platforms: c.platforms,
  })),
  { id: 'proto-vless', type: 'NetworkProtocol', name: 'VLESS', url: 'https://dingyuezhinan.biz/guides/subscription-basics/' },
  { id: 'proto-shadowsocks', type: 'NetworkProtocol', name: 'Shadowsocks', url: 'https://dingyuezhinan.biz/guides/subscription-basics/' },
  { id: 'proto-trojan', type: 'NetworkProtocol', name: 'Trojan', url: 'https://dingyuezhinan.biz/guides/subscription-basics/' },
  { id: 'proto-hysteria2', type: 'NetworkProtocol', name: 'Hysteria 2', url: 'https://dingyuezhinan.biz/guides/subscription-basics/' },
  { id: 'route-iepl', type: 'NetworkRoute', name: 'IEPL 专线', url: 'https://dingyuezhinan.biz/network/iepl/' },
  { id: 'route-iplc', type: 'NetworkRoute', name: 'IPLC 专线', url: 'https://dingyuezhinan.biz/network/iplc/' },
  { id: 'route-bgp', type: 'NetworkRoute', name: 'BGP 中转网络', url: 'https://dingyuezhinan.biz/network/bgp/' },
];

const relations = [];
for (const b of brands) {
  if (b.routeType.includes('IEPL')) relations.push({ from: b.id, relation: 'usesRoute', to: 'route-iepl' });
  if (b.routeType.includes('IPLC')) relations.push({ from: b.id, relation: 'usesRoute', to: 'route-iplc' });
  if (b.routeType.includes('BGP')) relations.push({ from: b.id, relation: 'usesRoute', to: 'route-bgp' });
  for (const p of b.protocols) {
    if (p.includes('VLESS')) relations.push({ from: b.id, relation: 'supportsProtocol', to: 'proto-vless' });
    if (p.includes('Shadowsocks')) relations.push({ from: b.id, relation: 'supportsProtocol', to: 'proto-shadowsocks' });
    if (p.includes('Trojan')) relations.push({ from: b.id, relation: 'supportsProtocol', to: 'proto-trojan' });
    if (p.includes('Hysteria')) relations.push({ from: b.id, relation: 'supportsProtocol', to: 'proto-hysteria2' });
  }
  if (['third_party', 'dual'].includes(b.clientMode)) {
    relations.push({ from: b.id, relation: 'compatibleWith', to: 'client-clash-verge-rev' });
    relations.push({ from: b.id, relation: 'compatibleWith', to: 'client-shadowrocket' });
  }
}

const aliases = Object.fromEntries(brands.map((b) => [b.id, [b.name, b.enName, ...b.aliases]]));
const entitySources = Object.fromEntries(brandSources.map((s) => [`brand-${s.brandSlug}`, s.sources]));

fs.writeFileSync(path.join(DATA_DIR, 'entities.json'), JSON.stringify(entities, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'entity-relations.json'), JSON.stringify(relations, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'entity-aliases.json'), JSON.stringify(aliases, null, 2), 'utf8');
fs.writeFileSync(path.join(DATA_DIR, 'entity-sources.json'), JSON.stringify(entitySources, null, 2), 'utf8');

console.log(`Generated DBs: ${brands.length} brands, ${allPlans.length} plans, ${allBenchmarks.length} benchmarks, ${CLIENTS_DB.length} clients, ${entities.length} entities.`);
