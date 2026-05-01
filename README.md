# Foundation Design System

A Next.js-based design system built with MUI, local SVG icons, and Storybook.

## Prerequisites

- Node.js 20+ 
- npm or yarn

## First-Time Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Foundation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Verify setup

```bash
npm run check-setup
```

### 4. Configure VS Code (Recommended)

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
│   └── assets/           # Asset metadata
├── docs/                 # Documentation
├── public/icons/         # Local icon assets served by Next.js
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
- `npm run sync-font-awesome-icons` - Copy local Font Awesome SVGs from `src/assets/icons/font-awesome` to `public/icons/font-awesome`

## Documentation

- [Local Icons Guide](docs/fontawesome-pro-guide.md) - How to use local SVG icons
- [Agents Guide](AGENTS.md) - Team structure and workflows

## Troubleshooting

### Icons Not Showing

**Solution:**
1. Confirm the icon exists under `public/icons/qsuper`.
2. Pass the icon file name (without `.svg`) to the `Icon` component.
3. Restart your dev server if you have just added new static files.

### Font Awesome Local Icons

Use this folder structure:
1. `src/assets/icons/font-awesome/solid`
2. `src/assets/icons/font-awesome/light`

Then run:
1. `npm run sync-font-awesome-icons`

Runtime paths are served from:
1. `public/icons/font-awesome/solid`
2. `public/icons/font-awesome/light`

## Team Onboarding

New team members should:
1. Follow the **First-Time Setup** steps above
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
