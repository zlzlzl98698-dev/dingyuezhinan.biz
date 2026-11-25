import { useMemo, useState } from 'react';

interface BrandRecord {
  slug: string;
  name: string;
  reviewUrl: string;
  priorityRank: number;
  clientMode: string;
  entryMonthlyPriceCny: number | null;
  entryAnnualEffectiveMonthlyCny: number | null;
  hasNoExpiryPlan: boolean;
  has20260811Screenshot: boolean;
  routeType: string;
  introSummary: string;
}

interface Props {
  brands: BrandRecord[];
}

export default function SubscriptionMatcher({ brands }: Props) {
  const [needClient, setNeedClient] = useState<'any' | 'third_party' | 'proprietary'>('third_party');
  const [budget, setBudget] = useState<'low' | 'mid' | 'flexible'>('mid');
  const [cyclePref, setCyclePref] = useState<'monthly' | 'annual' | 'no-expiry'>('monthly');

  const results = useMemo(() => {
    return brands
      .filter((b) => {
        if (needClient === 'third_party' && !['third_party', 'dual'].includes(b.clientMode)) return false;
        if (needClient === 'proprietary' && !['proprietary', 'dual'].includes(b.clientMode)) return false;
        if (cyclePref === 'no-expiry' && !b.hasNoExpiryPlan) return false;
        if (cyclePref === 'monthly' && !b.entryMonthlyPriceCny) return false;
        if (budget === 'low') {
          const ref = b.entryAnnualEffectiveMonthlyCny ?? b.entryMonthlyPriceCny ?? 99;
          if (ref > 15) return false;
        }
        return true;
      })
      .slice(0, 4);
  }, [brands, needClient, budget, cyclePref]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="text-xs font-mono text-brand uppercase tracking-wider">Subscription Decision Center</div>
          <h2 className="text-lg font-bold text-ink mt-0.5">订阅需求快速匹配器（3步筛选）</h2>
        </div>
        <span className="text-[11px] font-mono text-ink-faint">按真实资料边界过滤 · 含商业精选序</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1.5">
          <label htmlFor="match-client" className="block font-semibold text-ink">1. 你偏好的客户端方式</label>
          <select
            id="match-client"
            value={needClient}
            onChange={(e) => setNeedClient(e.target.value as 'any' | 'third_party' | 'proprietary')}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-ink"
          >
            <option value="third_party">需支持 Clash / Shadowrocket 通用订阅</option>
            <option value="proprietary">希望下载专属 App 登录即用</option>
            <option value="any">不限（两者皆可）</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="match-cycle" className="block font-semibold text-ink">2. 期望计费周期</label>
          <select
            id="match-cycle"
            value={cyclePref}
            onChange={(e) => setCyclePref(e.target.value as 'monthly' | 'annual' | 'no-expiry')}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-ink"
          >
            <option value="monthly">先月付试水（低风险推荐）</option>
            <option value="annual">接受年付折算低单价</option>
            <option value="no-expiry">需要一次性不限时流量包</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="match-budget" className="block font-semibold text-ink">3. 月均预算区间</label>
          <select
            id="match-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value as 'low' | 'mid' | 'flexible')}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-ink"
          >
            <option value="low">极致入门（折算 ≤ ¥15/月）</option>
            <option value="mid">主流均衡（¥18–¥35/月）</option>
            <option value="flexible">不设限（看重专线与多档可选）</option>
          </select>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-4 text-xs text-ink-muted">
          当前组合下暂无同时满足所有条件的记录品牌（例如：低月均预算通常对应年付而非月付）。建议将周期改为“接受年付折算”或放宽预算后重试。
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((b) => (
            <a
              key={b.slug}
              href={b.reviewUrl}
              className="rounded-lg border border-slate-200 p-4 hover:border-brand/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-ink">{b.name}</span>
                  <span className="text-[11px] font-mono text-brand">
                    {b.entryMonthlyPriceCny ? `月付¥${b.entryMonthlyPriceCny}起` : `年付折算¥${b.entryAnnualEffectiveMonthlyCny}/月`}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-ink-muted line-clamp-2">{b.introSummary}</p>
              </div>
              <div className="mt-2.5 text-[11px] font-mono text-ink-faint">
                {b.routeType.split('（')[0]} · {b.has20260811Screenshot ? '含实测截图' : '资料记录'}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
