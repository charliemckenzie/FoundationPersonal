import { IDV_CACHE_YEARS, IDV_STORAGE_KEY } from './constants';
import type { IDVDocument, IDVState } from './types';

/**
 * Returns true if the user completed IDV within the cache window (default 3 years).
 * In production this would be replaced by a server-side session check.
 */
export function checkIDVCache(): boolean {
  try {
    const raw = localStorage.getItem(IDV_STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (isNaN(ts)) return false;
    const cutoff = Date.now() - IDV_CACHE_YEARS * 365 * 24 * 60 * 60 * 1000;
    return ts > cutoff;
  } catch {
    return false;
  }
}

/**
 * Stores the current timestamp so IDV is not re-prompted within the cache window.
 */
export function setIDVCache(): void {
  try {
    localStorage.setItem(IDV_STORAGE_KEY, String(Date.now()));
  } catch {
    // localStorage unavailable — non-fatal
  }
}

/**
 * Mock IDV submission. Simulates a 1.5 s Equifax IDMatrix call.
 * Replace the body of this function with a real server action in production.
 */
export async function submitIDV(
  document: IDVDocument,
  fields: IDVState,
): Promise<{ success: boolean; error?: string }> {
  void document;
  void fields;

  await new Promise<void>((resolve) => setTimeout(resolve, 1500));

  // Mock: always succeeds. Swap for real API call.
  return { success: true };
}
