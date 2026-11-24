import { ArrowUpRight, Check, Droplets, Home, Sparkles, Waves } from 'lucide-react';
import { BRAND_NAME, SERVICES } from '../data/siteContent';
import type { ServiceId } from '../utils/estimateCalculator';

interface ServicesSectionProps {
  onSelectServiceForEstimate: (serviceId: ServiceId) => void;
}

function ServiceIcon({ id }: { id: ServiceId }) {
  switch (id) {
    case 'windows':
      return <Sparkles className="h-5 w-5 text-[#0284c7]" aria-hidden="true" />;
    case 'driveway':
      return <Waves className="h-5 w-5 text-[#0284c7]" aria-hidden="true" />;
    case 'house-wash':
      return <Home className="h-5 w-5 text-[#0284c7]" aria-hidden="true" />;
    case 'gutters':
      return <Droplets className="h-5 w-5 text-[#0284c7]" aria-hidden="true" />;
  }
}

export default function ServicesSection({
  onSelectServiceForEstimate,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="scroll-mt-16 bg-[#f8fafc] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0284c7]">
              Exterior Cleaning Services · Tyler &amp; Lindale, TX
            </p>
            <h2 className="mt-2 text-balance text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0f172a] sm:text-[36px]">
              Precision Washing Tailored to Every Exterior Surface
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Bundle two or more services with {BRAND_NAME} to automatically save 10% on your project estimate.
          </p>
        </div>

        {/* Asymmetric 12-Column Service Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {SERVICES.map((service, index) => {
            const spanClass =
              index === 0 || index === 3
                ? 'md:col-span-7'
                : 'md:col-span-5';

            return (
              <article
                key={service.id}
                className={`${spanClass} flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] transition-all duration-150 hover:border-[#38bdf8]/70 hover:shadow-[0_12px_24px_-6px_rgba(2,132,199,0.08)] sm:p-7`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe]">
                        <ServiceIcon id={service.id} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.02em] text-slate-500">
                          {service.kicker}
                        </p>
                        <h3 className="mt-0.5 text-xl font-bold tracking-[-0.015em] text-[#0f172a]">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-[#0369a1] tabular-nums">
                      {service.startingPrice}
                    </span>
                  </div>

                  <p className="mt-4 text-[15px] leading-[1.6] text-slate-600">
                    {service.summary}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                    {service.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-snug text-slate-700"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#10b981]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForEstimate(service.id)}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-[#0284c7] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#0284c7] transition-colors duration-150 hover:bg-[#0284c7] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] sm:w-auto"
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
