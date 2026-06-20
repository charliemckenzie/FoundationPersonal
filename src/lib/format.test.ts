import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, formatDateDMY, formatDateLong } from './format';

describe('formatCurrency', () => {
  it('formats whole and fractional dollars with two decimals and grouping', () => {
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(1234567.8)).toBe('$1,234,567.80');
  });

  it('rounds to two decimals', () => {
    expect(formatCurrency(1.005)).toBe('$1.01');
    expect(formatCurrency(1.004)).toBe('$1.00');
  });

  it('shows negatives with a leading minus', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });
});

describe('formatDate', () => {
  it('formats a date-only string as "D Mon YYYY"', () => {
    expect(formatDate('2026-06-05')).toBe('5 Jun 2026');
    expect(formatDate('2026-12-31')).toBe('31 Dec 2026');
    expect(formatDate('2026-01-01')).toBe('1 Jan 2026');
  });

  it('parses date-only strings by component, with no timezone shift', () => {
    // A regression guard: new Date('2026-06-05') is UTC midnight and can render
    // as the previous day in negative-offset timezones. Manual parsing must not.
    expect(formatDate('2026-06-05')).toBe('5 Jun 2026');
  });

  it('formats a full ISO timestamp (local time)', () => {
    // Local (no trailing Z) keeps the assertion timezone-independent.
    expect(formatDate('2026-06-05T10:30:00')).toBe('5 Jun 2026');
  });

  it('returns the original string when it cannot be parsed', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
    expect(formatDate('2026-13-40')).toBe('2026-13-40');
  });
});

describe('formatDateDMY', () => {
  it('formats as zero-padded "DD / MM / YYYY"', () => {
    expect(formatDateDMY('2026-06-05')).toBe('05 / 06 / 2026');
    expect(formatDateDMY('2026-12-31')).toBe('31 / 12 / 2026');
  });

  it('returns the original string when it cannot be parsed', () => {
    expect(formatDateDMY('nope')).toBe('nope');
  });
});

describe('formatDateLong', () => {
  it('formats with the full month name', () => {
    expect(formatDateLong('2026-06-05')).toBe('5 June 2026');
    expect(formatDateLong('2026-01-01')).toBe('1 January 2026');
  });

  it('returns the original string when it cannot be parsed', () => {
    expect(formatDateLong('nope')).toBe('nope');
  });
});
