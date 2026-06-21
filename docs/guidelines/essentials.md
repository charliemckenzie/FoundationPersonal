# Foundation essentials — always-on core

The small, shared rule set both runtimes (Claude Code + Copilot) load every turn. Keep it lean. The heavy reference docs are **on-demand** — pointers at the bottom; read the matching one before that kind of work.

## Start here

- **Start every task with Smithers.** He routes to the right specialist and enforces the pipeline. Go to a specialist directly only when you know exactly who you need.
- All work is supervised: agents draft; the designer approves before anything is committed or published.

## Styling — non-negotiable

- **MUI theme tokens only** in `sx` — no hardcoded colours, spacing, shadows, or font sizes anywhere.
- **Rem-first sizing.** Font sizes, icon sizes, and text-bearing component sizes use `rem`. Line heights are unitless (`1.5`, never `'24px'`). `px` is only for non-text structural values (borders, outlines, box-shadows).
- Never use inline `style={{}}` — use `sx`. Layout/flex props (`alignItems`, `justifyContent`) go in `sx`, not as direct component props.
- `sx` token access: string shorthand (`'primary.main'`) for static tokens; `(t) =>` callbacks only for conditional logic. Never `theme.palette.primary.main` object notation in `sx`.

## Typography — use only these variants

- **Allowed:** `display-1`–`display-5`, `h1`–`h6`, `lead`, `body`, `small`, `caption`, `inherit`.
- **Banned** (TypeScript + ESLint errors): `body1`, `body2`, `subtitle1`, `subtitle2`, `button`, `overline`. Never use a bare `<Typography>` without a `variant`.
- Don't override a component's built-in typography (`fontSize`/`fontWeight`/`lineHeight`/`fontFamily`) — components own it. `small`/`caption` (<16px): use sparingly.

## Components — check first, never duplicate

- **Always use an existing Foundation component** before reaching for raw MUI or custom HTML. **Never create a new component without Moe's sign-off.**
- The catalogue (bare names — if one's missing, check `src/components/` directly):
  Accordion · ActionBar · AddressField · Alert · AnnouncementBanner · ArtieAIButton · Autocomplete · Badge · Breadcrumb · Button · Calendar · Card · Charts · Checkbox · Chip · CloseButton · DataGrid · DateOfBirthField · DatePicker · DateRangePicker · DescriptionList · Dialog · Divider · Drawer · ExpandableCardList · ExpandableItem · FileUpload · Footer · FormProgress · Header · HeroIcon · Icon · IconButton · IconList · InfoButton · InputSelectContainer · InvestmentOverview · LinearProgress · LinkRow · Logo · ManagedList · MemberOnline · Menu · MOBreadcrumb · Modal · MoneyField · PageTransition · Pagination · PasswordField · PercentageField · PosterPanel · QuickLinks · RadioGroup · Select · Skeleton · SkipLinks · Snackbar · Spinner · StepperActions · StepTransition · Switch · Table · Tabs · TextArea · TextButton · TextField · Tooltip
- Prop conventions: `variant`/`size`/`color`; events as `onX`; accessible name via `label` (not `aria-label`) on inputs and icon-only buttons.

## Accessibility — the floor (WCAG 2.2 AA)

Five Rules of ARIA:
1. Prefer native HTML (`<button>`, not `<div role="button">`).
2. Don't change native semantics where prohibited.
3. All ARIA controls must be keyboard operable.
4. Never `aria-hidden="true"` on a focusable element.
5. All interactive elements need an accessible name.

Severity legend: **CRITICAL** (fix before merge) · **IMPORTANT** (fix same sprint) · **SUGGESTION** (plan later).

## Stack — treat as unfamiliar (training data is older)

**React 19** (`ref` is a regular prop — no `forwardRef`; Server Actions; `use()`), **MUI v9** (Grid v2 is the default `Grid`; `'primary.main'` shorthand preferred), **Next.js 16** (`params` and `searchParams` are **async — always `await` them**), **Storybook 10** (`@storybook/nextjs-vite`; CSF3 with `satisfies Meta`). Read `node_modules/next/dist/docs/` before using any Next.js API.

## High-frequency gotchas

- **Stepped-form errors:** on Next/Submit validation failure, render the error in a single `<Alert>` **directly above `<StepperActions>`** — a top-of-step error scrolls out of view. Field-level indicators stay; clear the error on advance/back.
- **Member Online side nav:** it's driven by per-config JSON in `src/app/member-online/(portal)/navigation-config/` — edit the JSON, not the components, and read that folder's `README.md` first.

## On-demand reference — read before the matching work

- **Full typography scale**, weights, spacing, composition → `docs/guidelines/typography.md`
- **Component catalogue + when-to-use** (Dialog vs Modal, Select vs InputSelectContainer, etc.) → `docs/guidelines/components.md`
- **Full WCAG 2.2 AA catalogue** (38+ anti-patterns) → `.github/instructions/a11y.instructions.md`; component sign-off → Flanders / `/conformanceReport`
- **Team roster, routing detail, pipeline, charter** → `AGENTS.md`
- **Playwright tests** → `.github/instructions/playwright-typescript.instructions.md`
