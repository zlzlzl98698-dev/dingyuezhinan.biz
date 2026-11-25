import { useMemo, useState } from 'react';

interface PlanEntry {
  brandSlug: string;
  planName: string;
  billingCycle: string;
  billingCycleLabel: string;
  priceCny: number | null;
  trafficGb: number | null;
  effectiveMonthlyCny: number | null;
  costPerGbCny: number | null;
  isNoExpiry: boolean;
}

interface BrandBasic {
  slug: string;
  name: string;
  reviewUrl: string;
}

interface Props {
  plans: PlanEntry[];
  brands: BrandBasic[];
}

export default function CostComparisonTool({ plans, brands }: Props) {
  const [priceInput, setPriceInput] = useState(99);
  const [cycleInput, setCycleInput] = useState<'monthly' | 'quarterly' | 'annual' | 'no-expiry'>('annual');
  const [trafficInput, setTrafficInput] = useState(69);
  const [expectedMonthsForNoExpiry, setExpectedMonthsForNoExpiry] = useState(12);

  const brandMap = useMemo(() => Object.fromEntries(brands.map((b) => [b.slug, b])), [brands]);

  const calc = useMemo(() => {
    const months =
      cycleInput === 'monthly'
        ? 1
        : cycleInput === 'quarterly'
          ? 3
          : cycleInput === 'annual'
            ? 12
            : Math.max(1, expectedMonthsForNoExpiry);
    const totalTraffic = cycleInput === 'no-expiry' ? trafficInput : trafficInput * months;
    const monthlyCost = priceInput / months;
    const perGb = totalTraffic > 0 ? priceInput / totalTraffic : 0;
    return {
      months,
      totalTraffic,
      monthlyCost: monthlyCost.toFixed(2),
      perGb: perGb.toFixed(3),
    };
  }, [priceInput, cycleInput, trafficInput, expectedMonthsForNoExpiry]);

  const noExpiryBenchmarks = useMemo(() => {
    return plans
      .filter((p) => p.isNoExpiry && p.priceCny && p.trafficGb && p.costPerGbCny !== null)
      .sort((a, b) => (a.costPerGbCny! - b.costPerGbCny!))
      .slice(0, 6);
  }, [plans]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="text-xs font-mono text-brand uppercase tracking-wider">Unit Cost & Billing Cycle Analyzer</div>
        <h2 className="text-lg font-bold text-ink mt-0.5">年付折算、单 GB 成本与不限时周期估算器</h2>
        <p className="text-xs text-ink-muted mt-1">
          把任何套餐的付款金额、周期和流量填入下方，立即核算真实月均开销与每 GB 单价，避免被“折合低价”宣传误导。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="space-y-1.5">
          <label htmlFor="cost-cycle" className="block font-semibold text-ink">计费周期类型</label>
          <select
            id="cost-cycle"
            value={cycleInput}
            onChange={(e) => setCycleInput(e.target.value as 'monthly' | 'quarterly' | 'annual' | 'no-expiry')}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white text-ink"
          >
            <option value="monthly">按月付费</option>
            <option value="quarterly">按季付费（3个月）</option>
            <option value="annual">按年付费（12个月）</option>
            <option value="no-expiry">一次性不限时流量包</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cost-price" className="block font-semibold text-ink">实付总金额（元）</label>
          <input
            id="cost-price"
            type="number"
            min={1}
            value={priceInput}
            onChange={(e) => setPriceInput(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-ink"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cost-traffic" className="block font-semibold text-ink">
            {cycleInput === 'no-expiry' ? '一次性总流量（GB）' : '每月可用流量（GB）'}
          </label>
          <input
            id="cost-traffic"
            type="number"
            min={1}
            value={trafficInput}
            onChange={(e) => setTrafficInput(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-ink"
          />
        </div>

        {cycleInput === 'no-expiry' ? (
          <div className="space-y-1.5">
            <label htmlFor="cost-months" className="block font-semibold text-ink">预计用完月数（月）</label>
            <input
              id="cost-months"
              type="number"
              min={1}
              max={60}
              value={expectedMonthsForNoExpiry}
              onChange={(e) => setExpectedMonthsForNoExpiry(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-ink"
            />
          </div>
        ) : (
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5 flex flex-col justify-center">
            <div className="text-[11px] text-ink-faint">周期总计可用流量</div>
            <div className="text-sm font-mono font-bold text-ink tabular-nums">{calc.totalTraffic} GB</div>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-observatory-bg border border-observatory-border text-observatory-text p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div>
          <div className="text-[11px] text-observatory-muted font-sans">折算月均成本</div>
          <div className="text-xl font-bold text-observatory-cyan tabular-nums mt-0.5">¥{calc.monthlyCost} / 月</div>
        </div>
        <div>
          <div className="text-[11px] text-observatory-muted font-sans">每 GB 流量真实单价</div>
          <div className="text-xl font-bold text-observatory-emerald tabular-nums mt-0.5">¥{calc.perGb} / GB</div>
        </div>
        <div>
          <div className="text-[11px] text-observatory-muted font-sans">风险提示</div>
          <div className="text-xs font-sans text-observatory-text mt-1 leading-relaxed">
            {cycleInput === 'monthly'
              ? '按月付费锁定资金最低，适合首次试水检验晚高峰。'
              : '长周期或一次性大额包存在运营变动风险，建议先月付验证后再升级。'}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-ink mb-2.5">数据库内“不限时一次性包”单位 GB 成本对比参考：</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {noExpiryBenchmarks.map((p, idx) => {
            const b = brandMap[p.brandSlug];
            return (
              <a
                key={`${p.brandSlug}-${idx}`}
                href={b?.reviewUrl || '/brands/'}
                className="rounded-lg border border-slate-200 p-3 hover:border-brand/50 transition-colors"
              >
                <div className="text-xs font-bold text-ink">{b?.name} · {p.planName}</div>
                <div className="mt-1 flex items-center justify-between text-xs font-mono text-ink-muted tabular-nums">
                  <span>¥{p.priceCny} / {p.trafficGb}GB</span>
                  <span className="text-brand font-bold">¥{p.costPerGbCny}/GB</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
