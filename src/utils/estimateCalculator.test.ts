import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimateRange,
  clampSquareFeet,
  clampStories,
  formatPhoneDisplay,
  validateEstimateForm,
} from './estimateCalculator';

test('calculateEstimateRange returns zero totals when no services are selected', () => {
  const result = calculateEstimateRange({
    selectedServices: [],
    squareFeet: 2200,
    stories: 1,
    propertyType: 'residential',
  });
  assert.equal(result.low, 0);
  assert.equal(result.high, 0);
  assert.equal(result.hasBundleDiscount, false);
  assert.equal(result.breakdown.length, 0);
});

test('calculateEstimateRange applies 10% bundle discount when 2 or more services are selected', () => {
  const single = calculateEstimateRange({
    selectedServices: ['windows'],
    squareFeet: 2000,
    stories: 1,
    propertyType: 'residential',
  });
  assert.equal(single.hasBundleDiscount, false);
  assert.equal(single.bundleSavingsLow, 0);

  const bundled = calculateEstimateRange({
    selectedServices: ['windows', 'driveway'],
    squareFeet: 2000,
    stories: 1,
    propertyType: 'residential',
  });
  assert.equal(bundled.hasBundleDiscount, true);
  assert.ok(bundled.bundleSavingsLow > 0);
  assert.equal(bundled.low, bundled.subtotalLow - bundled.bundleSavingsLow);
  assert.ok(bundled.high > bundled.low);
});

test('calculateEstimateRange increases window price for multi-story homes and commercial properties', () => {
  const oneStory = calculateEstimateRange({
    selectedServices: ['windows'],
    squareFeet: 2500,
    stories: 1,
    propertyType: 'residential',
  });
  const twoStory = calculateEstimateRange({
    selectedServices: ['windows'],
    squareFeet: 2500,
    stories: 2,
    propertyType: 'residential',
  });
  const commercial = calculateEstimateRange({
    selectedServices: ['windows'],
    squareFeet: 2500,
    stories: 2,
    propertyType: 'commercial',
  });

  assert.ok(twoStory.low > oneStory.low);
  assert.ok(commercial.low > twoStory.low);
});

test('clampSquareFeet and clampStories enforce valid bounds', () => {
  assert.equal(clampSquareFeet(200), 800);
  assert.equal(clampSquareFeet(99999), 6000);
  assert.equal(clampStories(0), 1);
  assert.equal(clampStories(7), 3);
});

test('formatPhoneDisplay formats partial and full 10-digit numbers cleanly', () => {
  assert.equal(formatPhoneDisplay('4303228412'), '(430) 322-8412');
  assert.equal(formatPhoneDisplay('430322'), '(430) 322');
});

test('validateEstimateForm catches missing required fields and invalid formats', () => {
  const invalid = validateEstimateForm(
    {
      fullName: ' ',
      phone: '12345',
      email: 'not-an-email',
      city: '',
      notes: '',
    },
    []
  );
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.services);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.city);
  assert.ok(invalid.errors.email);

  const valid = validateEstimateForm(
    {
      fullName: 'Hannah Mitchell',
      phone: '(430) 555-0192',
      email: '',
      city: 'Tyler, TX',
      notes: 'Front windows and back patio',
    },
    ['windows', 'driveway']
  );
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});
