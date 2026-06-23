/**
 * Masks an account number for display — shows last 4 digits only.
 * "12345678" → "•••• 5678"
 */
export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber;
  return `\u2022\u2022\u2022\u2022 ${accountNumber.slice(-4)}`;
}
