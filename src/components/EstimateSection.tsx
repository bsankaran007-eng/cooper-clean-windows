import { useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Minus,
  Phone,
  Plus,
  RotateCcw,
} from 'lucide-react';
import {
  BRAND_NAME,
  PHONE_CTA_LABEL,
  PHONE_HREF,
  SERVICE_AREAS,
  SERVICES,
} from '../data/siteContent';
import {
  calculateEstimateRange,
  clampSquareFeet,
  clampStories,
  formatPhoneDisplay,
  generateEstimateReference,
  MAX_SQFT,
  MAX_STORIES,
  MIN_SQFT,
  MIN_STORIES,
  SQFT_STEP,
  validateEstimateForm,
  type EstimateFormValues,
  type PropertyType,
  type ServiceId,
  type ValidationErrors,
} from '../utils/estimateCalculator';

interface EstimateSectionProps {
  selectedServices: ServiceId[];
  onToggleService: (serviceId: ServiceId) => void;
}

interface SubmittedLead {
  referenceId: string;
  values: EstimateFormValues;
  propertyType: PropertyType;
  squareFeet: number;
  stories: number;
  low: number;
  high: number;
  serviceLabels: string[];
}

export default function EstimateSection({
  selectedServices,
  onToggleService,
}: EstimateSectionProps) {
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [squareFeet, setSquareFeet] = useState<number>(2250);
  const [stories, setStories] = useState<number>(1);
  const [formValues, setFormValues] = useState<EstimateFormValues>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Tyler, TX',
    notes: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submittedLead, setSubmittedLead] = useState<SubmittedLead | null>(null);

  const estimate = calculateEstimateRange({
    selectedServices,
    squareFeet,
    stories,
    propertyType,
  });

  const adjustSqFt = (delta: number) => {
    setSquareFeet((prev) => clampSquareFeet(prev + delta));
  };

  const adjustStories = (delta: number) => {
    setStories((prev) => clampStories(prev + delta));
  };

  const handleFieldChange = (field: keyof EstimateFormValues, value: string) => {
    const nextValue = field === 'phone' ? formatPhoneDisplay(value) : value;
    setFormValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field as keyof ValidationErrors];
        return updated;
      });
    }
  };

  const handleServiceToggle = (serviceId: ServiceId) => {
    onToggleService(serviceId);
    if (errors.services) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.services;
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateEstimateForm(formValues, selectedServices);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedLead({
      referenceId: generateEstimateReference(),
      values: { ...formValues },
      propertyType,
      squareFeet,
      stories,
      low: estimate.low,
      high: estimate.high,
      serviceLabels: estimate.breakdown.map((item) => item.label),
    });
  };

  const handleResetSubmission = () => {
    setSubmittedLead(null);
    setFormValues({
      fullName: '',
      phone: '',
      email: '',
      city: 'Tyler, TX',
      notes: '',
    });
    setErrors({});
  };

  return (
    <section
      id="estimate-form"
      className="scroll-mt-16 bg-[#f8fafc] py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#0284c7]">
            Free Estimate · Instant Ballpark &amp; Written Quote
          </p>
          <h2 className="mt-2 text-balance text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0f172a] sm:text-[36px]">
            Get Your Free Estimate in Under a Minute
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Configure your property below to see a transparent ballpark price from {BRAND_NAME}, then send your details for an exact written quote—or call/text us directly.
          </p>
        </div>

        {/* Main 12-Column Split */}
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left: Calculator Controls + Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] sm:p-8 lg:col-span-7">
            {submittedLead ? (
              <div
                data-testid="estimate-confirmation"
                className="py-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-[#10b981]">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </div>

                <p className="mt-4 text-xs font-bold tracking-wide text-[#10b981] uppercase">
                  Estimate Request Received · Ref #{submittedLead.referenceId}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-[-0.015em] text-[#0f172a]">
                  Thank You, {submittedLead.values.fullName}!
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                  {BRAND_NAME} has your project summary ready. We typically respond by text or call within 2 business hours with your confirmed price and open arrival windows.
                </p>

                <dl className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-5 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-slate-500">Estimated Range</dt>
                    <dd className="font-bold text-[#0284c7] tabular-nums">
                      ${submittedLead.low} – ${submittedLead.high}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-slate-500">Services</dt>
                    <dd className="text-right font-semibold text-[#0f172a]">
                      {submittedLead.serviceLabels.join(', ')}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-slate-500">Property</dt>
                    <dd className="font-semibold text-[#0f172a] tabular-nums">
                      {submittedLead.propertyType === 'residential' ? 'Residential' : 'Commercial'} ·{' '}
                      {submittedLead.squareFeet.toLocaleString()} sq ft · {submittedLead.stories}{' '}
                      {submittedLead.stories === 1 ? 'Story' : 'Stories'}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <dt className="text-slate-500">Contact</dt>
                    <dd className="font-semibold text-[#0f172a] tabular-nums">
                      {submittedLead.values.phone} · {submittedLead.values.city}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#0f172a] px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    <Phone className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
                    <span className="tabular-nums">{PHONE_CTA_LABEL}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleResetSubmission}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>Request Another Estimate</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                {/* Step 1: Property Type */}
                <div>
                  <span className="block text-sm font-bold text-[#0f172a]">
                    1. Property Type
                  </span>
                  <div className="mt-2.5 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                    {(['residential', 'commercial'] as const).map((type) => {
                      const active = propertyType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          aria-pressed={active}
                          className={`min-h-[44px] rounded-lg px-4 text-sm font-semibold capitalize transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] ${
                            active
                              ? 'bg-white text-[#0f172a] shadow-sm'
                              : 'text-slate-600 hover:text-[#0f172a]'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Services */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="block text-sm font-bold text-[#0f172a]">
                      2. Choose Services
                    </span>
                    <span className="text-xs font-medium text-[#0284c7]">
                      Select 2+ for 10% bundle savings
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {SERVICES.map((service) => {
                      const checked = selectedServices.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => handleServiceToggle(service.id)}
                          className={`flex min-h-[56px] items-center justify-between gap-3 rounded-xl border-[1.5px] px-4 py-3 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] ${
                            checked
                              ? 'border-[#0284c7] bg-[#e0f2fe]/45 text-[#0f172a]'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span className="text-sm font-semibold leading-snug">
                            {service.title}
                          </span>
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                              checked
                                ? 'border-[#0284c7] bg-[#0284c7] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {checked && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {errors.services && (
                    <p
                      role="alert"
                      className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{errors.services}</span>
                    </p>
                  )}
                </div>

                {/* Step 3: Oversized Numeric Steppers (Mobile Thumb Friendly) */}
                <div>
                  <span className="block text-sm font-bold text-[#0f172a]">
                    3. Property Size &amp; Stories
                  </span>

                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Square Footage Stepper */}
                    <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                      <span className="block text-xs font-semibold text-slate-500">
                        Approx. Square Footage
                      </span>
                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          aria-label="Decrease square footage"
                          onClick={() => adjustSqFt(-SQFT_STEP)}
                          disabled={squareFeet <= MIN_SQFT}
                          className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-300 bg-white text-[#0f172a] transition-colors hover:border-[#0284c7] hover:text-[#0284c7] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
                        >
                          <Minus className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <output
                          aria-live="polite"
                          data-testid="sqft-value"
                          className="text-lg font-extrabold text-[#0f172a] tabular-nums"
                        >
                          {squareFeet.toLocaleString()} sq ft
                        </output>
                        <button
                          type="button"
                          aria-label="Increase square footage"
                          onClick={() => adjustSqFt(SQFT_STEP)}
                          disabled={squareFeet >= MAX_SQFT}
                          className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-300 bg-white text-[#0f172a] transition-colors hover:border-[#0284c7] hover:text-[#0284c7] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
                        >
                          <Plus className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Stories Stepper */}
                    <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
                      <span className="block text-xs font-semibold text-slate-500">
                        Building Stories
                      </span>
                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          aria-label="Decrease stories"
                          onClick={() => adjustStories(-1)}
                          disabled={stories <= MIN_STORIES}
                          className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-300 bg-white text-[#0f172a] transition-colors hover:border-[#0284c7] hover:text-[#0284c7] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
                        >
                          <Minus className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <output
                          aria-live="polite"
                          data-testid="stories-value"
                          className="text-lg font-extrabold text-[#0f172a] tabular-nums"
                        >
                          {stories} {stories === 1 ? 'Story' : 'Stories'}
                        </output>
                        <button
                          type="button"
                          aria-label="Increase stories"
                          onClick={() => adjustStories(1)}
                          disabled={stories >= MAX_STORIES}
                          className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-300 bg-white text-[#0f172a] transition-colors hover:border-[#0284c7] hover:text-[#0284c7] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
                        >
                          <Plus className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Contact Details */}
                <div className="border-t border-slate-100 pt-6">
                  <span className="block text-sm font-bold text-[#0f172a]">
                    4. Where Should We Send Your Free Quote?
                  </span>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="estimate-name"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Full Name *
                      </label>
                      <input
                        id="estimate-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={formValues.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        placeholder="e.g., Jordan Cooper"
                        aria-invalid={Boolean(errors.fullName)}
                        className="mt-1.5 min-h-[48px] w-full rounded-lg border-[1.5px] border-slate-300 bg-white px-3.5 text-[15px] text-[#0f172a] placeholder:text-slate-400 transition-all focus:border-[#0284c7] focus:outline-none focus:ring-[3px] focus:ring-[#38bdf8]/25"
                      />
                      {errors.fullName && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="estimate-phone"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Phone Number (Call or Text) *
                      </label>
                      <input
                        id="estimate-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formValues.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        placeholder="(430) 555-0199"
                        aria-invalid={Boolean(errors.phone)}
                        className="mt-1.5 min-h-[48px] w-full rounded-lg border-[1.5px] border-slate-300 bg-white px-3.5 text-[15px] text-[#0f172a] tabular-nums placeholder:text-slate-400 transition-all focus:border-[#0284c7] focus:outline-none focus:ring-[3px] focus:ring-[#38bdf8]/25"
                      />
                      {errors.phone && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="estimate-city"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        City / Neighborhood *
                      </label>
                      <select
                        id="estimate-city"
                        name="city"
                        value={formValues.city}
                        onChange={(e) => handleFieldChange('city', e.target.value)}
                        aria-invalid={Boolean(errors.city)}
                        className="mt-1.5 min-h-[48px] w-full rounded-lg border-[1.5px] border-slate-300 bg-white px-3.5 text-[15px] text-[#0f172a] transition-all focus:border-[#0284c7] focus:outline-none focus:ring-[3px] focus:ring-[#38bdf8]/25"
                      >
                        {SERVICE_AREAS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                        <option value="Other East Texas Area">Other East Texas Area</option>
                      </select>
                      {errors.city && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.city}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="estimate-email"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="estimate-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formValues.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className="mt-1.5 min-h-[48px] w-full rounded-lg border-[1.5px] border-slate-300 bg-white px-3.5 text-[15px] text-[#0f172a] placeholder:text-slate-400 transition-all focus:border-[#0284c7] focus:outline-none focus:ring-[3px] focus:ring-[#38bdf8]/25"
                      />
                      {errors.email && (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="estimate-notes"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      Project Notes (Optional)
                    </label>
                    <textarea
                      id="estimate-notes"
                      name="notes"
                      rows={3}
                      value={formValues.notes}
                      onChange={(e) => handleFieldChange('notes', e.target.value)}
                      placeholder="Tell us about hard-to-reach second-story windows, patio staining, or preferred days..."
                      className="mt-1.5 w-full rounded-lg border-[1.5px] border-slate-300 bg-white px-3.5 py-3 text-[15px] text-[#0f172a] placeholder:text-slate-400 transition-all focus:border-[#0284c7] focus:outline-none focus:ring-[3px] focus:ring-[#38bdf8]/25"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#0284c7] px-6 text-[15px] font-semibold text-white shadow-[0_6px_16px_-2px_rgba(2,132,199,0.4)] transition-all duration-150 hover:bg-[#0369a1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] active:scale-[0.99]"
                  >
                    Send My Free Estimate Request
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Deep Navy Instant Summary Panel */}
          <aside className="rounded-2xl bg-[#0f172a] p-6 text-white shadow-[0_20px_32px_-8px_rgba(15,23,42,0.18)] sm:p-8 lg:sticky lg:top-24 lg:col-span-5">
            <p className="text-xs font-bold tracking-wide text-[#38bdf8] uppercase">
              Instant Estimate Preview
            </p>

            <div className="mt-3 flex items-baseline gap-2">
              {estimate.low > 0 ? (
                <p
                  data-testid="live-estimate-range"
                  className="text-4xl font-extrabold tracking-tight text-white tabular-nums sm:text-[42px]"
                >
                  ${estimate.low} – ${estimate.high}
                </p>
              ) : (
                <p
                  data-testid="live-estimate-range"
                  className="text-2xl font-bold text-slate-300"
                >
                  Select a service
                </p>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
              <Clock className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
              <span className="tabular-nums">{estimate.estimatedHoursLabel}</span>
            </div>

            {/* Line Item Breakdown */}
            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
              {estimate.breakdown.length > 0 ? (
                <>
                  {estimate.breakdown.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <span className="text-slate-300">{item.label}</span>
                      <span className="shrink-0 font-semibold text-white tabular-nums">
                        ${item.low}–${item.high}
                      </span>
                    </div>
                  ))}

                  {estimate.hasBundleDiscount && (
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-[#10b981]">
                      <span className="font-semibold">Multi-Service Bundle (10% Off)</span>
                      <span className="font-bold tabular-nums">
                        −${estimate.bundleSavingsLow} to −${estimate.bundleSavingsHigh}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-slate-400">
                  Check one or more exterior services on the left to calculate an instant ballpark price.
                </p>
              )}
            </div>

            {/* Direct Call / Text Box */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm font-semibold text-white">
                Prefer a quick text quote with photos?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                Text a few photos of your windows or driveway directly to {BRAND_NAME} for same-day pricing.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-[#38bdf8]/40 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:border-[#38bdf8] hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
              >
                <Phone className="h-4 w-4 text-[#38bdf8]" aria-hidden="true" />
                <span className="tabular-nums">{PHONE_CTA_LABEL}</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
