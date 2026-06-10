'use client';

import React, { createContext, useContext, useState } from 'react';
import type { InvestmentMixChange } from './types';

const STORAGE_KEY = 'foundation_investment_mix_change';

interface InvestmentMixContextValue {
  change: InvestmentMixChange | null;
  saveChange: (c: InvestmentMixChange) => void;
  clearChange: () => void;
}

const InvestmentMixContext = createContext<InvestmentMixContextValue>({
  change: null,
  saveChange: () => {},
  clearChange: () => {},
});

function readFromStorage(): InvestmentMixChange | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as InvestmentMixChange) : null;
  } catch {
    return null;
  }
}

export function InvestmentMixProvider({ children }: { children: React.ReactNode }) {
  const [change, setChange] = useState<InvestmentMixChange | null>(readFromStorage);

  const saveChange = (c: InvestmentMixChange) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    setChange(c);
  };

  const clearChange = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setChange(null);
  };

  return (
    <InvestmentMixContext.Provider value={{ change, saveChange, clearChange }}>
      {children}
    </InvestmentMixContext.Provider>
  );
}

export function useInvestmentMix() {
  return useContext(InvestmentMixContext);
}
