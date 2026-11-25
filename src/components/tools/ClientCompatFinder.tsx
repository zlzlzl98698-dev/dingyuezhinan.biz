import { useMemo, useState } from 'react';

interface ClientItem {
  slug: string;
  name: string;
  category: string;
  platforms: string[];
  cores: string[];
  pricing: string;
  summary: string;
}

interface CompatBrand {
  brandSlug: string;
  brandName: string;
  mode: string;
  modeLabel: string;
  supportsThirdPartySubscription: boolean;
}

interface Props {
  clients: ClientItem[];
  compatBrands: CompatBrand[];
}

const PLATFORMS = ['全部平台', 'Windows', 'macOS', 'Android', 'iOS', 'Linux', 'OpenWrt'];

export default function ClientCompatFinder({ clients, compatBrands }: Props) {
  const [platform, setPlatform] = useState('全部平台');
  const [selectedBrandSlug, setSelectedBrandSlug] = useState('guangsuyun');

  const filteredClients = useMemo(() => {
    if (platform === '全部平台') return clients;
    return clients.filter((c) => c.platforms.includes(platform));
  }, [clients, platform]);

  const brandInfo = useMemo(
    () => compatBrands.find((b) => b.brandSlug === selectedBrandSlug),
    [compatBrands, selectedBrandSlug]
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
      <div className="border-b border-slate-100 pb-4">
        <div className="text-xs font-mono text-brand uppercase tracking-wider">Client Compatibility Matrix</div>
        <h2 className="text-lg font-bold text-ink mt-0.5">设备平台与机场订阅客户端兼容查询器</h2>
        <p className="text-xs text-ink-muted mt-1">
          选择你的目标机场品牌与使用设备，立即确认该品牌是否支持 Clash / Shadowrocket 等第三方通用客户端。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <label htmlFor="compat-brand" className="block font-semibold text-ink">1. 选择待核查的机场品牌</label>
          <select
            id="compat-brand"
            value={selectedBrandSlug}
            onChange={(e) => setSelectedBrandSlug(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink"
          >
            {compatBrands.map((b) => (
              <option key={b.brandSlug} value={b.brandSlug}>
                {b.brandName}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="compat-os" className="block font-semibold text-ink">2. 筛选你的操作系统</label>
          <select
            id="compat-os"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-ink"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {brandInfo && (
        <div
          className={`rounded-lg border p-4 text-xs leading-relaxed ${
            brandInfo.supportsThirdPartySubscription
              ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
              : 'border-amber-200 bg-amber-50/80 text-amber-950'
          }`}
        >
          <div className="font-bold text-sm mb-1">
            {brandInfo.brandName} 兼容性结论：{brandInfo.modeLabel}
          </div>
          <p>
            {brandInfo.supportsThirdPartySubscription
              ? '资料记录该品牌支持导入通用第三方订阅。你可以在下方按系统挑选开源客户端（如 Clash Verge Rev、v2rayN、Shadowrocket 等）。'
              : '提示：该品牌资料标注为仅用专属客户端或订阅方式待核实，不可直接假定支持 Clash / Shadowrocket / OpenWrt 软路由。'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredClients.map((c) => (
          <a
            key={c.slug}
            href={`/clients/${c.slug}/`}
            className="rounded-lg border border-slate-200 p-3.5 hover:border-brand/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="text-sm font-bold text-ink">{c.name}</div>
              <div className="text-[11px] font-mono text-brand mt-0.5">{c.platforms.join(' · ')}</div>
              <p className="mt-2 text-xs text-ink-muted line-clamp-2">{c.summary}</p>
            </div>
            <div className="mt-3 text-[11px] text-ink-faint font-mono">内核：{c.cores.join(', ')}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
