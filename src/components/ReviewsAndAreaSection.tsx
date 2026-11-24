import { ArrowRight, MapPin, Phone, Star } from 'lucide-react';
import {
  BRAND_NAME,
  ESTIMATE_CTA_LABEL,
  LOCAL_REVIEWS,
  PHONE_CTA_LABEL,
  PHONE_HREF,
  PROCESS_STEPS,
  SERVICE_AREAS,
} from '../data/siteContent';

interface ReviewsAndAreaSectionProps {
  onScrollToEstimate: () => void;
}

export default function ReviewsAndAreaSection({
  onScrollToEstimate,
}: ReviewsAndAreaSectionProps) {
  return (
    <>
      {/* Local Reviews & Simple 3-Step Process */}
      <section
        id="reviews"
        className="scroll-mt-16 border-t border-slate-200/80 bg-white py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#0284c7]">
                Verified East Texas Feedback · 5.0 Average Rating
              </p>
              <h2 className="mt-2 text-balance text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0f172a] sm:text-[36px]">
                Trusted by Neighbors Across Tyler &amp; Lindale
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#92400e]">
              <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="tabular-nums text-slate-700">
                5.0 Rating · Local East Texas Reviews
              </span>
            </div>
          </div>

          {/* 3 Attributable Review Cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {LOCAL_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <Star
                          key={idx}
                          className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-[#0284c7]">
                      {review.serviceTag}
                    </span>
                  </div>

                  <blockquote className="mt-4 text-[15px] leading-[1.6] text-slate-700">
                    “{review.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 border-t border-slate-200/80 pt-4">
                  <p className="text-sm font-bold text-[#0f172a]">{review.author}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{review.roleLocation}</p>
                  <p className="mt-2 text-xs font-semibold text-[#10b981]">
                    Outcome: {review.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* 3-Step Process Band */}
          <div className="mt-16 border-t border-slate-200 pt-14">
            <h3 className="text-xl font-bold tracking-[-0.015em] text-[#0f172a] sm:text-2xl">
              How {BRAND_NAME} Works
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {PROCESS_STEPS.map((item) => (
                <div key={item.step} className="space-y-2.5">
                  <p className="text-sm font-extrabold tracking-wide text-[#0284c7] tabular-nums">
                    {item.step}.
                  </p>
                  <h4 className="text-lg font-bold text-[#0f172a]">{item.title}</h4>
                  <p className="text-sm leading-[1.6] text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* East Texas Service Area & Conversion Band */}
      <section
        id="service-area"
        className="scroll-mt-16 border-t border-slate-200/80 bg-[#f8fafc] py-16 md:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0284c7]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Proudly Serving Smith &amp; Wood Counties</span>
              </p>
              <h2 className="mt-2 text-balance text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0f172a] sm:text-[32px]">
                Local Crews Throughout Tyler, Lindale &amp; Surrounding Towns
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
                Because {BRAND_NAME} is locally owned and operated right here in East Texas, we offer flexible arrival windows, straightforward pricing, and fast follow-up care.
              </p>

              {/* Clean Typographic Service Area List (Zero-Pill Discipline) */}
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-slate-100 pt-5 text-sm font-semibold text-[#0f172a] sm:grid-cols-4">
                {SERVICE_AREAS.map((city) => (
                  <li key={city} className="flex items-center gap-2">
                    <span className="text-[#0284c7]" aria-hidden="true">·</span>
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-sm font-semibold text-slate-700">
                Ready for spotless glass and bright concrete?
              </p>
              <button
                type="button"
                onClick={onScrollToEstimate}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0284c7] px-6 text-[15px] font-semibold text-white shadow-[0_6px_16px_-2px_rgba(2,132,199,0.35)] transition-all duration-150 hover:bg-[#0369a1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
              >
                <span>{ESTIMATE_CTA_LABEL}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={PHONE_HREF}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0f172a] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
              >
                <Phone className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
                <span className="tabular-nums">{PHONE_CTA_LABEL}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
