#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SOURCE_ROOT = join(root, 'src', 'assets', 'icons', 'font-awesome');
const TARGET_ROOT = join(root, 'public', 'icons', 'font-awesome');
const VARIANTS = ['solid', 'light'];

function ensureDir(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function syncVariant(variant) {
  const sourcePath = join(SOURCE_ROOT, variant);
  const targetPath = join(TARGET_ROOT, variant);

  ensureDir(targetPath);

  if (!existsSync(sourcePath)) {
    console.log(`- Skipped ${variant}: source folder not found (${sourcePath})`);
    return;
  }

  cpSync(sourcePath, targetPath, { recursive: true, force: true });
  console.log(`- Synced ${variant}: ${sourcePath} -> ${targetPath}`);
}

console.log('Syncing local Font Awesome icon assets...');
ensureDir(TARGET_ROOT);

for (const variant of VARIANTS) {
  syncVariant(variant);
}

console.log('Done.');
