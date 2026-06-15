export interface CurrencyFormatOptions {
  /** Append "/yr" for per-annum amounts. */
  perYear?: boolean;
  /** Always show an explicit leading sign (+ for positive). Negatives always show a minus. */
  signed?: boolean;
}

/**
 * Single source of truth for currency display across the projection feature.
 * Australian formatting, whole dollars, with a true minus sign (U+2212) for negatives.
 */
export function formatCurrency(value: number, options: CurrencyFormatOptions = {}): string {
  const { perYear = false, signed = false } = options;
  const sign = value < 0 ? '−' : signed ? '+' : '';
  const amount = Math.abs(value).toLocaleString('en-AU', { maximumFractionDigits: 0 });
  return `${sign}$${amount}${perYear ? '/yr' : ''}`;
}
