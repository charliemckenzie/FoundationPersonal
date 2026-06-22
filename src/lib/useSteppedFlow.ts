'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useResumableDraft, type ResumableDraftAdapter } from './useResumableDraft';

/**
 * The shared engine for the Retirement Income Account and Lifetime Pension flows —
 * two near-identical multi-step applications that previously hand-rolled the same
 * ~80 lines of step navigation + draft autosave each.
 *
 * It owns the mechanical parts both flows share:
 * - `state` / `activeStep` and the `advance` / `back` / `editStep` transitions
 * - the `showValidation` flag toggled on each navigation
 * - debounced draft autosave (skipping the intro step) and submit cleanup, via the
 *   single {@link useResumableDraft} mechanism in `dialog` / localStorage mode
 * - the "Continue your application?" resume handshake (`pendingResume` / `acceptResume`
 *   / `discardResume`)
 *
 * Flow-specific logic — per-step validation, the Next-button branching (insurance
 * warnings, submit), and the JSX — stays in each flow and composes these primitives.
 */

export interface SteppedFlowSnapshot<S> {
  state: S;
  activeStep: number;
  /** Populated by `loadDraft`; surfaced on `pendingResume` so the resume dialog can show the saved date. */
  savedAt?: string;
}

export interface UseSteppedFlowOptions<S> {
  initialState: S;
  /** Read a saved draft (the existing `draftService.loadDraft`). */
  loadDraft: () => Promise<SteppedFlowSnapshot<S> | null> | SteppedFlowSnapshot<S> | null;
  /** Persist a draft (the existing `draftService.saveDraft`). */
  saveDraft: (state: S, activeStep: number) => void | Promise<void>;
  /** Remove the draft (the existing `draftService.deleteDraft`). */
  deleteDraft: () => void | Promise<void>;
  /**
   * Revive a restored state object — e.g. merge over `INITIAL_STATE` so fields added
   * since the draft was saved still get defaults. Defaults to identity.
   */
  reviveState?: (saved: S) => S;
}

export interface UseSteppedFlow<S> {
  state: S;
  setState: (next: S) => void;
  activeStep: number;
  showValidation: boolean;
  setShowValidation: (value: boolean) => void;
  submitted: boolean;
  /** Advance to `step`, clearing validation. */
  advance: (step: number) => void;
  /** Step back one (floored at 0), clearing validation. */
  back: () => void;
  /** Re-open the flow at `step` from the review screen (also un-submits). */
  editStep: (step: number) => void;
  /** Mark the flow submitted and delete the saved draft. */
  submit: () => void;
  /** Non-null while a saved draft awaits the member's resume decision — drives the dialog. */
  pendingResume: SteppedFlowSnapshot<S> | null;
  /** Resume the pending draft. */
  acceptResume: () => void;
  /** Discard the pending draft and start fresh. */
  discardResume: () => void;
  /** Non-null once anything has saved or restored — gates the "auto-saved" exit hint. */
  lastSavedAt: Date | null;
}

export function useSteppedFlow<S>({
  initialState,
  loadDraft,
  saveDraft,
  deleteDraft,
  reviveState,
}: UseSteppedFlowOptions<S>): UseSteppedFlow<S> {
  const [state, setState] = useState<S>(initialState);
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const adapter = useMemo<ResumableDraftAdapter<SteppedFlowSnapshot<S>>>(
    () => ({
      load: loadDraft,
      save: (snap) => saveDraft(snap.state, snap.activeStep),
      clear: deleteDraft,
    }),
    [loadDraft, saveDraft, deleteDraft],
  );

  const draft = useResumableDraft<SteppedFlowSnapshot<S>>({
    adapter,
    resume: 'dialog',
    debounceMs: 500,
    onRestore: (snap) => {
      setState(reviveState ? reviveState(snap.state) : snap.state);
      setActiveStep(snap.activeStep);
    },
  });

  const { persist } = draft;

  // Debounced autosave on any state/step change, except the intro step (step 0).
  useEffect(() => {
    if (activeStep === 0) return;
    persist({ state, activeStep });
  }, [state, activeStep, persist]);

  function scrollToTop() {
    // On desktop the layout uses a scrollable #main-content element (overflowY: auto).
    // On mobile the page body scrolls. Scroll both to cover all breakpoints.
    document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const advance = useCallback((step: number) => {
    setActiveStep(step);
    setShowValidation(false);
    scrollToTop();
  }, []);

  const back = useCallback(() => {
    setShowValidation(false);
    setActiveStep((prev) => Math.max(0, prev - 1));
    scrollToTop();
  }, []);

  const editStep = useCallback((step: number) => {
    setSubmitted(false);
    setActiveStep(step);
    setShowValidation(false);
    scrollToTop();
  }, []);

  const { clearDraft } = draft;
  const submit = useCallback(() => {
    setSubmitted(true);
    clearDraft();
  }, [clearDraft]);

  return {
    state,
    setState,
    activeStep,
    showValidation,
    setShowValidation,
    submitted,
    advance,
    back,
    editStep,
    submit,
    pendingResume: draft.pendingDraft,
    acceptResume: draft.acceptDraft,
    discardResume: draft.discardDraft,
    lastSavedAt: draft.lastSavedAt,
  };
}
