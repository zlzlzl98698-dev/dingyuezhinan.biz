import { useMemo, useState } from 'react';
import { Search, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface BrandRecord {
  slug: string;
  name: string;
  enName: string;
  logo: string;
  thumbLogo?: string;
  tier: string;
  priorityRank: number;
  foundedYear: string | null;
  reviewUrl: string;
  routeType: string;
  protocols: string[];
  clientMode: string;
  clientModeLabel: string;
  entryMonthlyPriceCny: number | null;
  entryAnnualEffectiveMonthlyCny: number | null;
  hasNoExpiryPlan: boolean;
  has20260811Screenshot: boolean;
  has20261019Speed: boolean;
  dataStatus: string;
  conflicts: string[];
  introSummary: string;
}

interface Props {
  brands: BrandRecord[];
  affiliateMap: Record<string, { registerUrl: string | null; isHistoricalUrl: boolean }>;
}

export default function BrandCatalogFilter({ brands, affiliateMap }: Props) {
  const [query, setQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [noExpiryOnly, setNoExpiryOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'priority' | 'monthly_asc' | 'annual_asc'>('priority');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return brands
      .filter((b) => {
        if (q) {
          const hay = `${b.name} ${b.enName} ${b.routeType} ${b.protocols.join(' ')}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        if (clientFilter === 'third_party' && !['third_party', 'dual'].includes(b.clientMode)) return false;
        if (clientFilter === 'proprietary' && b.clientMode !== 'proprietary') return false;
        if (statusFilter === 'measured' && !b.has20260811Screenshot && !b.has20261019Speed) return false;
        if (statusFilter === 'conflicts' && b.conflicts.length === 0) return false;
        if (noExpiryOnly && !b.hasNoExpiryPlan) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'monthly_asc') {
          const ap = a.entryMonthlyPriceCny ?? 9999;
          const bp = b.entryMonthlyPriceCny ?? 9999;
          return ap - bp || a.priorityRank - b.priorityRank;
        }
        if (sortBy === 'annual_asc') {
          const ap = a.entryAnnualEffectiveMonthlyCny ?? 9999;
          const bp = b.entryAnnualEffectiveMonthlyCny ?? 9999;
          return ap - bp || a.priorityRank - b.priorityRank;
        }
        return a.priorityRank - b.priorityRank;
      });
  }, [brands, query, clientFilter, statusFilter, noExpiryOnly, sortBy]);

  const resetAll = () => {
    setQuery('');
    setClientFilter('all');
    setStatusFilter('all');
    setNoExpiryOnly(false);
    setSortBy('priority');
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4 space-y-1.5">
            <label htmlFor="brand-search" className="block text-xs font-semibold text-ink">
              搜索品牌名称 / 线路 / 协议
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="brand-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="例如：光速云、VLESS、IEPL..."
                className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label htmlFor="client-mode-filter" className="block text-xs font-semibold text-ink">
              客户端兼容模式
            </label>
            <select
              id="client-mode-filter"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand"
            >
              <option value="all">全部订阅方式（31家）</option>
              <option value="third_party">支持 Clash / Shadowrocket 第三方</option>
              <option value="proprietary">仅专属客户端（不提供订阅链接）</option>
            </select>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label htmlFor="status-filter" className="block text-xs font-semibold text-ink">
              资料与测速证据筛选
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand"
            >
              <option value="all">全部资料状态</option>
              <option value="measured">有测速截图或历史节点速度</option>
              <option value="conflicts">仅看含口径冲突待核实品牌</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label htmlFor="sort-select" className="block text-xs font-semibold text-ink">
              排序口径
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'priority' | 'monthly_asc' | 'annual_asc')}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand"
            >
              <option value="priority">资料推荐序列</option>
              <option value="monthly_asc">月付起步由低到高</option>
              <option value="annual_asc">年付折算由低到高</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <label className="inline-flex items-center gap-2 text-xs text-ink-muted cursor-pointer">
            <input
              type="checkbox"
              checked={noExpiryOnly}
              onChange={(e) => setNoExpiryOnly(e.target.checked)}
              className="rounded border-slate-300 text-brand focus:ring-brand"
            />
            <span>仅显示包含“不限时一次性流量包”的品牌</span>
          </label>

          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-ink-faint">
              当前匹配：<strong className="text-ink tabular-nums">{filtered.length}</strong> / {brands.length} 家
            </span>
            {(query || clientFilter !== 'all' || statusFilter !== 'all' || noExpiryOnly || sortBy !== 'priority') && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1 text-brand hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置筛选</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center space-y-3">
          <div className="text-base font-semibold text-ink">没有符合当前筛选条件的机场品牌</div>
          <p className="text-xs text-ink-muted max-w-md mx-auto">
            部分品牌因原始资料未标注具体协议或月付价格，在按价格或客户端过滤时会被排除。你可以清空条件查看完整 31 家品牌档案。
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand text-white text-xs font-medium hover:bg-brand-hover"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>恢复全部 31 家品牌</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((brand) => {
            const aff = affiliateMap[brand.slug];
            return (
              <div
                key={brand.slug}
                className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-brand/50 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={brand.thumbLogo || brand.logo}
                        alt={`${brand.name} Logo`}
                        width={42}
                        height={42}
                        loading="lazy"
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-50"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <a href={brand.reviewUrl} className="text-sm font-bold text-ink hover:text-brand truncate">
                            {brand.name}
                          </a>
                          {brand.slug === 'guangsuyun' && (
                            <span className="text-[10px] font-mono bg-brand text-white px-1.5 py-0.5 rounded shrink-0">主推</span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-ink-faint truncate">
                          #{brand.priorityRank} · {brand.foundedYear ? `${brand.foundedYear}年记录` : '年份待核实'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-ink-muted shrink-0">
                      {brand.dataStatus}
                    </span>
                  </div>

                  <div className="mt-3.5 grid grid-cols-3 gap-2 rounded-lg bg-slate-50 border border-slate-100 p-2 text-center font-mono">
                    <div>
                      <div className="text-[10px] text-ink-faint font-sans">月付起步</div>
                      <div className="text-xs font-semibold text-ink tabular-nums">
                        {brand.entryMonthlyPriceCny ? `¥${brand.entryMonthlyPriceCny}` : '待核实'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-ink-faint font-sans">年付折算</div>
                      <div className="text-xs font-semibold text-brand tabular-nums">
                        {brand.entryAnnualEffectiveMonthlyCny ? `¥${brand.entryAnnualEffectiveMonthlyCny}` : '—'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-ink-faint font-sans">测速图</div>
                      <div className="text-xs font-semibold text-ink">
                        {brand.has20260811Screenshot ? '有截图' : brand.has20261019Speed ? '数据表' : '待测'}
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-ink-muted leading-relaxed line-clamp-2">
                    {brand.introSummary}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {brand.routeType.split('（')[0]}
                    </span>
                    {brand.hasNoExpiryPlan && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3" />不限时
                      </span>
                    )}
                    {brand.conflicts.length > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 text-rose-700">
                        <AlertTriangle className="w-3 h-3" />口径冲突
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={brand.reviewUrl}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-ink"
                  >
                    评测详情
                  </a>
                  {aff?.registerUrl && !aff.isHistoricalUrl ? (
                    <a
                      href={aff.registerUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="px-3 py-1.5 rounded-lg bg-brand hover:bg-brand-hover text-white text-xs font-medium"
                    >
                      品牌注册入口
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-ink-faint">历史归档 · 无推荐入口</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
