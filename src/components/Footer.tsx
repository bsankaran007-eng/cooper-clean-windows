import { Phone } from 'lucide-react';
import {
  BRAND_NAME,
  ESTIMATE_CTA_LABEL,
  PHONE_CTA_LABEL,
  PHONE_HREF,
} from '../data/siteContent';

interface FooterProps {
  onScrollToEstimate: () => void;
}

export default function Footer({ onScrollToEstimate }: FooterProps) {
  return (
    <footer className="bg-[#0f172a] pb-24 pt-14 text-slate-300 md:pb-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a
              href="#top"
              className="text-lg font-extrabold tracking-[-0.02em] text-white"
            >
              {BRAND_NAME}
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Dependable residential and commercial window cleaning, house soft washing, and concrete powerwashing across Tyler, Lindale, and East Texas.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
              >
                <Phone className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
                <span className="tabular-nums">{PHONE_CTA_LABEL}</span>
              </a>
              <button
                type="button"
                onClick={onScrollToEstimate}
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#0284c7] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0369a1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
              >
                {ESTIMATE_CTA_LABEL}
              </button>
            </div>
          </div>

          {/* Navigation Mirror */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-white">Navigation</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <a href="#services" className="transition-colors hover:text-[#38bdf8]">
                  Services &amp; Packages
                </a>
              </li>
              <li>
                <a href="#results" className="transition-colors hover:text-[#38bdf8]">
                  Before &amp; After
                </a>
              </li>
              <li>
                <a href="#estimate-form" className="transition-colors hover:text-[#38bdf8]">
                  Instant Estimator
                </a>
              </li>
              <li>
                <a href="#reviews" className="transition-colors hover:text-[#38bdf8]">
                  Local Reviews
                </a>
              </li>
              <li>
                <a href="#service-area" className="transition-colors hover:text-[#38bdf8]">
                  Service Area
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Coverage */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-white">Service Hours &amp; Area</h3>
            <dl className="mt-3 space-y-2 text-sm text-slate-400">
              <div className="flex justify-between gap-4">
                <dt>Monday – Saturday</dt>
                <dd className="font-medium text-slate-200 tabular-nums">7:00 AM – 6:30 PM</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sunday</dt>
                <dd className="font-medium text-slate-200">Text Quotes Open</dd>
              </div>
              <div className="flex justify-between gap-4 pt-1">
                <dt>Primary Area</dt>
                <dd className="font-medium text-slate-200">Tyler &amp; Lindale, TX</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <p>Residential &amp; Commercial Exterior Cleaning · East Texas</p>
        </div>
      </div>
    </footer>
  );
}
