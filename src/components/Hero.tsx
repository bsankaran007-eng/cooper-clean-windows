import { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Sparkles, Star } from 'lucide-react';
import {
  BRAND_NAME,
  ESTIMATE_CTA_LABEL,
  HERO_IMAGE,
  PHONE_CTA_LABEL,
  PHONE_HREF,
} from '../data/siteContent';

interface HeroProps {
  onScrollToEstimate: () => void;
}

const TRUST_METRICS = [
  {
    value: '5.0 / 5',
    label: 'Rated by Tyler & Lindale Homeowners',
    accent: 'amber' as const,
  },
  {
    value: '180+',
    label: 'East Texas Homes & Storefronts Cleaned',
    accent: 'blue' as const,
  },
  {
    value: '7-Day',
    label: 'Streak-Free & Rain Guarantee',
    accent: 'green' as const,
  },
  {
    value: 'Same-Week',
    label: 'Fast Local Scheduling & Text Quotes',
    accent: 'navy' as const,
  },
];

export default function Hero({ onScrollToEstimate }: HeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#0f172a] to-[#13223b] text-white"
    >
      {/* Subtle architectural sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.16),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14 lg:px-8 lg:pb-20 lg:pt-16">
        {/* Two-column balanced hero split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Copy Column */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-sm font-semibold tracking-[0.02em] text-[#38bdf8]">
              Tyler &amp; Lindale, Texas <span aria-hidden="true">·</span> Residential &amp; Commercial <span aria-hidden="true">·</span> Fully Insured
            </p>

            <h1 className="mt-4 max-w-xl text-balance text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[48px] lg:leading-[1.14]">
              Crystal-Clear Windows &amp; Spotless Powerwashing for East Texas Homes
            </h1>

            <p className="mt-5 max-w-[56ch] text-base leading-[1.6] text-slate-300 sm:text-[17px]">
              {BRAND_NAME} restores your curb appeal with streak-free pure-water window detailing, gentle house soft washing, and commercial-grade concrete powerwashing—backed by dependable local service.
            </p>

            {/* Primary & Secondary Action Row */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={onScrollToEstimate}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#0284c7] px-7 py-3.5 text-[15px] font-semibold whitespace-nowrap text-white shadow-[0_6px_20px_-2px_rgba(2,132,199,0.45)] transition-all duration-150 hover:bg-[#0369a1] hover:shadow-[0_10px_24px_-4px_rgba(56,189,248,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] active:scale-[0.98]"
              >
                <span>{ESTIMATE_CTA_LABEL}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={PHONE_HREF}
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-slate-600/80 bg-white/10 px-6 py-3.5 text-[15px] font-semibold whitespace-nowrap text-white backdrop-blur-sm transition-all duration-150 hover:border-[#38bdf8] hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
              >
                <Phone className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
                <span className="tabular-nums">{PHONE_CTA_LABEL}</span>
              </a>
            </div>

            {/* Quiet Guarantee Proof Line */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#10b981]" aria-hidden="true" />
                <span>Free written quotes—no surprise fees</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
                <span>Plant-safe soft wash rinse</span>
              </span>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/12 bg-slate-800 shadow-[0_20px_36px_-12px_rgba(0,0,0,0.45)] sm:min-h-[340px]">
              {!imageError ? (
                <img
                  src={HERO_IMAGE}
                  alt="East Texas brick and limestone home with sparkling clean windows and a freshly powerwashed concrete driveway by Cooper Clean Windows and Powerwashing"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center bg-gradient-to-br from-[#0284c7]/30 via-[#0f172a] to-[#006194]/40 p-8 text-center">
                  <Sparkles className="h-10 w-10 text-[#38bdf8]" aria-hidden="true" />
                  <p className="mt-3 text-lg font-bold text-white">{BRAND_NAME}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Serving Tyler, Lindale, and surrounding East Texas neighborhoods
                  </p>
                </div>
              )}

              {/* Measured bottom caption scrim */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/45 to-transparent px-5 pb-4 pt-12">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-200 sm:text-sm">
                  <span className="font-semibold text-white">
                    {BRAND_NAME}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#fef3c7]">
                    <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
                    <span className="tabular-nums font-semibold">5.0 Local Rating</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Trust Strip below the Hero Split */}
        <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-8 sm:gap-4 lg:mt-12 lg:grid-cols-4">
          {TRUST_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4"
            >
              <p
                className={`text-xl font-extrabold tracking-tight tabular-nums sm:text-2xl ${
                  metric.accent === 'amber'
                    ? 'text-[#f59e0b]'
                    : metric.accent === 'green'
                      ? 'text-[#10b981]'
                      : 'text-[#38bdf8]'
                }`}
              >
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium leading-snug text-slate-300 sm:text-[13px]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
