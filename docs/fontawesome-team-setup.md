# Font Awesome Pro - Team Setup Guide

## For New Team Members

When you clone this repository, you'll need to set up Font Awesome Pro access to install the icon packages.

### Quick Setup (5 minutes)

1. **Get your Font Awesome Pro token:**
   - Go to https://fontawesome.com/account
   - Click on "Kits & API Tokens"
   - Copy your **Package Token** (the one at the top)
   - ⚠️ **Not** the API Token below it

2. **Create your local `.npmrc` file:**
   ```bash
   # Copy the template
   cp .npmrc.example .npmrc
   
   # Windows:
   copy .npmrc.example .npmrc
   ```

3. **Add your token:**
   - Open `.npmrc` in your editor
   - Replace `YOUR_FONTAWESOME_PRO_TOKEN_HERE` with your actual token
   - Save and close

4. **Install packages:**
   ```bash
   npm install
   ```

5. **Verify it worked:**
   ```bash
   npm run check-setup
   ```
   
   You should see:
   ```
   Font Awesome Pro
     ✓  .npmrc exists
     ✓  .npmrc has valid token
     ✓  Font Awesome Pro packages installed
   ```

### Troubleshooting

#### "401 Unauthorized" during npm install

**Cause:** Invalid or missing Font Awesome Pro token

**Fix:**
1. Double-check you copied the **Package Token** (not API Token)
2. Verify your Font Awesome Pro subscription is active
3. Make sure there are no extra spaces in the token
4. Try generating a new token if yours is expired

#### Icons not showing in Storybook

**Cause:** Font Awesome Pro packages may not have installed correctly

**Fix:**
```bash
# Verify packages are installed
npm list @fortawesome/pro-solid-svg-icons

# If missing, reinstall
npm install

# Restart Storybook
npm run storybook
```

## For Project Maintainers

### When onboarding new team members

Direct them to:
1. [README.md](../README.md) - Main setup guide
2. This file - Font Awesome specific steps
3. `npm run check-setup` - Automated verification

### Security reminders

- ✅ `.npmrc` is in `.gitignore` - tokens won't be committed
- ✅ `.npmrc.example` is committed - provides the template
- ⚠️ Never share tokens in Slack/email - direct people to their Font Awesome account

### CI/CD Setup

For GitHub Actions or other CI/CD:

1. Add Font Awesome token as a secret:
   - GitHub: Settings → Secrets → Actions → New repository secret
   - Name: `FONTAWESOME_TOKEN`
   - Value: Your team's Font Awesome Pro token

2. Create `.npmrc` in CI before installing:
   ```yaml
   - name: Configure Font Awesome Pro
     run: |
       echo "@fortawesome:registry=https://npm.fontawesome.com/" >> .npmrc
       echo "//npm.fontawesome.com/:_authToken=${{ secrets.FONTAWESOME_TOKEN }}" >> .npmrc
   
   - name: Install dependencies
     run: npm ci
   ```

### Verification Script

The `npm run check-setup` script (`scripts/check-setup.mjs`) now includes Font Awesome Pro checks:

- ✓ `.npmrc` file exists
- ✓ Token is not a placeholder
- ✓ All Pro packages are installed

If a new Font Awesome-related issue comes up during onboarding, update the script to catch it.

## Support

**Font Awesome Pro subscription issues:**
- Contact Font Awesome support: https://fontawesome.com/support

**Technical issues with this project:**
- Check [docs/fontawesome-pro-guide.md](./fontawesome-pro-guide.md) for usage guide
- Run `npm run check-setup` for diagnostics
- Ask in the team channel

## About This Setup

**Why `.npmrc` is git-ignored:**
Security. Font Awesome Pro tokens are authentication credentials and should never be committed to version control.

**Why we provide `.npmrc.example`:**
So every team member knows exactly what to configure without having to ask.

**Why we check for it in `check-setup.mjs`:**
So new team members get clear error messages before they're stuck wondering why `npm install` fails.
