/**
 * Canonical display formatters shared across features and member-online pages.
 *
 * Before this module these helpers were copy-pasted into 7+ feature `utils.ts`
 * files with subtly different signatures. This is the single source of truth.
 *
 * Note: `features/retirement-projection/format.ts` is intentionally NOT replaced
 * by this module — projection formats whole dollars with a true-minus sign and
 * `/yr` / signed options, which is a different contract from the 2-decimal AUD
 * display used everywhere else. Do not collapse the two.
 */

const AUD_CURRENCY = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

/** Pure date-only string, e.g. `2026-06-05` (no time component). */
const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Australian dollar display: `$1,234.56`.
 *
 * Two decimals, grouped thousands. Use for every balance/amount in the member
 * portal and consolidation/income flows.
 */
export function formatCurrency(value: number): string {
  return AUD_CURRENCY.format(value);
}

interface DateParts {
  day: number;
  month: number;
  year: number;
}

/**
 * Resolve a date string to day/month/year parts.
 *
 * Pure `YYYY-MM-DD` strings are parsed by component to avoid the UTC-midnight
 * shift that `new Date('2026-06-05')` causes in negative-offset timezones.
 * Anything with a time component falls back to `Date` parsing (local time),
 * preserving the prior behaviour for ISO timestamps.
 */
function dateParts(iso: string): DateParts | null {
  if (DATE_ONLY.test(iso)) {
    const [year, month, day] = iso.split('-').map(Number);
    if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
    return { day, month, year };
  }
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
}

/**
 * Short date display: `5 Jun 2026`.
 *
 * Accepts a date-only string (`2026-06-05`) or a full ISO timestamp. Returns
 * the original string unchanged if it can't be parsed.
 */
export function formatDate(iso: string): string {
  const parts = dateParts(iso);
  if (!parts) return iso;
  return `${parts.day} ${MONTHS_SHORT[parts.month - 1]} ${parts.year}`;
}

/**
 * Numeric date display: `05 / 06 / 2026`.
 *
 * Zero-padded day/month with spaced slashes. Accepts a date-only string or a
 * full ISO timestamp. Returns the original string unchanged if it can't be
 * parsed.
 */
export function formatDateDMY(iso: string): string {
  const parts = dateParts(iso);
  if (!parts) return iso;
  const dd = String(parts.day).padStart(2, '0');
  const mm = String(parts.month).padStart(2, '0');
  return `${dd} / ${mm} / ${parts.year}`;
}

/**
 * Long date display: `5 June 2026`.
 *
 * Full month name. Accepts a date-only string or a full ISO timestamp. Returns
 * the original string unchanged if it can't be parsed.
 */
export function formatDateLong(iso: string): string {
  const parts = dateParts(iso);
  if (!parts) return iso;
  return `${parts.day} ${MONTHS_LONG[parts.month - 1]} ${parts.year}`;
}
