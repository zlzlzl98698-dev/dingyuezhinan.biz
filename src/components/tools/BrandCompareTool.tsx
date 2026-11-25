import { useMemo, useState } from 'react';
import { ArrowLeftRight, AlertTriangle } from 'lucide-react';

interface BrandItem {
  slug: string;
  name: string;
  enName: string;
  thumbLogo?: string;
  logo: string;
  foundedYear: string | null;
  reviewUrl: string;
  routeType: string;
  protocols: string[];
  clientModeLabel: string;
  deviceLimit: string;
  entryMonthlyPriceCny: number | null;
  entryAnnualPriceCny: number | null;
  entryAnnualEffectiveMonthlyCny: number | null;
  hasNoExpiryPlan: boolean;
  has20260811Screenshot: boolean;
  has20261019Speed: boolean;
  dataStatus: string;
  conflicts: string[];
  coupons: { code: string; discount: string }[];
}

interface UnlockItem {
  brandSlug: string;
  supported: string[];
  conditional: string[];
}

interface Props {
  brands: BrandItem[];
  unlocks: UnlockItem[];
  affiliateMap: Record<string, { registerUrl: string | null; isHistoricalUrl: boolean }>;
}

export default function BrandCompareTool({ brands, unlocks, affiliateMap }: Props) {
  const [slugA, setSlugA] = useState('guangsuyun');
  const [slugB, setSlugB] = useState('feimao');

  const brandA = useMemo(() => brands.find((b) => b.slug === slugA) || brands[0], [brands, slugA]);
  const brandB = useMemo(() => brands.find((b) => b.slug === slugB) || brands[1], [brands, slugB]);

  const unlockMap = useMemo(() => Object.fromEntries(unlocks.map((u) => [u.brandSlug, u])), [unlocks]);
  const uA = unlockMap[brandA.slug];
  const uB = unlockMap[brandB.slug];

  const swapBrands = () => {
    setSlugA(slugB);
    setSlugB(slugA);
  };

  const rows = [
    {
      label: '开业年份记录',
      a: brandA.foundedYear ? `${brandA.foundedYear} 年` : '待核实',
      b: brandB.foundedYear ? `${brandB.foundedYear} 年` : '待核实',
    },
    {
      label: '数据核验状态',
      a: brandA.dataStatus,
      b: brandB.dataStatus,
    },
    {
      label: '线路与定位',
      a: brandA.routeType,
      b: brandB.routeType,
    },
    {
      label: '记录支持协议',
      a: brandA.protocols.join(' / '),
      b: brandB.protocols.join(' / '),
    },
    {
      label: '客户端订阅方式',
      a: brandA.clientModeLabel,
      b: brandB.clientModeLabel,
    },
    {
      label: '月付起步价',
      a: brandA.entryMonthlyPriceCny ? `¥${brandA.entryMonthlyPriceCny}/月` : '无或待核实',
      b: brandB.entryMonthlyPriceCny ? `¥${brandB.entryMonthlyPriceCny}/月` : '无或待核实',
    },
    {
      label: '年付折算月均',
      a: brandA.entryAnnualEffectiveMonthlyCny ? `约 ¥${brandA.entryAnnualEffectiveMonthlyCny}/月` : '无或待核实',
      b: brandB.entryAnnualEffectiveMonthlyCny ? `约 ¥${brandB.entryAnnualEffectiveMonthlyCny}/月` : '无或待核实',
    },
    {
      label: '不限时一次性包',
      a: brandA.hasNoExpiryPlan ? '提供' : '未提供或待核实',
      b: brandB.hasNoExpiryPlan ? '提供' : '未提供或待核实',
    },
    {
      label: '设备并发限制',
      a: brandA.deviceLimit,
      b: brandB.deviceLimit,
    },
    {
      label: '测速证据情况',
      a: brandA.has20260811Screenshot ? '含 2026-08 原始截图' : brandA.has20261019Speed ? '仅 10-19 文字记录' : '暂无可用测速',
      b: brandB.has20260811Screenshot ? '含 2026-08 原始截图' : brandB.has20261019Speed ? '仅 10-19 文字记录' : '暂无可用测速',
    },
    {
      label: 'AI / 流媒体资料标注支持',
      a: uA?.supported.length ? uA.supported.join('、') : '待核实',
      b: uB?.supported.length ? uB.supported.join('、') : '待核实',
    },
    {
      label: '资料记录优惠码',
      a: brandA.coupons.map((c) => `${c.code}（${c.discount}）`).join('；') || '待核实',
      b: brandB.coupons.map((c) => `${c.code}（${c.discount}）`).join('；') || '待核实',
    },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5" aria-label="双品牌参数横向对比工具">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="text-xs font-mono text-brand uppercase tracking-wider">Interactive Side-by-Side Matrix</div>
          <h2 className="text-lg font-bold text-ink mt-0.5">31 家品牌自由双边 PK 对比器</h2>
        </div>
        <button
          type="button"
          onClick={swapBrands}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-ink"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>互换左右品牌</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <label htmlFor="pk-brand-a" className="block font-semibold text-ink">选择对比品牌 A</label>
          <select
            id="pk-brand-a"
            value={slugA}
            onChange={(e) => setSlugA(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink"
          >
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>{b.name}（{b.enName}）</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="pk-brand-b" className="block font-semibold text-ink">选择对比品牌 B</label>
          <select
            id="pk-brand-b"
            value={slugB}
            onChange={(e) => setSlugB(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink"
          >
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>{b.name}（{b.enName}）</option>
            ))}
          </select>
        </div>
      </div>

      {slugA === slugB && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-900">
          当前两侧选择了同一个品牌，可在上方下拉框任选另一家品牌进行对比。
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-observatory-bg text-white">
              <th className="py-3 px-4 w-36 font-semibold">对比维度</th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <img src={brandA.thumbLogo || brandA.logo} alt={brandA.name} width={24} height={24} className="w-6 h-6 rounded object-cover bg-white" />
                  <a href={brandA.reviewUrl} className="hover:text-observatory-cyan underline">{brandA.name}</a>
                </div>
              </th>
              <th className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <img src={brandB.thumbLogo || brandB.logo} alt={brandB.name} width={24} height={24} className="w-6 h-6 rounded object-cover bg-white" />
                  <a href={brandB.reviewUrl} className="hover:text-observatory-cyan underline">{brandB.name}</a>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr key={r.label} className="hover:bg-slate-50/70">
                <td className="py-2.5 px-4 font-semibold text-ink bg-slate-50/60">{r.label}</td>
                <td className="py-2.5 px-4 text-ink-muted leading-relaxed">{r.a}</td>
                <td className="py-2.5 px-4 text-ink-muted leading-relaxed">{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(brandA.conflicts.length > 0 || brandB.conflicts.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {brandA.conflicts.length > 0 && (
            <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3 space-y-1">
              <div className="font-semibold text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{brandA.name} 口径冲突提示</span>
              </div>
              <ul className="list-disc pl-4 text-rose-900 space-y-0.5">
                {brandA.conflicts.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}
          {brandB.conflicts.length > 0 && (
            <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3 space-y-1">
              <div className="font-semibold text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{brandB.name} 口径冲突提示</span>
              </div>
              <ul className="list-disc pl-4 text-rose-900 space-y-0.5">
                {brandB.conflicts.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="flex flex-wrap gap-2">
          <a href={brandA.reviewUrl} className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-ink hover:bg-slate-50">
            查看 {brandA.name} 完整评测
          </a>
          {affiliateMap[brandA.slug]?.registerUrl && !affiliateMap[brandA.slug]?.isHistoricalUrl && (
            <a href={affiliateMap[brandA.slug].registerUrl!} target="_blank" rel="nofollow sponsored noopener" className="px-3 py-2 rounded-lg bg-brand text-white text-xs font-medium hover:bg-brand-hover">
              {brandA.name} 注册入口
            </a>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={brandB.reviewUrl} className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-ink hover:bg-slate-50">
            查看 {brandB.name} 完整评测
          </a>
          {affiliateMap[brandB.slug]?.registerUrl && !affiliateMap[brandB.slug]?.isHistoricalUrl && (
            <a href={affiliateMap[brandB.slug].registerUrl!} target="_blank" rel="nofollow sponsored noopener" className="px-3 py-2 rounded-lg bg-brand text-white text-xs font-medium hover:bg-brand-hover">
              {brandB.name} 注册入口
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
