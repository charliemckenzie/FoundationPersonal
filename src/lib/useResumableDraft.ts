'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * The single save/resume mechanism for stepped forms.
 *
 * Every flow that should let a member leave and come back goes through this hook,
 * so there is **one** implementation of "persist progress, restore it later" rather
 * than a bespoke copy per flow. The flows differ only in configuration:
 *
 * | Flow | storage | resume |
 * |---|---|---|
 * | Retirement Income Account, Lifetime Pension | localStorage (via draftService, 30-day expiry) | `'dialog'` |
 * | Retirement Projection | sessionStorage | `'auto'` |
 *
 * The hook is generic over the snapshot shape `T` — it never inspects what is inside.
 * The consumer supplies an {@link ResumableDraftAdapter} that knows where/how to read
 * and write that snapshot, plus an `onRestore` callback that applies a restored
 * snapshot back onto the consumer's own state. This is what keeps the hook free of
 * per-flow `if`-branches.
 */

export interface ResumableDraftAdapter<T> {
  /** Load a previously persisted snapshot, or null if none. May be async to mirror a server action. */
  load: () => T | null | Promise<T | null>;
  /** Persist the current snapshot. */
  save: (snapshot: T) => void | Promise<void>;
  /** Remove any persisted snapshot. */
  clear: () => void | Promise<void>;
}

export interface UseResumableDraftOptions<T> {
  adapter: ResumableDraftAdapter<T>;
  /** Apply a restored snapshot to the consumer's own state. */
  onRestore: (snapshot: T) => void;
  /**
   * - `'dialog'` — a found draft is surfaced via {@link UseResumableDraft.pendingDraft}
   *   for the member to accept or discard (the "Continue your application?" prompt).
   * - `'auto'` — a found draft is restored silently on mount (a refresh just resumes).
   *
   * Default `'dialog'`.
   */
  resume?: 'dialog' | 'auto';
  /** Debounce window (ms) for {@link UseResumableDraft.persist}. Default 0 (persist immediately). */
  debounceMs?: number;
}

export interface UseResumableDraft<T> {
  /** `'dialog'` mode: a found draft awaiting the member's accept/discard choice; null otherwise. */
  pendingDraft: T | null;
  /** `'dialog'` mode: apply {@link pendingDraft} and begin persisting. */
  acceptDraft: () => void;
  /** `'dialog'` mode: drop {@link pendingDraft}, clear storage, and begin persisting fresh. */
  discardDraft: () => void;
  /** Persist a snapshot. No-op until the resume decision is made; debounced by `debounceMs`. */
  persist: (snapshot: T) => void;
  /** Delete the persisted draft (call on submit/exit). */
  clearDraft: () => void;
  /** Non-null once a draft has been persisted or restored — gates "auto-saved" UI hints. */
  lastSavedAt: Date | null;
}

export function useResumableDraft<T>({
  adapter,
  onRestore,
  resume = 'dialog',
  debounceMs = 0,
}: UseResumableDraftOptions<T>): UseResumableDraft<T> {
  const [pendingDraft, setPendingDraft] = useState<T | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Latest-value refs keep the mount effect free of reactive dependencies, so it
  // runs exactly once and never reads a stale closure — no exhaustive-deps
  // suppression needed. Synced in an effect (not during render) so the React
  // Compiler's "no refs during render" rule stays satisfied.
  const adapterRef = useRef(adapter);
  const onRestoreRef = useRef(onRestore);
  const resumeRef = useRef(resume);
  useEffect(() => {
    adapterRef.current = adapter;
    onRestoreRef.current = onRestore;
    resumeRef.current = resume;
  });

  // `persist` no-ops until this flips true: in dialog mode after the member
  // accepts/discards (or no draft existed); in auto mode after mount-restore.
  const readyRef = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve(adapterRef.current.load()).then((draft) => {
      if (cancelled) return;
      if (draft && resumeRef.current === 'auto') {
        onRestoreRef.current(draft);
        setLastSavedAt(new Date());
        readyRef.current = true;
      } else if (draft) {
        setPendingDraft(draft);
      } else {
        readyRef.current = true;
      }
    });
    return () => {
      cancelled = true;
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const acceptDraft = useCallback(() => {
    setPendingDraft((draft) => {
      if (draft) {
        onRestoreRef.current(draft);
        setLastSavedAt(new Date());
      }
      readyRef.current = true;
      return null;
    });
  }, []);

  const discardDraft = useCallback(() => {
    Promise.resolve(adapterRef.current.clear());
    setPendingDraft(null);
    readyRef.current = true;
  }, []);

  const persist = useCallback(
    (snapshot: T) => {
      if (!readyRef.current) return;
      const run = () => {
        Promise.resolve(adapterRef.current.save(snapshot)).then(() => setLastSavedAt(new Date()));
      };
      if (debounceMs <= 0) {
        run();
        return;
      }
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(run, debounceMs);
    },
    [debounceMs],
  );

  const clearDraft = useCallback(() => {
    Promise.resolve(adapterRef.current.clear());
  }, []);

  return { pendingDraft, acceptDraft, discardDraft, persist, clearDraft, lastSavedAt };
}
