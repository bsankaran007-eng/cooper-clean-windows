import { useCallback, useRef, useState } from 'react';
import { ArrowLeftRight, ArrowRight, ImageOff } from 'lucide-react';
import {
  BEFORE_AFTER_PROJECTS,
  ESTIMATE_CTA_LABEL,
} from '../data/siteContent';
import type { ServiceId } from '../utils/estimateCalculator';

interface BeforeAfterSliderProps {
  onSelectServiceForEstimate: (serviceId: ServiceId) => void;
}

export default function BeforeAfterSlider({
  onSelectServiceForEstimate,
}: BeforeAfterSliderProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [splitPercent, setSplitPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const stageRef = useRef<HTMLDivElement | null>(null);

  const project = BEFORE_AFTER_PROJECTS[activeProjectIndex];

  const updateFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(95, Math.max(5, Math.round(raw)));
    setSplitPercent(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    }
  };

  const handleTabChange = (index: number) => {
    setActiveProjectIndex(index);
    setSplitPercent(50);
  };

  return (
    <section
      id="results"
      className="scroll-mt-16 border-y border-slate-200/80 bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#0284c7]">
              Before &amp; After Results · Drag to Compare
            </p>
            <h2 className="mt-2 text-balance text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0f172a] sm:text-[36px]">
              See the Difference a Professional Wash Makes
            </h2>
          </div>

          {/* Interactive Project Switcher Tabs */}
          <div
            role="tablist"
            aria-label="Before and after project categories"
            className="grid w-full grid-cols-2 gap-1 rounded-xl border border-slate-200/80 bg-slate-100 p-1 sm:inline-flex sm:w-auto"
          >
            {BEFORE_AFTER_PROJECTS.map((item, idx) => {
              const isSelected = idx === activeProjectIndex;
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => handleTabChange(idx)}
                  className={`min-h-[44px] rounded-lg px-2.5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] sm:px-4 sm:text-sm ${
                    isSelected
                      ? 'bg-white text-[#0f172a] shadow-sm ring-1 ring-slate-200/70'
                      : 'text-slate-600 hover:text-[#0f172a]'
                  }`}
                >
                  {item.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Interactive Split Slider Stage */}
          <div className="lg:col-span-8">
            <div
              ref={stageRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              data-testid="before-after-stage"
              data-split={splitPercent}
              className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-[0_12px_24px_-6px_rgba(15,23,42,0.08)] cursor-ew-resize"
            >
              {/* After Image (Full Background Layer) */}
              {!failedImages[project.afterImage] ? (
                <img
                  src={project.afterImage}
                  alt={project.afterAlt}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [project.afterImage]: true }))
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0284c7] to-[#0f172a] text-white">
                  <ImageOff className="h-8 w-8 text-[#38bdf8]" aria-hidden="true" />
                  <p className="mt-2 text-sm font-semibold">After Wash Preview</p>
                </div>
              )}

              {/* Before Image (Clipped Foreground Layer) */}
              <div
                style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
                className="absolute inset-0"
              >
                {!failedImages[project.beforeImage] ? (
                  <img
                    src={project.beforeImage}
                    alt={project.beforeAlt}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [project.beforeImage]: true }))
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-slate-700 text-slate-200">
                    <ImageOff className="h-8 w-8" aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold">Before Wash Preview</p>
                  </div>
                )}
              </div>

              {/* Edge Labels */}
              <span className="pointer-events-none absolute left-4 top-4 rounded-md bg-[#0f172a]/80 px-3 py-1.5 text-xs font-bold tracking-wide text-white backdrop-blur-sm">
                Before
              </span>
              <span className="pointer-events-none absolute right-4 top-4 rounded-md bg-[#0284c7]/90 px-3 py-1.5 text-xs font-bold tracking-wide text-white backdrop-blur-sm">
                After
              </span>

              {/* Sky Blue Divider Line & Pill Handle */}
              <div
                aria-hidden="true"
                style={{ left: `${splitPercent}%` }}
                className="pointer-events-none absolute inset-y-0 -translate-x-1/2"
              >
                <div className="h-full w-[3px] bg-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.65)]" />
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#38bdf8] text-[#0f172a] shadow-[0_8px_20px_rgba(15,23,42,0.35)]">
                  <ArrowLeftRight className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Accessible Keyboard & Fine Control Slider */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <label
                htmlFor="comparison-range"
                className="text-xs font-semibold text-slate-600"
              >
                Slide to inspect before &amp; after
              </label>
              <div className="flex flex-1 max-w-xs items-center gap-3">
                <input
                  id="comparison-range"
                  type="range"
                  min={5}
                  max={95}
                  value={splitPercent}
                  aria-label="Before and after comparison position"
                  onChange={(e) => setSplitPercent(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-[#0284c7]"
                />
                <span className="w-10 text-right text-xs font-bold text-slate-700 tabular-nums">
                  {splitPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Right Context Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-7 lg:col-span-4">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                {project.location} <span aria-hidden="true">·</span> {project.turnaround}
              </p>
              <h3 className="mt-2 text-2xl font-bold leading-snug tracking-[-0.015em] text-[#0f172a]">
                {project.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-slate-600">
                {project.summary}
              </p>

              <dl className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-slate-500">Surface Protection</dt>
                  <dd className="font-semibold text-[#0f172a]">Pre-soaked plants &amp; trim</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-slate-500">Finish Standard</dt>
                  <dd className="font-semibold text-[#0f172a]">Zero streaks or etch marks</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-slate-500">Service Area</dt>
                  <dd className="font-semibold text-[#0f172a]">Tyler &amp; Lindale, TX</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => onSelectServiceForEstimate(project.serviceId)}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0284c7] px-5 py-3 text-[15px] font-semibold text-white shadow-[0_6px_16px_-2px_rgba(2,132,199,0.35)] transition-all duration-150 hover:bg-[#0369a1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
              >
                <span>{ESTIMATE_CTA_LABEL}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
