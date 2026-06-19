'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { NavConfigKey } from './navigation-config';
import { DEFAULT_NAV_CONFIG } from './navigation-config';

interface NavConfigContextValue {
  navConfig: NavConfigKey;
  setNavConfig: (key: NavConfigKey) => void;
}

const NavConfigContext = createContext<NavConfigContextValue | null>(null);

/**
 * Shares the active member-online navigation config between the portal layout
 * (which renders the nav) and the dashboard page (which renders the control).
 */
export function NavConfigProvider({ children }: { children: ReactNode }) {
  const [navConfig, setNavConfig] = useState<NavConfigKey>(DEFAULT_NAV_CONFIG);
  const value = useMemo(() => ({ navConfig, setNavConfig }), [navConfig]);
  return <NavConfigContext.Provider value={value}>{children}</NavConfigContext.Provider>;
}

export function useNavConfig(): NavConfigContextValue {
  const ctx = useContext(NavConfigContext);
  if (!ctx) {
    throw new Error('useNavConfig must be used within a NavConfigProvider');
  }
  return ctx;
}
