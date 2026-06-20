import { describe, it, expect } from 'vitest';
import { ordinal, allocationsEqual, summariseMix, validateStep3 } from './utils';
import type { InvestmentOption } from './types';

function option(id: string, name: string): InvestmentOption {
  return {
    id,
    name,
    category: 'diversified',
    riskLevel: 'medium',
    returnProfile: 'balanced',
    currentAllocation: 0,
    annualFee: 0.7,
  };
}

const OPTIONS = [option('hg', 'High Growth'), option('bal', 'Balanced'), option('cash', 'Cash')];

describe('ordinal', () => {
  it('maps a zero-based index to its ordinal', () => {
    expect(ordinal(0)).toBe('1st');
    expect(ordinal(1)).toBe('2nd');
    expect(ordinal(2)).toBe('3rd');
  });

  it('falls back to "Nth" beyond the lookup table', () => {
    expect(ordinal(20)).toBe('21th');
  });
});

describe('allocationsEqual', () => {
  it('treats absent and zero entries as equivalent', () => {
    expect(allocationsEqual({ hg: 60, bal: 40 }, { hg: 60, bal: 40, cash: 0 })).toBe(true);
  });

  it('detects a differing percentage', () => {
    expect(allocationsEqual({ hg: 60, bal: 40 }, { hg: 50, bal: 50 })).toBe(false);
  });

  it('detects a differing set of options', () => {
    expect(allocationsEqual({ hg: 100 }, { bal: 100 })).toBe(false);
  });
});

describe('summariseMix', () => {
  it('lists allocated options in option order with percentages', () => {
    expect(summariseMix(OPTIONS, { bal: 60, hg: 40 })).toBe('High Growth 40%, Balanced 60%');
  });

  it('omits zero/absent allocations', () => {
    expect(summariseMix(OPTIONS, { hg: 100, cash: 0 })).toBe('High Growth 100%');
  });
});

describe('validateStep3', () => {
  it('is valid only when allocations total 100%', () => {
    expect(validateStep3({ hg: 60, bal: 40 }, OPTIONS)).toEqual({ valid: true, total: 100 });
    expect(validateStep3({ hg: 60, bal: 30 }, OPTIONS)).toEqual({ valid: false, total: 90 });
  });

  it('tolerates floating-point rounding around 100', () => {
    expect(validateStep3({ hg: 33.33, bal: 33.33, cash: 33.34 }, OPTIONS).valid).toBe(true);
  });
});
