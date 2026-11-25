import { useMemo, useState } from 'react';

interface PlanEntry {
  brandSlug: string;
  planName: string;
  billingCycle: string;
  billingCycleLabel: string;
  priceCny: number | null;
  trafficGb: number | null;
  effectiveMonthlyCny: number | null;
  isNoExpiry: boolean;
  isCustom: boolean;
}

interface BrandBasic {
  slug: string;
  name: string;
  reviewUrl: string;
  priorityRank: number;
}

interface Props {
  plans: PlanEntry[];
  brands: BrandBasic[];
}

export default function TrafficCalculator({ plans, brands }: Props) {
  const [dailyWebHours, setDailyWebHours] = useState(2);
  const [dailyAiQueries, setDailyAiQueries] = useState(30);
  const [dailyVideoHours, setDailyVideoHours] = useState(1);
  const [videoQuality, setVideoQuality] = useState<'720p' | '1080p' | '4k'>('1080p');
  const [cloudSyncGb, setCloudSyncGb] = useState(10);
  const [deviceCount, setDeviceCount] = useState(2);

  const brandMap = useMemo(() => Object.fromEntries(brands.map((b) => [b.slug, b])), [brands]);

  const estimate = useMemo(() => {
    const webGb = dailyWebHours * 0.15 * 30;
    const aiGb = (dailyAiQueries * 2.5 * 30) / 1024;
    const ratePerHour = videoQuality === '4k' ? 5.5 : videoQuality === '1080p' ? 1.8 : 0.7;
    const videoGb = dailyVideoHours * ratePerHour * 30;
    const baseTotal = webGb + aiGb + videoGb + cloudSyncGb;
    const multiFactor = 1 + (deviceCount - 1) * 0.18;
    const monthlyGb = Math.max(10, Math.round(baseTotal * multiFactor));
    const recommendedWithBuffer = Math.ceil((monthlyGb * 1.25) / 10) * 10;
    return {
      webGb: Math.round(webGb),
      videoGb: Math.round(videoGb),
      aiGb: Math.round(aiGb * 10) / 10,
      monthlyGb,
      recommendedWithBuffer,
    };
  }, [dailyWebHours, dailyAiQueries, dailyVideoHours, videoQuality, cloudSyncGb, deviceCount]);

  const matchingPlans = useMemo(() => {
    return plans
      .filter((p) => !p.isCustom && !p.isNoExpiry && p.trafficGb && p.trafficGb >= estimate.recommendedWithBuffer && p.effectiveMonthlyCny)
      .sort((a, b) => (a.effectiveMonthlyCny! - b.effectiveMonthlyCny!) || (brandMap[a.brandSlug]?.priorityRank ?? 99) - (brandMap[b.brandSlug]?.priorityRank ?? 99))
      .slice(0, 6);
  }, [plans, estimate.recommendedWithBuffer, brandMap]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="text-xs font-mono text-brand uppercase tracking-wider">Interactive Traffic Estimator</div>
        <h2 className="text-lg font-bold text-ink mt-0.5">每月机场流量需求计算器与套餐匹配</h2>
        <p className="text-xs text-ink-muted mt-1">
          依据日常网页浏览、AI 对话、流媒体画质和设备并发数估算月均流量（按 1x 节点倍率计算，若使用高倍率节点需按倍率乘算）。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1.5">
          <label htmlFor="calc-web" className="block font-semibold text-ink">
            日均海外网页/资料查询（{dailyWebHours} 小时/天）
          </label>
          <input
            id="calc-web"
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={dailyWebHours}
            onChange={(e) => setDailyWebHours(Number(e.target.value))}
            className="w-full accent-brand"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="calc-video" className="block font-semibold text-ink">
            日均 YouTube/Netflix 观看（{dailyVideoHours} 小时/天）
          </label>
          <input
            id="calc-video"
            type="range"
            min={0}
            max={6}
            step={0.5}
            value={dailyVideoHours}
            onChange={(e) => setDailyVideoHours(Number(e.target.value))}
            className="w-full accent-brand"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="calc-quality" className="block font-semibold text-ink">
            常用视频画质档位
          </label>
          <select
            id="calc-quality"
            value={videoQuality}
            onChange={(e) => setVideoQuality(e.target.value as '720p' | '1080p' | '4k')}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-ink bg-white"
          >
            <option value="720p">720P 标清流畅（约 0.7GB/小时）</option>
            <option value="1080p">1080P 高清（约 1.8GB/小时）</option>
            <option value="4k">4K 超清（约 5.5GB/小时）</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="calc-ai" className="block font-semibold text-ink">
            日均 AI 工具对话次数（{dailyAiQueries} 次/天）
          </label>
          <input
            id="calc-ai"
            type="range"
            min={0}
            max={200}
            step={10}
            value={dailyAiQueries}
            onChange={(e) => setDailyAiQueries(Number(e.target.value))}
            className="w-full accent-brand"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="calc-sync" className="block font-semibold text-ink">
            每月系统更新 / 软件下载 / 网盘同步（{cloudSyncGb} GB）
          </label>
          <input
            id="calc-sync"
            type="range"
            min={0}
            max={150}
            step={5}
            value={cloudSyncGb}
            onChange={(e) => setCloudSyncGb(Number(e.target.value))}
            className="w-full accent-brand"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="calc-devices" className="block font-semibold text-ink">
            日常同时使用设备数（{deviceCount} 台）
          </label>
          <input
            id="calc-devices"
            type="range"
            min={1}
            max={6}
            step={1}
            value={deviceCount}
            onChange={(e) => setDeviceCount(Number(e.target.value))}
            className="w-full accent-brand"
          />
        </div>
      </div>

      {/* Results Banner */}
      <div className="rounded-xl bg-observatory-bg border border-observatory-border text-observatory-text p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div>
          <div className="text-[11px] text-observatory-muted font-sans">预估实际月消耗</div>
          <div className="text-xl font-bold text-white tabular-nums mt-0.5">{estimate.monthlyGb} GB</div>
        </div>
        <div>
          <div className="text-[11px] text-observatory-muted font-sans">建议选购配额（含25%冗余）</div>
          <div className="text-xl font-bold text-observatory-cyan tabular-nums mt-0.5">{estimate.recommendedWithBuffer} GB</div>
        </div>
        <div>
          <div className="text-[11px] text-observatory-muted font-sans">视频消耗占比</div>
          <div className="text-base font-semibold text-observatory-emerald tabular-nums mt-1">{estimate.videoGb} GB/月</div>
        </div>
        <div>
          <div className="text-[11px] text-observatory-muted font-sans">网页与 AI 文本</div>
          <div className="text-base font-semibold text-white tabular-nums mt-1">{Math.round(estimate.webGb + estimate.aiGb)} GB/月</div>
        </div>
      </div>

      {/* Matched Real Database Plans */}
      <div>
        <h3 className="text-sm font-bold text-ink mb-3">
          数据库内满足 ≥ {estimate.recommendedWithBuffer} GB/月 的真实记录套餐（按折算月价升序）：
        </h3>
        {matchingPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {matchingPlans.map((p, idx) => {
              const b = brandMap[p.brandSlug];
              return (
                <a
                  key={`${p.brandSlug}-${p.planName}-${idx}`}
                  href={b?.reviewUrl || '/brands/'}
                  className="rounded-lg border border-slate-200 p-3.5 hover:border-brand/50 transition-colors flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-ink">{b?.name} · {p.planName}</div>
                    <div className="text-[11px] text-ink-faint mt-0.5">
                      {p.billingCycleLabel} · {p.trafficGb} GB/月
                    </div>
                  </div>
                  <div className="text-right font-mono shrink-0">
                    <div className="text-sm font-bold text-brand tabular-nums">¥{p.effectiveMonthlyCny}/月</div>
                    <div className="text-[11px] text-ink-faint">原标 ¥{p.priceCny}</div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-ink-muted">
            你的月流量需求超过常规个人档位，可查阅 <a href="/plans/high-traffic/" className="text-brand underline">大流量机场专题</a> 对比 1TB–2TB 商业档位。
          </p>
        )}
      </div>
    </div>
  );
}
