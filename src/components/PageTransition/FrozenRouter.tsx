'use client';

import { useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Snapshots the App Router layout segment so the outgoing page keeps its
 * rendered content while it animates out. Without this, Next swaps the segment
 * to the new route immediately and the exit animation has nothing to show.
 *
 * Relies on a Next internal (`LayoutRouterContext`). If a future Next upgrade
 * removes it, fall back to an enter-only transition (drop AnimatePresence +
 * FrozenRouter and key a `motion.div` on the pathname).
 */
export function FrozenRouter({ children }: { children: ReactNode }) {
  // Capture the segment once at mount and hold it for this instance's lifetime.
  // Each new route gets a fresh, keyed FrozenRouter; the outgoing one keeps the
  // old segment so its exit animation still has content to render.
  const context = useContext(LayoutRouterContext);
  const [frozen] = useState(context);

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
