import { useState } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import type { PillarNavItem } from '../../data/navigation';

interface Props {
  pillars: PillarNavItem[];
}

export default function MobileMenu({ pillars }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="xl:hidden flex items-center gap-2">
      <a
        href="/search/"
        aria-label="站内搜索"
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-ink hover:bg-slate-100"
      >
        <Search className="w-4 h-4" />
      </a>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? '关闭菜单' : '打开导航菜单'}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-ink hover:bg-slate-100"
      >
        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 bg-white border-t border-slate-200 overflow-y-auto px-4 py-5">
          <div className="max-w-lg mx-auto space-y-2 pb-12">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <span className="text-xs font-mono text-ink-faint">全站 10 大搜索专题导航</span>
              <a
                href="/brands/"
                className="text-xs font-medium text-brand hover:underline"
                onClick={() => setOpen(false)}
              >
                31家品牌数据库
              </a>
            </div>
            {pillars.map((p) => {
              const isExp = expanded === p.id;
              return (
                <div key={p.id} className="rounded-lg border border-slate-200 overflow-hidden">
                  <div className="flex items-center justify-between bg-slate-50/70 px-3 py-2.5">
                    <a
                      href={p.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-semibold text-ink hover:text-brand flex items-center gap-2"
                    >
                      <span className="font-mono text-xs text-brand">{p.order}</span>
                      <span>{p.title}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setExpanded(isExp ? null : p.id)}
                      aria-label={`展开${p.title}子栏目`}
                      className="p-1 text-ink-muted hover:text-ink"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExp ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {isExp && (
                    <div className="bg-white px-3 py-2.5 space-y-3 border-t border-slate-100">
                      {p.groups.map((g) => (
                        <div key={g.label}>
                          <div className="text-[11px] font-semibold text-ink-faint mb-1.5">{g.label}</div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {g.items.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="text-xs text-ink-muted hover:text-brand py-1 truncate"
                              >
                                {item.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
