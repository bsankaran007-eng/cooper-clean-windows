export type ServiceId =
  | 'windows'
  | 'driveway'
  | 'house-wash'
  | 'gutters';

export type PropertyType = 'residential' | 'commercial';

export interface EstimateInput {
  selectedServices: ServiceId[];
  squareFeet: number;
  stories: number;
  propertyType: PropertyType;
}

export interface ServiceLineItem {
  id: ServiceId;
  label: string;
  low: number;
  high: number;
}

export interface EstimateResult {
  low: number;
  high: number;
  subtotalLow: number;
  subtotalHigh: number;
  hasBundleDiscount: boolean;
  bundleSavingsLow: number;
  bundleSavingsHigh: number;
  estimatedHoursLabel: string;
  breakdown: ServiceLineItem[];
}

export interface EstimateFormValues {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
}

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  city?: string;
  services?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export const MIN_SQFT = 800;
export const MAX_SQFT = 6000;
export const SQFT_STEP = 250;
export const MIN_STORIES = 1;
export const MAX_STORIES = 3;

const SERVICE_PRICING: Record<
  ServiceId,
  {
    label: string;
    baseLow: number;
    baseHigh: number;
    perSqFtLow: number;
    perSqFtHigh: number;
    storyFactor: number;
    hoursBase: number;
  }
> = {
  windows: {
    label: 'Exterior & Interior Window Cleaning',
    baseLow: 115,
    baseHigh: 145,
    perSqFtLow: 0.045,
    perSqFtHigh: 0.06,
    storyFactor: 0.22,
    hoursBase: 1.5,
  },
  driveway: {
    label: 'Driveway & Concrete Powerwashing',
    baseLow: 120,
    baseHigh: 155,
    perSqFtLow: 0.035,
    perSqFtHigh: 0.05,
    storyFactor: 0,
    hoursBase: 1.25,
  },
  'house-wash': {
    label: 'Full House Soft Wash',
    baseLow: 165,
    baseHigh: 210,
    perSqFtLow: 0.055,
    perSqFtHigh: 0.075,
    storyFactor: 0.18,
    hoursBase: 1.75,
  },
  gutters: {
    label: 'Gutter Brightening & Downspout Flush',
    baseLow: 95,
    baseHigh: 125,
    perSqFtLow: 0.02,
    perSqFtHigh: 0.03,
    storyFactor: 0.25,
    hoursBase: 1.0,
  },
};

export function clampSquareFeet(value: number): number {
  if (!Number.isFinite(value)) return 2000;
  return Math.min(MAX_SQFT, Math.max(MIN_SQFT, Math.round(value / SQFT_STEP) * SQFT_STEP));
}

export function clampStories(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(MAX_STORIES, Math.max(MIN_STORIES, Math.round(value)));
}

function roundToFive(amount: number): number {
  return Math.round(amount / 5) * 5;
}

export function calculateEstimateRange(input: EstimateInput): EstimateResult {
  const uniqueServices = Array.from(new Set(input.selectedServices)).filter(
    (id): id is ServiceId => id in SERVICE_PRICING
  );

  if (uniqueServices.length === 0) {
    return {
      low: 0,
      high: 0,
      subtotalLow: 0,
      subtotalHigh: 0,
      hasBundleDiscount: false,
      bundleSavingsLow: 0,
      bundleSavingsHigh: 0,
      estimatedHoursLabel: 'Select a service',
      breakdown: [],
    };
  }

  const sqFt = clampSquareFeet(input.squareFeet);
  const stories = clampStories(input.stories);
  const extraStories = stories - 1;
  const commercialMultiplier = input.propertyType === 'commercial' ? 1.15 : 1;

  let subtotalLow = 0;
  let subtotalHigh = 0;
  let totalHours = 0;

  const breakdown: ServiceLineItem[] = uniqueServices.map((id) => {
    const rule = SERVICE_PRICING[id];
    const storyMultiplier = 1 + extraStories * rule.storyFactor;
    const rawLow = (rule.baseLow + sqFt * rule.perSqFtLow) * storyMultiplier * commercialMultiplier;
    const rawHigh = (rule.baseHigh + sqFt * rule.perSqFtHigh) * storyMultiplier * commercialMultiplier;

    const itemLow = roundToFive(rawLow);
    const itemHigh = Math.max(itemLow + 20, roundToFive(rawHigh));

    subtotalLow += itemLow;
    subtotalHigh += itemHigh;
    totalHours += rule.hoursBase + (sqFt > 2800 ? 0.5 : 0) + extraStories * 0.25;

    return {
      id,
      label: rule.label,
      low: itemLow,
      high: itemHigh,
    };
  });

  const hasBundleDiscount = uniqueServices.length >= 2;
  const discountRate = hasBundleDiscount ? 0.1 : 0;
  const bundleSavingsLow = hasBundleDiscount ? roundToFive(subtotalLow * discountRate) : 0;
  const bundleSavingsHigh = hasBundleDiscount ? roundToFive(subtotalHigh * discountRate) : 0;

  const low = Math.max(0, subtotalLow - bundleSavingsLow);
  const high = Math.max(low + 20, subtotalHigh - bundleSavingsHigh);

  const minHours = Math.max(1, Math.floor(totalHours));
  const maxHours = Math.max(minHours + 1, Math.ceil(totalHours + 0.75));

  return {
    low,
    high,
    subtotalLow,
    subtotalHigh,
    hasBundleDiscount,
    bundleSavingsLow,
    bundleSavingsHigh,
    estimatedHoursLabel: `${minHours}–${maxHours} hrs on site`,
    breakdown,
  };
}

export function extractPhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    return digits.slice(1);
  }
  return digits;
}

export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function validateEstimateForm(
  values: EstimateFormValues,
  selectedServices: ServiceId[]
): ValidationResult {
  const errors: ValidationErrors = {};

  if (selectedServices.length === 0) {
    errors.services = 'Please select at least one service to estimate.';
  }

  const trimmedName = values.fullName.trim();
  if (trimmedName.length < 2) {
    errors.fullName = 'Enter your name so we know who to reach out to.';
  }

  const phoneDigits = extractPhoneDigits(values.phone);
  if (phoneDigits.length !== 10) {
    errors.phone = 'Enter a valid 10-digit phone number (call or text).';
  }

  const trimmedCity = values.city.trim();
  if (trimmedCity.length < 2) {
    errors.city = 'Select or enter your city in East Texas.';
  }

  const trimmedEmail = values.email.trim();
  if (trimmedEmail.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address or leave this field blank.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateEstimateReference(timestampMs: number = Date.now()): string {
  const suffix = String(timestampMs).slice(-5);
  return `CC-${suffix}`;
}
