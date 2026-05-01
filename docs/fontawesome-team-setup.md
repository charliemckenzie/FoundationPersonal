# Local Icons - Team Setup Guide

## For New Team Members

This project now uses local SVG icons and does not require external icon package authentication.

### Quick Setup

1. **Install packages:**
   ```bash
   npm install
   ```

2. **Verify setup:**
   ```bash
   npm run check-setup
   ```

3. **Run Storybook:**
   ```bash
   npm run storybook
   ```

### Troubleshooting

#### Icons not showing in Storybook

**Cause:** Icon asset name mismatch or missing SVG file

**Fix:**
```bash
# Restart Storybook
npm run storybook
```

And verify:
1. The file exists in `public/icons/qsuper`
2. The `icon` prop matches the filename (without `.svg`)
3. For legacy names, check alias mapping in `src/components/Icon/index.tsx`

## For Project Maintainers

### When onboarding new team members

Direct them to:
1. [README.md](../README.md) - Main setup guide
2. This file - Local icon workflow
3. `npm run check-setup` - Automated verification

### CI/CD Setup

No special icon authentication is required in CI/CD.

### Verification Script

The `npm run check-setup` script (`scripts/check-setup.mjs`) verifies core project tooling (Node, npm, TypeScript, Next.js, Storybook, Claude tooling).

If a recurring setup issue appears during onboarding, update the script to catch it.

## Support

**Technical issues with this project:**
- Check [docs/fontawesome-pro-guide.md](./fontawesome-pro-guide.md) for usage guide
- Run `npm run check-setup` for diagnostics
- Ask in the team channel
