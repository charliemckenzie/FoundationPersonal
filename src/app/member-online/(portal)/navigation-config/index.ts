import type { MemberNavItem } from '../../../../components/MemberOnline';
import type { NavConfigData, ResolvedNavConfig } from './types';
import accumulation from './configs/accumulation.json';
import zero from './configs/zero.json';
import eligible from './configs/eligible.json';
import decumulation from './configs/decumulation.json';
import both from './configs/both.json';

// --- Registration -----------------------------------------------------------
// Add a new config by dropping a JSON file in ./configs and listing it here.
// The order below is the order shown in the dashboard switcher.
const CONFIG_FILES = {
  accumulation,
  zero,
  eligible,
  decumulation,
  both,
} satisfies Record<string, NavConfigData>;

export type NavConfigKey = keyof typeof CONFIG_FILES;

/**
 * The config shown on first load. This is the single seam for the (later)
 * "which config is active" mechanism — today the portal context seeds its
 * initial state from it; later it can be chosen from member state.
 */
export const DEFAULT_NAV_CONFIG: NavConfigKey = 'accumulation';

// --- Dev-only validation ----------------------------------------------------
// Catches authoring mistakes in the JSON before they reach the UI. Throws at
// module init in dev so a bad edit fails fast and loud; silent in production.

function collectIds(items: MemberNavItem[], into: string[]): void {
  for (const item of items) {
    into.push(item.id);
    if (item.children) collectIds(item.children, into);
  }
}

function validateItems(items: MemberNavItem[], configKey: string): void {
  for (const item of items) {
    if (!item.id) throw new Error(`[nav:${configKey}] An item is missing "id".`);
    if (!item.label) throw new Error(`[nav:${configKey}] Item "${item.id}" is missing "label".`);
    if (item.children && item.children.length === 0) {
      throw new Error(`[nav:${configKey}] Item "${item.id}" has an empty "children" array — remove it or add children.`);
    }
    if (item.children) validateItems(item.children, configKey);
  }
}

function validateConfig(configKey: string, data: NavConfigData): void {
  validateItems(data.primary, configKey);
  validateItems(data.secondary, configKey);

  const ids: string[] = [];
  collectIds(data.primary, ids);
  collectIds(data.secondary, ids);
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) throw new Error(`[nav:${configKey}] Duplicate id "${id}" — ids must be unique within a config.`);
    seen.add(id);
  }
}

// --- Dev-only "unbuilt links" report ----------------------------------------
// Lists every leaf still pointing at the "#" placeholder, so the gap between
// "in the nav" and "has a real page" stays visible as the nav grows.

function collectUnbuilt(items: MemberNavItem[], into: string[]): void {
  for (const item of items) {
    if (item.children) collectUnbuilt(item.children, into);
    else if (item.href === '#') into.push(item.label);
  }
}

function reportUnbuiltLinks(configKey: string, data: NavConfigData): void {
  const unbuilt: string[] = [];
  collectUnbuilt(data.primary, unbuilt);
  collectUnbuilt(data.secondary, unbuilt);
  if (unbuilt.length > 0) {
    console.info(`[nav:${configKey}] Unbuilt links (href "#"): ${unbuilt.join(', ')}`);
  }
}

if (process.env.NODE_ENV !== 'production') {
  for (const [key, data] of Object.entries(CONFIG_FILES)) {
    validateConfig(key, data);
    reportUnbuiltLinks(key, data);
  }
}

// --- Distribution -----------------------------------------------------------

function resolve(data: NavConfigData): ResolvedNavConfig {
  return {
    label: data.label,
    balance: data.balance,
    primaryItems: data.primary,
    secondaryItems: data.secondary,
  };
}

export const NAV_CONFIGS = Object.fromEntries(
  (Object.keys(CONFIG_FILES) as NavConfigKey[]).map((key) => [key, resolve(CONFIG_FILES[key])]),
) as Record<NavConfigKey, ResolvedNavConfig>;

export const NAV_CONFIG_OPTIONS = (Object.keys(CONFIG_FILES) as NavConfigKey[]).map((value) => ({
  value,
  label: NAV_CONFIGS[value].label,
}));
