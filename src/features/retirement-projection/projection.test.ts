import { describe, it, expect } from 'vitest';
import { computeProjection, toAnnual, ASSUMPTIONS } from './projection';
import { INITIAL_STATE, LIFESTYLE_TARGETS } from './constants';
import type { RetirementProjectionState } from './types';

function make(overrides: Partial<RetirementProjectionState>): RetirementProjectionState {
  return { ...INITIAL_STATE, ...overrides };
}

describe('toAnnual', () => {
  it('annualises each payment frequency', () => {
    expect(toAnnual('100', 'weekly')).toBe(5200);
    expect(toAnnual('100', 'fortnightly')).toBe(2600);
    expect(toAnnual('100', 'monthly')).toBe(1200);
    expect(toAnnual('100', 'yearly')).toBe(100);
  });

  it('treats blank, non-numeric, and non-positive amounts as zero', () => {
    expect(toAnnual('', 'weekly')).toBe(0);
    expect(toAnnual('abc', 'monthly')).toBe(0);
    expect(toAnnual('-50', 'yearly')).toBe(0);
  });

  it('falls back to the raw annual amount for an unknown frequency', () => {
    expect(toAnnual('1000', 'unknown')).toBe(1000);
  });
});

describe('computeProjection — shape & invariants', () => {
  const result = computeProjection(
    make({ currentAge: '40', retirementAge: '67', salary: '95000', superBalance: '150000', ownHome: 'yes', lifestyle: 'comfortable' }),
  );

  it('projects one row per year from current age to the planning horizon', () => {
    expect(result.years).toHaveLength(ASSUMPTIONS.planningHorizonAge - 40 + 1);
    expect(result.years[0].age).toBe(40);
    expect(result.years.at(-1)!.age).toBe(ASSUMPTIONS.planningHorizonAge);
  });

  it('returns whole-dollar figures', () => {
    expect(Number.isInteger(result.projectedBalance)).toBe(true);
    expect(Number.isInteger(result.projectedIncome)).toBe(true);
    expect(result.targetBalance).toBeGreaterThanOrEqual(0);
  });

  it('is deterministic for identical input', () => {
    const again = computeProjection(
      make({ currentAge: '40', retirementAge: '67', salary: '95000', superBalance: '150000', ownHome: 'yes', lifestyle: 'comfortable' }),
    );
    expect(again).toEqual(result);
  });
});

describe('computeProjection — target income', () => {
  it('uses the ASFA single band for a single member', () => {
    const r = computeProjection(make({ currentAge: '40', retirementAge: '67', lifestyle: 'modest' }));
    expect(r.targetIncome).toBe(LIFESTYLE_TARGETS.modest.single);
  });

  it('uses the ASFA couple band when a partner is included', () => {
    const r = computeProjection(make({ currentAge: '40', retirementAge: '67', includePartner: 'yes', lifestyle: 'comfortable' }));
    expect(r.targetIncome).toBe(LIFESTYLE_TARGETS.comfortable.couple);
  });

  it('honours a custom target', () => {
    const r = computeProjection(make({ currentAge: '40', retirementAge: '67', lifestyle: 'custom', customTarget: '80000' }));
    expect(r.targetIncome).toBe(80000);
  });
});

describe('computeProjection — on track vs shortfall', () => {
  it('a well-funded saver meets the modest target with funds lasting the horizon', () => {
    const r = computeProjection(
      make({ currentAge: '40', retirementAge: '67', salary: '120000', superBalance: '300000', ownHome: 'yes', lifestyle: 'modest' }),
    );
    expect(r.projectedIncome).toBeGreaterThanOrEqual(r.targetIncome);
    expect(r.fundsDepletedAge).toBeNull();
  });

  it('an under-funded saver falls short of a high custom target and depletes funds', () => {
    const r = computeProjection(
      make({ currentAge: '60', retirementAge: '65', salary: '40000', superBalance: '20000', lifestyle: 'custom', customTarget: '90000' }),
    );
    expect(r.projectedIncome).toBeLessThan(r.targetIncome);
    expect(r.fundsDepletedAge).not.toBeNull();
  });
});

describe('computeProjection — guards & edge cases', () => {
  it('clamps a retirement age at or below the current age to current age + 1', () => {
    const r = computeProjection(make({ currentAge: '60', retirementAge: '50', lifestyle: 'modest' }));
    expect(r.retirementAge).toBeGreaterThanOrEqual(61);
  });

  it('does not throw and returns finite numbers for the empty initial state', () => {
    const r = computeProjection(INITIAL_STATE);
    expect(Number.isFinite(r.projectedBalance)).toBe(true);
    expect(Number.isFinite(r.projectedIncome)).toBe(true);
    expect(r.years.length).toBeGreaterThan(0);
  });

  it('projects a larger household balance for a couple than a single, all else equal', () => {
    const base = { currentAge: '40', retirementAge: '67', salary: '95000', superBalance: '150000', lifestyle: 'comfortable' as const };
    const single = computeProjection(make(base));
    const couple = computeProjection(
      make({
        ...base,
        includePartner: 'yes',
        partner: { ...INITIAL_STATE.partner, age: '40', retirementAge: '67', salary: '80000', superBalance: '120000' },
      }),
    );
    expect(couple.projectedBalance).toBeGreaterThan(single.projectedBalance);
  });
});

describe('computeProjection — age pension', () => {
  it('pays some age pension in retirement for a low-balance homeowner', () => {
    const r = computeProjection(
      make({ currentAge: '60', retirementAge: '67', salary: '50000', superBalance: '50000', ownHome: 'yes', lifestyle: 'modest' }),
    );
    const retirementYears = r.years.filter((y) => y.age >= ASSUMPTIONS.pensionEligibilityAge);
    expect(retirementYears.some((y) => y.agePension > 0)).toBe(true);
  });
});
