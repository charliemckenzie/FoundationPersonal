@AGENTS.md
@docs/guidelines/typography.md
@docs/guidelines/components.md

## Non-negotiable rules — enforced in every conversation

### Before writing any UI code
**Always check existing components first. No exceptions.**

Before writing any component, page, or UI code:
1. Read `docs/guidelines/components.md` — it lists every available Foundation component
2. Check `src/components/` directly if something seems missing from that list
3. Only use raw MUI primitives if no Foundation component covers the need

Do not reach for `@mui/material/Card`, `@mui/material/Button`, or any other raw MUI primitive when a Foundation component exists. The Foundation components are at `src/components/` and must be used.

### Typography variants — use only these
Never use `body1`, `body2`, `subtitle1`, `subtitle2`, `button`, or `overline` as Typography variants. They are disabled in this design system. Use: `display-1` through `display-5`, `h1`–`h6`, `lead`, `body`, `small`, `caption`.

### Styling
- MUI theme tokens only in `sx` props — no hardcoded colours, spacing, or font sizes
- Font sizes must use `rem`. Line heights must be unitless
- Never use `style={{}}` inline props — use `sx`
- Layout/flex props (`alignItems`, `justifyContent` etc.) belong in `sx`, not as direct component props

