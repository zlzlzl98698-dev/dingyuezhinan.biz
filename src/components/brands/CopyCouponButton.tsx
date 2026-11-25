import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface Props {
  code: string;
  discount?: string;
  compact?: boolean;
}

export default function CopyCouponButton({ code, discount, compact = false }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const execFn = (document as unknown as Record<string, unknown>)['execCommand'];
        if (typeof execFn === 'function') {
          (execFn as (commandId: string) => boolean).call(document, 'copy');
        }
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`复制优惠码 ${code}`}
        title={copied ? '已复制到剪贴板' : `点击复制优惠码 ${code}`}
        className={`inline-flex items-center gap-1.5 mr-1.5 mb-1 px-2 py-0.5 rounded border text-xs font-mono font-semibold transition-colors ${
          copied
            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
            : 'bg-slate-100 border-slate-200 text-ink hover:border-brand-400 hover:bg-brand-50'
        }`}
      >
        <span>{code}</span>
        {copied ? (
          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
        ) : (
          <Copy className="w-3 h-3 text-ink-muted shrink-0" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`一键复制优惠码 ${code}`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
        copied
          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
          : 'bg-slate-50 border-slate-200 text-ink hover:border-brand-400 hover:bg-brand-50'
      }`}
    >
      <span className="font-mono font-bold tracking-wide">{code}</span>
      {discount && <span className="text-ink-muted">({discount})</span>}
      <span className="inline-flex items-center gap-1 pl-1 border-l border-slate-200">
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>已复制</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-brand-700" />
            <span>复制</span>
          </>
        )}
      </span>
    </button>
  );
}
