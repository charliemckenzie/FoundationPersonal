import { describe, it, expect } from 'vitest';
import {
  estimatePension,
  getMinDrawdownRate,
  estimateRetirementBonus,
  RETIREMENT_BONUS_MAX,
} from './utils';

describe('estimatePension', () => {
  it('scales the published single rate by the purchase price', () => {
    // Age 67 single rate is 7320 per $100,000.
    const result = estimatePension(100000, 67, 'single');
    expect(result).not.toBeNull();
    expect(result!.annual).toBe(7320);
    expect(result!.fortnightly).toBeCloseTo(7320 / 26, 6);
  });

  it('uses the lower spouse-protection rate', () => {
    const result = estimatePension(200000, 67, 'spouse');
    expect(result!.annual).toBe(2 * 6745);
  });

  it('returns null for an age outside the rate table', () => {
    expect(estimatePension(100000, 59, 'single')).toBeNull();
    expect(estimatePension(100000, 81, 'single')).toBeNull();
  });

  it('returns null for a non-positive purchase price', () => {
    expect(estimatePension(0, 67, 'single')).toBeNull();
    expect(estimatePension(-5000, 67, 'single')).toBeNull();
  });
});

describe('getMinDrawdownRate', () => {
  it('returns the ATO bracket rate for an age', () => {
    expect(getMinDrawdownRate(64)).toBe(4);
    expect(getMinDrawdownRate(65)).toBe(5);
    expect(getMinDrawdownRate(74)).toBe(5);
    expect(getMinDrawdownRate(75)).toBe(6);
    expect(getMinDrawdownRate(80)).toBe(7);
    expect(getMinDrawdownRate(96)).toBe(14);
  });

  it('covers ages below the youngest explicit bracket', () => {
    expect(getMinDrawdownRate(50)).toBe(4);
  });
});

describe('estimateRetirementBonus', () => {
  it('returns 0.5% of the purchase price', () => {
    expect(estimateRetirementBonus(100000)).toBe(500);
  });

  it('caps the bonus at the maximum', () => {
    expect(estimateRetirementBonus(5_000_000)).toBe(RETIREMENT_BONUS_MAX);
    // The cap is reached exactly at $2,000,000 (0.5%).
    expect(estimateRetirementBonus(2_000_000)).toBe(RETIREMENT_BONUS_MAX);
  });

  it('returns 0 for a non-positive purchase price', () => {
    expect(estimateRetirementBonus(0)).toBe(0);
    expect(estimateRetirementBonus(-100)).toBe(0);
  });
});
