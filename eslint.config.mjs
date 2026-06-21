// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "storybook-static/**",
    "next-env.d.ts",
    // Compiled Figma plugin output — not project source code.
    "figma-plugin/**",
  ]),
  ...storybook.configs["flat/recommended"],
  // Foundation charter enforcement — see AGENTS.md.
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      // Standard TypeScript convention: _-prefixed names are intentionally unused.
      "@typescript-eslint/no-unused-vars": ["warn", {
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
      }],
      "no-restricted-syntax": [
        "error",
        {
          // Bans MUI's default Typography variants that are disabled in src/types/mui.d.ts.
          // Valid scale: display-1 → display-5, h1–h6, lead, body, small, caption, inherit.
          // Scoped to <Typography> so legitimate component variants that happen to share a
          // banned name (e.g. <Checkbox variant="button">) are not falsely flagged.
          selector:
            "JSXOpeningElement[name.name='Typography'] > " +
            "JSXAttribute[name.name='variant']" +
            "[value.type='Literal']" +
            "[value.value=/^(body1|body2|subtitle1|subtitle2|button|overline)$/]",
          message:
            "Charter: MUI default Typography variants are disabled. " +
            "Use the design system scale: display-1 → display-5, h1–h6, lead, body, small, caption. " +
            "See src/types/mui.d.ts.",
        },
      ],
      // React 19 / Next 16 flag the "reset state on prop change" effect pattern as an
      // error by default. We have three legitimate cases (Icon, useDrawerDrag, the
      // AustralianAutocomplete debounce). Downgrading to warn until each is refactored
      // to the compare-in-render pattern — tracked in docs/Adam/quality-review.md.
      "react-hooks/set-state-in-effect": "warn",
      // Same React 19 / Next 16 strictness: reading or writing ref.current during render.
      // Legitimate cases here are the standard MUI anchorEl pattern (InputSelect) and
      // StepTransition's documented previous-children snapshot. Warn rather than error so
      // genuinely-new accidental ref-during-render bugs still surface in CI/IDE.
      "react-hooks/refs": "warn",
    },
  },
  // Charter: never hardcode a font size in component code. Use a Typography
  // variant, the `typography: '<variant>'` sx shorthand, or a theme token
  // (t.typography.<variant>.fontSize). See docs/guidelines/typography.md.
  // Scoped to components — app demo pages and story fixtures may use literals.
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          // Scoped to <Typography> — see the matching rule in the src/** block above.
          selector:
            "JSXOpeningElement[name.name='Typography'] > " +
            "JSXAttribute[name.name='variant']" +
            "[value.type='Literal']" +
            "[value.value=/^(body1|body2|subtitle1|subtitle2|button|overline)$/]",
          message:
            "Charter: MUI default Typography variants are disabled. " +
            "Use the design system scale: display-1 → display-5, h1–h6, lead, body, small, caption. " +
            "See src/types/mui.d.ts.",
        },
        {
          // CSS-wide keywords (inherit/initial/unset/revert) are not hardcoded sizes —
          // they defer to the cascade — so they are excluded from the ban.
          selector:
            "Property[key.name='fontSize'][value.type='Literal']" +
            "[value.value!=/^(inherit|initial|unset|revert|revert-layer)$/]",
          message:
            "Charter: don't hardcode font sizes. Use a Typography variant, the " +
            "`typography: '<variant>'` sx shorthand, or t.typography.<variant>.fontSize. " +
            "See docs/guidelines/typography.md.",
        },
      ],
    },
  },
  {
    files: ["src/stories/**/*.{ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  // Shared variant-style helpers legitimately use static palette access internally
  // (e.g. the MuiIconButton override's action.active fallback). They are the source
  // of truth that everywhere else delegates to.
  {
    files: [
      "src/components/buttons/variantStyles.ts",
      "src/components/inputs/variantStyles.ts",
      "src/app/themes/**/*.ts",
    ],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
  // Components with intentional bespoke or icon-glyph font sizes that have no
  // typography-token equivalent (control sizes, icon-wrapper glyphs, sub-caption
  // captions). Exempt from no-restricted-syntax here; the banned Typography
  // variants are still caught at the type level via src/types/mui.d.ts.
  {
    files: [
      "src/components/ArtieAIButton/index.tsx",
      "src/components/Footer/AwardPlaceholder.tsx",
      "src/components/Footer/FooterContact.tsx",
      "src/components/FormProgress/StepCounter.tsx",
      "src/components/FormProgress/StepMarker.tsx",
      "src/components/Header/NavDrawer.tsx",
      "src/components/Header/NavDrawerParts.tsx",
      "src/components/Header/QSuperPromoPanel.tsx",
      "src/components/MemberOnline/SearchField/index.tsx",
      "src/components/SkipLinks/index.tsx",
    ],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);

export default eslintConfig;
