# Foundation Design System

A Next.js-based design system built with MUI, Font Awesome Pro, and Storybook.

## Prerequisites

- Node.js 20+ 
- npm or yarn
- Font Awesome Pro license (required for icon packages)

## First-Time Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Foundation
```

### 2. Configure Font Awesome Pro Access

This project uses Font Awesome Pro, which requires authentication:

1. Get your Font Awesome Pro token:
   - Go to https://fontawesome.com/account
   - Navigate to "Kits & API Tokens"
   - Copy your **Package Token** (not API Token)

2. Create your local `.npmrc` file:
   ```bash
   # Copy the example file
   cp .npmrc.example .npmrc
   
   # On Windows:
   copy .npmrc.example .npmrc
   ```

3. Edit `.npmrc` and replace `YOUR_FONTAWESOME_PRO_TOKEN_HERE` with your actual token

**Note:** The `.npmrc` file is git-ignored for security. Never commit your token to the repository.

### 3. Install dependencies

```bash
npm install
```

### 4. Verify setup

```bash
npm run check-setup
```

### 5. Configure VS Code (Recommended)

If using GitHub Copilot or Claude Code, add this to your VS Code settings to auto-apply AI changes without manual approval prompts:

1. Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
2. Search for "settings json" and click **"Open Settings (JSON)"**
3. Add this line:
   ```json
   "github.copilot.editor.enableAutoApply": true
   ```

This prevents the "Keep/Undo" diff prompts from appearing for AI-suggested changes.

## Development

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Run Storybook

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the component library.

## Project Structure

```
Foundation/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── themes/       # MUI theme configuration
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable components
│   ├── stories/          # Storybook stories
│   └── lib/              # Utilities (Font Awesome setup)
├── docs/                 # Documentation
├── public/               # Static assets
└── scripts/              # Build scripts
```

## Available Commands

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build Storybook for deployment
- `npm run check-setup` - Verify environment setup
- `npm run lint` - Run ESLint

## Documentation

- [Font Awesome Pro Guide](docs/fontawesome-pro-guide.md) - How to use Font Awesome Pro icons
- [Agents Guide](AGENTS.md) - Team structure and workflows

## Troubleshooting

### Font Awesome Pro Installation Fails

**Error:** `npm ERR! 401 Unauthorized`

**Solution:** 
1. Verify your `.npmrc` file exists with a valid token
2. Check your Font Awesome Pro subscription is active
3. Ensure you copied the **Package Token** (not API Token)

### Icons Not Showing

**Solution:**
1. Verify Font Awesome Pro packages are installed: `npm list @fortawesome`
2. Check Storybook is loading the icon library (see Components / Icon examples)
3. Restart your dev server after installing packages

## Team Onboarding

New team members should:
1. Follow the **First-Time Setup** steps above (especially step 2 for Font Awesome)
2. Run `npm run check-setup` to verify everything works
3. Run `npm run storybook` to explore the component library
4. Read [AGENTS.md](AGENTS.md) to understand team workflows

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
