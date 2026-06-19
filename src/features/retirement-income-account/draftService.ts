/**
 * Draft persistence for the Lifetime Pension form.
 *
 * Shaped as async functions to mirror a server action interface — swap the
 * localStorage implementation for a real API call without changing call sites.
 */

import { DRAFT_EXPIRY_DAYS, DRAFT_STORAGE_KEY } from './constants';
import type { RetirementIncomeAccountDraft, RetirementIncomeAccountState } from './types';

export async function saveDraft(
  state: RetirementIncomeAccountState,
  activeStep: number
): Promise<void> {
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + DRAFT_EXPIRY_DAYS);

  const draft: RetirementIncomeAccountDraft = {
    state,
    activeStep,
    savedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
}

export async function loadDraft(): Promise<RetirementIncomeAccountDraft | null> {
  const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!raw) return null;

  let draft: RetirementIncomeAccountDraft;
  try {
    draft = JSON.parse(raw) as RetirementIncomeAccountDraft;
  } catch {
    return null;
  }

  if (new Date(draft.expiresAt) < new Date()) {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    return null;
  }

  return draft;
}

export async function deleteDraft(): Promise<void> {
  localStorage.removeItem(DRAFT_STORAGE_KEY);
}
