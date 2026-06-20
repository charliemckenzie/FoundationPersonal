/**
 * Draft persistence for the Retirement Projection flow.
 *
 * Mirrors the Retirement Income Account / Lifetime Pension draft services so every
 * stepped form saves and resumes the same way (Foundation's save/resume policy):
 * localStorage with a 30-day expiry, surfaced through a resume dialog on return.
 * Shaped as plain functions so the localStorage implementation can be swapped for a
 * real API call without changing call sites.
 */

import type { RetirementProjectionState } from './types';

const STORAGE_KEY = 'retirement-projection-v1';
const EXPIRY_DAYS = 30;

export type FlowPhase = 'welcome' | 'disclaimer' | 'form' | 'results' | 'next-steps';

export interface ProjectionSnapshot {
  state: RetirementProjectionState;
  phase: FlowPhase;
  formStep: number;
  maxStep: number;
  /** Populated by `loadDraft`; surfaced on the resume dialog so it can show the saved date. */
  savedAt?: string;
}

interface StoredDraft extends ProjectionSnapshot {
  savedAt: string;
  expiresAt: string;
}

export function saveDraft(snapshot: ProjectionSnapshot): void {
  try {
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + EXPIRY_DAYS);
    const draft: StoredDraft = {
      state: snapshot.state,
      phase: snapshot.phase,
      formStep: snapshot.formStep,
      maxStep: snapshot.maxStep,
      savedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage unavailable — the flow still works, it just won't survive a return visit.
  }
}

export function loadDraft(): StoredDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as StoredDraft;
    if (new Date(draft.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function deleteDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable — nothing to clear.
  }
}
