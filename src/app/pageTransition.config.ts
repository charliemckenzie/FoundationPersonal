/**
 * Routes that opt out of the global page transition.
 *
 * The page fade fires on navigation (a route change). Most stepped forms — like
 * the beneficiaries nomination — live on a single route and change steps via
 * React state, so they animate between steps with `StepTransition` and still
 * get a fade when you navigate *into* and *out of* the form. Those do NOT belong
 * here.
 *
 * Add a route only when a flow drives its steps with real routes (e.g.
 * `/flow/step-1`, `/flow/step-2`) and runs its own per-step transition — there
 * the page fade would fire on every step and clash. Matched as a prefix against
 * the pathname (route groups like `(portal)` do not appear in the URL).
 *
 * For one-off cases, pass `disabled` to an individual `PageTransition` instead.
 */
export const PAGE_TRANSITION_EXCLUDE: string[] = [];
