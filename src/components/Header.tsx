import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import {
  BRAND_NAME,
  ESTIMATE_CTA_LABEL,
  PHONE_CTA_LABEL,
  PHONE_HREF,
} from '../data/siteContent';

interface HeaderProps {
  onScrollToEstimate: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Before & After', href: '#results' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Service Area', href: '#service-area' },
];

export default function Header({ onScrollToEstimate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEstimateClick = () => {
    setMobileMenuOpen(false);
    onScrollToEstimate();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-2 px-3.5 sm:gap-4 sm:px-6 md:h-16 lg:gap-8 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="whitespace-nowrap shrink-0 text-[13px] font-extrabold tracking-[-0.025em] text-[#0f172a] transition-colors hover:text-[#0284c7] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] sm:text-base lg:text-[17px]"
        >
          {BRAND_NAME}
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0284c7] hover:underline hover:decoration-[#38bdf8] hover:underline-offset-8 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38bdf8]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action (Desktop) / Menu Toggle (Mobile) */}
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={handleEstimateClick}
            className="hidden min-h-[44px] items-center justify-center rounded-full bg-[#0284c7] px-5 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 text-white shadow-[0_4px_12px_-2px_rgba(2,132,199,0.3)] transition-all duration-150 hover:bg-[#0369a1] hover:shadow-[0_6px_16px_-2px_rgba(2,132,199,0.42)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] active:scale-[0.98] lg:inline-flex"
          >
            {ESTIMATE_CTA_LABEL}
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#0f172a] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-[0_12px_24px_-6px_rgba(15,23,42,0.08)] lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[48px] items-center rounded-lg px-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#0284c7]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={handleEstimateClick}
              className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#0284c7] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0369a1]"
            >
              {ESTIMATE_CTA_LABEL}
            </button>
            <a
              href={PHONE_HREF}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <Phone className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
              <span>{PHONE_CTA_LABEL}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
