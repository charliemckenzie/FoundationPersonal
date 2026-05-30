'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FrozenRouter } from './FrozenRouter';
import { pageVariants, pageTransition } from './variants';

export interface PageTransitionProps {
  /** Page content to animate on navigation. */
  children: ReactNode;
  /** Per-instance escape hatch — render content with no transition. */
  disabled?: boolean;
  /**
   * Route prefixes that opt out of the transition, matched against the current
   * pathname (exact match or as a path-segment prefix). Use for flows that run
   * their own transitions — e.g. multi-step forms using `StepTransition`.
   */
  excludePaths?: string[];
}

/**
 * Fades the content area in and out as the route changes. Place it inside a
 * persistent layout, wrapping the page content (not the header/footer) so only
 * the content cross-fades while the chrome stays put.
 *
 * Drive nothing — it keys off `usePathname()`. Respects `prefers-reduced-motion`
 * and short-circuits to a static render when disabled or on an excluded route.
 * Tune the motion in `variants.ts`.
 */
export function PageTransition({ children, disabled = false, excludePaths = [] }: PageTransitionProps) {
  const pathname = usePathname() ?? '';
  const reduceMotion = useReducedMotion();
  const excluded = excludePaths.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (disabled || reduceMotion || excluded) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
