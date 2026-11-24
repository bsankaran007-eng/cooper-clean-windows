import type { ServiceId } from '../utils/estimateCalculator';

export const BRAND_NAME = 'Cooper Clean Windows and Powerwashing';
export const PHONE_DISPLAY = '(430) 322-8412';
export const PHONE_CTA_LABEL = 'Call or Text: (430) 322-8412';
export const PHONE_HREF = 'tel:+14303228412';
export const ESTIMATE_CTA_LABEL = 'Get a Free Estimate';

export const HERO_IMAGE = '/src/assets/images/hero_clean_home_1795546152524.jpg';

export interface ServiceOffering {
  id: ServiceId;
  kicker: string;
  title: string;
  ctaLabel: string;
  summary: string;
  startingPrice: string;
  featured?: boolean;
  checklist: string[];
}

export const SERVICES: ServiceOffering[] = [
  {
    id: 'windows',
    kicker: 'Residential & Storefront Glass',
    title: 'Pure-Water & Hand Window Cleaning',
    ctaLabel: 'Estimate Window Cleaning',
    summary:
      'Deionized pure-water rinses and hand-detailed squeegee finishing lift East Texas pine pollen, hard water spots, and bug residue without leaving streaks.',
    startingPrice: 'From $150',
    featured: true,
    checklist: [
      'Exterior & interior glass cleaned edge-to-edge',
      'Window frames, tracks, and sills wiped clean',
      'Mesh screens hand-washed and reinstalled safely',
      'Spot-free dry with 7-day rain guarantee',
    ],
  },
  {
    id: 'driveway',
    kicker: 'Surface Restoration',
    title: 'Driveway & Concrete Powerwashing',
    ctaLabel: 'Estimate Driveway Wash',
    summary:
      'Commercial rotary surface cleaners strip black algae, red East Texas clay, and oil weathering evenly—zero tiger striping or etched concrete.',
    startingPrice: 'From $165',
    checklist: [
      'Driveways, front walkways, curbs & back patios',
      'Pre- and post-treatment to slow algae regrowth',
      'Pool decks & brick entryways brightened safely',
    ],
  },
  {
    id: 'house-wash',
    kicker: 'Low-Pressure Exterior Care',
    title: 'House Soft Washing',
    ctaLabel: 'Estimate House Soft Wash',
    summary:
      'Gentle biodegradable cleaning solutions dissolve green mildew and cobwebs on brick, limestone, Hardy board, vinyl, and painted stucco without high-pressure damage.',
    startingPrice: 'From $245',
    checklist: [
      'Safe for painted trim, soffits, eaves & brick mortar',
      'Pre-soaked landscaping and plant-safe rinse protocol',
      'Removes spider webs, mud dauber nests & algae',
    ],
  },
  {
    id: 'gutters',
    kicker: 'Drainage & Trim Detail',
    title: 'Gutter Brightening & Flush',
    ctaLabel: 'Estimate Gutter Cleaning',
    summary:
      'Clear pine needles out of downspouts and scrub away stubborn dark electrostatic tiger stripes along white aluminum fascia and gutters.',
    startingPrice: 'From $125',
    checklist: [
      'Hand-bagged debris removal & downspout flow test',
      'Exterior gutter face oxidation & stripe removal',
      'Clean roof-edge finish that frames your home',
    ],
  },
];

export interface ComparisonProject {
  id: string;
  tabLabel: string;
  title: string;
  location: string;
  turnaround: string;
  summary: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  serviceId: ServiceId;
}

export const BEFORE_AFTER_PROJECTS: ComparisonProject[] = [
  {
    id: 'driveway-wash',
    tabLabel: 'Driveway Wash',
    title: 'Algae-Stained Concrete Restored to Bright Stone',
    location: 'Hollytree, Tyler, TX',
    turnaround: 'Completed in 2.5 hours',
    summary:
      'Rotary surface cleaning paired with an algae-neutralizing post-treatment lifted five years of black East Texas humidity buildup without etching the slab.',
    beforeImage: '/src/assets/images/driveway_before_1795546152527.jpg',
    afterImage: '/src/assets/images/driveway_after_1795546152083.jpg',
    beforeAlt: 'Concrete residential driveway darkened with black algae streaks and weathering before powerwashing',
    afterAlt: 'Spotless bright clean residential concrete driveway after rotary powerwashing',
    serviceId: 'driveway',
  },
  {
    id: 'window-clarity',
    tabLabel: 'Window Clarity',
    title: 'Pollen Film & Hard-Water Haze Removed',
    location: 'Hideaway & Lindale, TX',
    turnaround: 'Completed in 2 hours',
    summary:
      'Spring pine pollen and sprinkler mineral buildup completely cleared from multi-pane glass, frames, and sills using deionized water and hand squeegee finishing.',
    beforeImage: '/src/assets/images/windows_before_1795546152806.jpg',
    afterImage: '/src/assets/images/windows_after_1795546152562.jpg',
    beforeAlt: 'Multi-pane residential window covered in yellow pollen, dust, and hard-water streaks before cleaning',
    afterAlt: 'Crystal-clear spotless residential window reflecting blue sky after hand window cleaning',
    serviceId: 'windows',
  },
];

export interface LocalReview {
  id: string;
  author: string;
  roleLocation: string;
  serviceTag: string;
  quote: string;
  outcome: string;
}

export const LOCAL_REVIEWS: LocalReview[] = [
  {
    id: 'rev-1',
    author: 'Rachel & Greg Henderson',
    roleLocation: 'Homeowners · The Cascades, Tyler, TX',
    serviceTag: 'Full Window Cleaning + Driveway Wash',
    quote:
      'Our back windows looked foggy from two seasons of pine pollen and hard water. Cooper Clean Windows and Powerwashing arrived right on time, cleaned every screen and track, and left our driveway looking newly poured.',
    outcome: '32 windows + 3-car driveway finished in one morning',
  },
  {
    id: 'rev-2',
    author: 'David Langford',
    roleLocation: 'Homeowner · Lindale, TX',
    serviceTag: 'House Soft Wash + Gutter Brightening',
    quote:
      'They watered down every flower bed around our porch before soft-washing the brick and white soffits. Zero streaks on the gutters, straightforward pricing, and super easy to schedule by text.',
    outcome: 'Removed 4 years of north-side mildew & gutter striping',
  },
  {
    id: 'rev-3',
    author: 'Melissa Ortiz',
    roleLocation: 'Property Manager · South Broadway, Tyler, TX',
    serviceTag: 'Commercial Storefront Glass',
    quote:
      'Reliable crews are hard to find. Cooper Clean Windows and Powerwashing keeps our retail glass and entry concrete spotless every month before customers arrive.',
    outcome: 'Recurring monthly storefront & sidewalk maintenance',
  },
];

export const SERVICE_AREAS = [
  'Tyler, TX',
  'Lindale, TX',
  'Hideaway, TX',
  'Flint, TX',
  'Whitehouse, TX',
  'Bullard, TX',
  'Noonday, TX',
  'Mineola, TX',
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Text, Call, or Use the Estimator',
    detail:
      'Tell us your approximate square footage and services below, or text photos directly to (430) 322-8412 for a fast written quote.',
  },
  {
    step: '02',
    title: 'On-Time Arrival & Plant Protection',
    detail:
      'We text when we are on the way, pre-rinse all shrubs and flower beds, and protect electrical fixtures and hardware before washing.',
  },
  {
    step: '03',
    title: 'Final Walkthrough Guarantee',
    detail:
      'We walk the entire property with you before packing up. If you spot a streak or missed edge, we make it right on the spot.',
  },
];
