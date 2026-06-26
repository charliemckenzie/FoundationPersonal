# Git & GitHub for Beginners

A practical guide for team members new to Git and GitHub. This covers the essentials you need to work on Foundation.

---

## What is Git?

Git is a version control system. It tracks every change you make to files, lets you go back to previous versions, and allows multiple people to work on the same codebase without overwriting each other's work.

**GitHub** is the online platform where our Git repositories are hosted. It adds collaboration features like Pull Requests, code reviews, and issue tracking on top of Git.

---

## Initial Setup

### 1. Install Git

**macOS:**

Git comes pre-installed on macOS. Open Terminal and verify:

```bash
git --version
```

If it's not installed, you'll be prompted to install Xcode Command Line Tools — follow the prompts.

**Windows:**

Download and install [Git for Windows](https://git-scm.com/download/win). Use the default options during installation. Once installed, you'll have **Git Bash** (a terminal that works like macOS/Linux) and Git integrated into Command Prompt and PowerShell.

Verify in any terminal:

```bash
git --version
```

> **Tip (Windows):** During installation, choose "Git from the command line and also from 3rd-party software" so Git works everywhere. Also select "Checkout as-is, commit Unix-style line endings" to avoid line-ending issues when collaborating with macOS users.

### 2. Configure your identity

Git tags every commit with your name and email. Set these once (works the same on macOS and Windows):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@art.com.au"
```

### 3. Authenticate with GitHub

We use GitHub Enterprise. The easiest way to authenticate is via the **GitHub CLI** (`gh`).

**Install the GitHub CLI:**

| Platform | Command |
|----------|----------|
| macOS (Homebrew) | `brew install gh` |
| macOS (no Homebrew) | Download from [cli.github.com](https://cli.github.com/) |
| Windows | Download from [cli.github.com](https://cli.github.com/) or run `winget install GitHub.cli` |

**Then authenticate:**

```bash
gh auth login
```

Follow the prompts — select **GitHub.com**, **HTTPS**, and authenticate via the browser.

> **Alternative (no GitHub CLI):** You can also authenticate using a Personal Access Token (PAT). Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token. Then when Git asks for your password, paste the token instead. On Windows, Git Credential Manager (included with Git for Windows) will store this for you automatically.

---

## Core Concepts

| Concept | What it means |
|---------|--------------|
| **Repository (repo)** | A project folder tracked by Git |
| **Commit** | A saved snapshot of your changes |
| **Branch** | A parallel line of work — like a copy you can edit without affecting the original |
| **Main** | The primary branch — the "source of truth" |
| **Pull Request (PR)** | A request to merge your branch into main, with review |
| **Clone** | Downloading a repo from GitHub to your machine |
| **Push** | Uploading your local commits to GitHub |
| **Pull** | Downloading the latest changes from GitHub to your machine |

---

## Day-to-Day Workflow

### Cloning the repo (first time only)

```bash
git clone https://github.com/AustralianRetirementTrust/Foundation.git
cd Foundation
npm install
```

### Starting new work

Always start from an up-to-date `main`:

```bash
git checkout main
git pull
```

Create a new branch for your work:

```bash
git checkout -b feat/my-new-feature
```

### Our branch naming conventions

| Type | Pattern | Example |
|------|---------|---------|
| New feature | `feat/<name>` | `feat/button-group` |
| Bug fix | `fix/<issue>` | `fix/modal-focus-trap` |
| Documentation | `docs/<subject>` | `docs/onboarding-guide` |
| Design work | `design/<name>` | `design/dashboard-layout` |

### Checking what's changed

```bash
git status          # see which files have changed
git diff            # see the actual changes line by line
```

### Staging and committing

```bash
git add .                           # stage all changes
git commit -m "feat: add button group component"
```

Or stage specific files:

```bash
git add src/components/Button.tsx
git commit -m "fix: correct button hover state"
```

### Our commit message format

We use **Conventional Commits**. Every commit message starts with a type:

| Prefix | When to use |
|--------|-------------|
| `feat:` | Adding a new feature |
| `fix:` | Fixing a bug |
| `docs:` | Documentation only |
| `refactor:` | Restructuring code without changing behaviour |
| `chore:` | Tooling, config, dependencies |

Examples:
```
feat(card): add elevation variant
fix(modal): prevent scroll when open
docs: update onboarding guide
chore: upgrade storybook to v8
```

### Pushing your branch to GitHub

```bash
git push -u origin feat/my-new-feature
```

The `-u` flag links your local branch to the remote one. After the first push, you can just use `git push`.

### Opening a Pull Request

1. Go to the repository on GitHub
2. You'll see a banner suggesting you open a PR for your recently pushed branch — click it
3. Fill in the title (use the same conventional commit format) and description
4. Mark it as **Draft** if it's still in progress
5. Request reviewers

### Pulling latest changes

If `main` has been updated while you're working:

```bash
git checkout main
git pull
git checkout feat/my-new-feature
git merge main
```

If there are conflicts, Git will tell you which files need attention. Open them, look for the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), resolve them, then:

```bash
git add .
git commit -m "chore: resolve merge conflicts with main"
```

---

## Rebasing

Rebasing is an alternative to merging for incorporating changes from `main` into your branch. Instead of creating a merge commit, it replays your commits on top of the latest `main` — resulting in a cleaner, linear history.

### Merge vs Rebase — what's the difference?

**Merge** (what we covered above):
```
main:    A — B — C — — — — — F (merge commit)
              \             /
branch:        D — E ------
```

**Rebase**:
```
main:    A — B — C
                  \
branch:            D' — E'   (your commits replayed on top of C)
```

With rebase, it looks like you started your work from the latest `main` — no merge commit cluttering the history.

### How to rebase your branch onto main

```bash
git checkout feat/my-new-feature
git fetch origin
git rebase origin/main
```

If there are conflicts during rebase, Git will pause and let you resolve them one commit at a time:

```bash
# 1. Fix the conflicts in the flagged files
# 2. Stage the resolved files
git add .
# 3. Continue the rebase
git rebase --continue
```

If things go sideways and you want to bail out:

```bash
git rebase --abort           # cancels the rebase, puts everything back how it was
```

### Interactive rebase — cleaning up your commits

Before opening a PR, you might want to tidy your commit history. Interactive rebase lets you squash, reword, or reorder commits:

```bash
git rebase -i HEAD~3         # interactively edit the last 3 commits
```

This opens an editor showing your commits:

```
pick abc1234 feat: add button base styles
pick def5678 fix: typo in button label
pick ghi9012 feat: add button hover state
```

Common actions:
| Command | What it does |
|---------|--------------|
| `pick` | Keep the commit as-is |
| `squash` (or `s`) | Merge this commit into the one above it |
| `reword` (or `r`) | Keep the commit but edit the message |
| `drop` (or `d`) | Delete the commit entirely |

Example — squashing that typo fix into the first commit:

```
pick abc1234 feat: add button base styles
squash def5678 fix: typo in button label
pick ghi9012 feat: add button hover state
```

Save and close. Git will then let you write a new combined commit message.

### When to rebase vs merge

| Situation | Use |
|-----------|-----|
| Updating your feature branch with latest `main` | **Rebase** — keeps history clean |
| Combining messy WIP commits before a PR | **Interactive rebase** — squash into logical commits |
| Branch has already been pushed and others are working on it | **Merge** — don't rewrite shared history |
| You're unsure or uncomfortable | **Merge** — it's always safe |

### The golden rule of rebasing

> **Never rebase commits that have been pushed and shared with others.**

Rebasing rewrites commit history. If someone else has based work on your original commits, rewriting them causes chaos. Only rebase commits that are local to you, or on a branch that only you are working on.

If you've already pushed and need to rebase, you'll need to force-push afterwards:

```bash
git push --force-with-lease   # safer than --force; fails if someone else pushed
```

Use `--force-with-lease` instead of `--force` — it protects you from accidentally overwriting someone else's work.

---

## Common Situations

### "I made changes but I'm on the wrong branch"

If you haven't committed yet:

```bash
git stash                    # temporarily shelve your changes
git checkout correct-branch  # switch to the right branch
git stash pop                # apply your changes here
```

### "I want to undo my last commit"

If you haven't pushed yet:

```bash
git reset --soft HEAD~1      # undo the commit, keep the changes staged
```

### "I want to see what happened"

```bash
git log --oneline -10        # last 10 commits, one line each
```

### "I need to discard all my local changes"

```bash
git checkout .               # discard all uncommitted changes (cannot be undone)
```

---

## Important Rules for This Project

1. **Never push directly to `main`** — always use a branch and a Pull Request
2. **Never force-push** (`git push --force`) unless explicitly told to by a lead
3. **Use conventional commits** — the format matters for our changelog and automation
4. **Keep PRs focused** — one feature or fix per PR, not a grab-bag of changes
5. **Pull before you push** — always pull the latest `main` before starting new work

---

## VS Code Integration

VS Code has excellent Git support built in (same on macOS and Windows):

- **Source Control panel** (left sidebar, branch icon) — see changes, stage files, commit
- **GitLens extension** — see who changed what and when, inline blame annotations
- **Bottom status bar** — shows your current branch; click to switch branches
- **Integrated terminal** — open with `` Ctrl+` `` (Windows) or `` ⌃` `` (macOS). On Windows this defaults to PowerShell — Git commands work the same there

You can do everything from the terminal or from the VS Code UI — whichever you prefer.

> **Windows tip:** If you prefer a bash-style terminal inside VS Code, open the terminal dropdown and select "Git Bash" (available after installing Git for Windows).

---

## Platform Differences Cheat Sheet

Most Git commands are identical across macOS and Windows. Here are the few things that differ:

| Topic | macOS | Windows |
|-------|-------|---------|
| Default terminal | Terminal (zsh) | PowerShell or Git Bash |
| Open terminal in VS Code | `⌃\`` | `Ctrl+\`` |
| File paths | `/Users/you/Sites/Foundation` | `C:\Users\you\Sites\Foundation` |
| Line endings | LF (Unix) | CRLF (Windows) — Git converts automatically if configured |
| Clipboard (copy a commit hash) | `pbcopy` | `clip` |

Line endings are the most common cross-platform issue. If you installed Git for Windows with the recommended setting ("Checkout as-is, commit Unix-style line endings"), this is handled for you. If not, run:

```bash
git config --global core.autocrlf true
```

---

## Glossary

| Term | Definition |
|------|-----------|
| **Stage** | Mark a file to be included in the next commit |
| **HEAD** | The commit you're currently on |
| **Origin** | The default name for the remote (GitHub) copy of the repo |
| **Merge conflict** | When two branches change the same lines and Git can't auto-resolve |
| **Stash** | A temporary shelf for uncommitted changes |
| **Rebase** | Replay your commits on top of another branch's latest state — cleaner than merge |
| **Squash** | Combine multiple commits into one |
| **Diff** | A view of what changed between two states |

---

## Further Reading

- [GitHub's Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Oh Shit, Git!?!](https://ohshitgit.com/) — plain-English fixes for common mistakes
