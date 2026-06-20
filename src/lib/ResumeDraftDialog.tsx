'use client';

import { Dialog } from '../components/Dialog';

/**
 * The single resume prompt for every stepped form that saves progress.
 *
 * Foundation's save/resume UX policy is **identical everywhere**: any stepped form
 * that persists progress shows this same dialog on return — same layout, buttons,
 * and timing. Only the task noun differs (an "application", a "projection", …), so
 * the wording stays natural to each flow while the interaction is consistent.
 *
 * Pair it with {@link useResumableDraft} (or {@link useSteppedFlow}) in `'dialog'`
 * mode: render it open while a saved draft awaits a decision, wiring the hook's
 * accept/discard handlers to `onContinue` / `onStartFresh`.
 */
export interface ResumeDraftDialogProps {
  open: boolean;
  /** ISO date the draft was saved — shown in the prompt. */
  savedAt?: string;
  /** The task noun, e.g. `"application"` or `"projection"`. Forms "Continue your {noun}?". */
  noun: string;
  /** Resume the saved draft. */
  onContinue: () => void;
  /** Discard the saved draft and start over. */
  onStartFresh: () => void;
}

function formatSavedDate(savedAt?: string): string {
  if (!savedAt) return '';
  return new Date(savedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function ResumeDraftDialog({ open, savedAt, noun, onContinue, onStartFresh }: ResumeDraftDialogProps) {
  const dateText = formatSavedDate(savedAt);
  return (
    <Dialog
      open={open}
      onClose={onStartFresh}
      title={`Continue your ${noun}?`}
      description={`You have a saved ${noun}${dateText ? ` from ${dateText}` : ''}. Would you like to continue where you left off?`}
      variant="neutral"
      hideCloseButton
      confirmLabel="Continue where I left off"
      cancelLabel="Start fresh"
      onConfirm={onContinue}
    />
  );
}
