import { Phone } from 'lucide-react';
import {
  ESTIMATE_CTA_LABEL,
  PHONE_CTA_LABEL,
  PHONE_HREF,
} from '../data/siteContent';

interface StickyMobileBarProps {
  onScrollToEstimate: () => void;
}

export default function StickyMobileBar({
  onScrollToEstimate,
}: StickyMobileBarProps) {
  return (
    <div
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-sky-400/20 bg-white/95 px-3 py-2 shadow-[0_-8px_24px_-6px_rgba(15,23,42,0.14)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <a
          href={PHONE_HREF}
          aria-label={PHONE_CTA_LABEL}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#0f172a] px-3 text-xs font-semibold whitespace-nowrap text-white transition-colors active:scale-[0.98]"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-[#38bdf8]" aria-hidden="true" />
          <span className="tabular-nums">Call / Text</span>
        </a>

        <button
          type="button"
          onClick={onScrollToEstimate}
          className="inline-flex min-h-[44px] flex-[1.35] items-center justify-center rounded-full bg-[#0284c7] px-4 text-xs font-semibold whitespace-nowrap text-white shadow-[0_4px_12px_-2px_rgba(2,132,199,0.4)] transition-colors hover:bg-[#0369a1] active:scale-[0.98]"
        >
          {ESTIMATE_CTA_LABEL}
        </button>
      </div>
    </div>
  );
}
