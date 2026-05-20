# GitHub Packages — What Paolo Needs to Do

**Who this is for:** Paolo  
**Requested by:** Adam  
**Date:** May 2026  
**Status:** Waiting on Paolo's action before Adam can continue

---

## Context (read this first)

The Foundation repo (`Paolo-Meyer_artghec/Foundation`) needs to be published to GitHub Packages so other projects can install it as an npm package (`npm install @.../foundation`).

Everything in the codebase is already set up — `tsup` build config, GitHub Actions workflow, exports map in `package.json`. The only blocker is the **GitHub ownership question**: GitHub Packages requires the npm scope (`@org-name`) to match whoever owns the repo on GitHub.

The repo currently lives under your personal account (`Paolo-Meyer_artghec`). Adam needs you to take one of the two actions below.

---

## Pick one option

### Option A — Transfer the repo to Adam (cleanest, recommended)

Adam will own the repo going forward and publish under `@adam-finden_artghec/foundation`.

**Steps:**

1. Go to the repo on GitHub: `Paolo-Meyer_artghec/Foundation`
2. **Settings → General → Danger Zone → Transfer ownership**
3. Enter `Adam-Finden_artghec` as the new owner
4. Confirm the transfer

That's it. Adam handles everything else from there.

---

### Option B — Keep the repo under your account, add Adam's PAT as a secret

The repo stays under your account. Adam generates a token on his GitHub account, sends it to you securely (not via chat or email — use a password manager or secure share), and you add it to the repo so the Actions workflow can publish on his behalf.

**Steps:**

1. Adam will send you a GitHub Personal Access Token (PAT) via secure channel
2. Go to the repo → **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Name: `PUBLISH_TOKEN`
5. Value: paste Adam's PAT
6. Save

Adam then updates the workflow file to use `PUBLISH_TOKEN` and handles the rest.

---

## Which option is better?

Option A is simpler for everyone. One action, no token management, no expiry risk. If Adam is the person maintaining Foundation going forward, he should own the repo.

If there's a reason to keep it under your account (you're still actively maintaining it, org move is imminent, etc.), go with Option B.

---

## Once you've acted

Let Adam know which option you chose and that it's done. He can take it from there immediately — all the code changes are already prepared and waiting.

---

## Current file state (for reference)

The repo has these files already configured and ready:

| File | Status |
|---|---|
| `package.json` | Has exports map, `lib:build` script, peerDependencies — name needs final scope update |
| `tsup.config.ts` | Configured for ESM + CJS + types output |
| `src/index.ts` | Public API barrel with all 26 components exported |
| `.github/workflows/publish.yml` | Publish workflow ready — triggers on `v*.*.*` git tag |

The only things Adam still needs to do once you've transferred/added the secret:

1. Update `package.json` name to match the correct scope
2. Add `publishConfig` pointing at GitHub Packages registry
3. Create `.npmrc` with the scope → registry mapping
4. Run a local build to confirm it compiles clean
5. Tag a release to trigger the first publish
