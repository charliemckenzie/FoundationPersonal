// Shared field-format validators used by the input components (built-in, always-on)
// and by feature forms for submit-time gating. Each returns a human-readable
// message, or null when the value is acceptable. An empty value is always
// treated as valid here — required-ness is a separate concern owned by the form.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  return EMAIL_RE.test(v) ? null : 'Enter a valid email address';
}

export function validatePhone(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if (!/^\+?[\d\s()-]+$/.test(v)) return 'Enter a valid contact number';
  const digits = v.replace(/\D/g, '');
  if (digits.length < 8 || digits.length > 15) return 'Enter a valid contact number';
  return null;
}

const MAX_AGE = 120;

export function validateDateOfBirth(value: string): string | null {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return 'Enter a valid date';

  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  if (!isRealDate) return 'Enter a valid date';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date.getTime() > today.getTime()) return "Date of birth can't be in the future";

  const hadBirthday =
    today.getMonth() > month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() >= day);
  const age = today.getFullYear() - year - (hadBirthday ? 0 : 1);
  if (age > MAX_AGE) return 'Enter a valid date of birth';

  return null;
}
