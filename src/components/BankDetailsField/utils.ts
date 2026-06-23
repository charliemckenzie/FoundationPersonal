// BSB utilities — internal to BankDetailsField. Not exported.

const BSB_BANK_MAP: Record<string, string> = {
  '01': 'ANZ Bank',
  '03': 'Westpac',
  '06': 'Commonwealth Bank of Australia',
  '08': 'National Australia Bank',
  '09': 'National Australia Bank',
  '11': 'St.George Bank',
  '12': 'Bank of Queensland',
  '13': 'Bendigo and Adelaide Bank',
  '14': 'Citibank',
  '17': 'Bank of Melbourne',
  '18': 'Macquarie Bank',
  '21': 'BankSA',
  '22': 'HSBC Australia',
  '23': 'Deutsche Bank',
  '30': 'Bankwest',
  '40': 'Commonwealth Bank of Australia',
  '63': 'Bendigo and Adelaide Bank',
  '73': 'Westpac',
  '76': 'Commonwealth Bank of Australia',
  '80': 'Reserve Bank of Australia',
  '92': 'ING',
  '93': 'ING',
};

/** Strip non-digit characters and return at most 6 digits. */
export function parseBsbDigits(input: string): string {
  return input.replace(/\D/g, '').slice(0, 6);
}

/** Format up to 6 raw digits as XXX-XXX. Fewer than 4 digits are returned as-is. */
export function formatBsb(digits: string): string {
  if (digits.length <= 3) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3)}`;
}

/** Return the institution name for a complete BSB, or null if not recognised. */
export function lookupBsbBank(bsb: string): string | null {
  const digits = parseBsbDigits(bsb);
  if (digits.length < 6) return null;
  return BSB_BANK_MAP[digits.slice(0, 2)] ?? null;
}
