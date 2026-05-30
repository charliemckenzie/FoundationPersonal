import type { Transition, Variants } from 'framer-motion';

/**
 * The single tuning surface for the global page transition.
 *
 * Adjust the feel here — keep it a pure fade, or add a subtle lift with `y`
 * offsets (e.g. `initial: { opacity: 0, y: 8 }`). Durations are in seconds
 * (framer-motion convention), not milliseconds.
 */
export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const pageTransition: Transition = {
  duration: 0.25,
  ease: [0.4, 0, 0.2, 1], // theme easeInOut — cubic-bezier(0.4, 0, 0.2, 1)
};
