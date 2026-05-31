'use client';

import React, { createContext, useContext, useState } from 'react';
import type { Nomination } from './types';

const STORAGE_KEY = 'qsuper_beneficiaries_nomination';

interface BeneficiariesContextValue {
  nomination: Nomination | null;
  saveNomination: (n: Nomination) => void;
  clearNomination: () => void;
}

const BeneficiariesContext = createContext<BeneficiariesContextValue>({
  nomination: null,
  saveNomination: () => {},
  clearNomination: () => {},
});

function readFromStorage(): Nomination | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Nomination) : null;
  } catch {
    return null;
  }
}

export function BeneficiariesProvider({ children }: { children: React.ReactNode }) {
  const [nomination, setNomination] = useState<Nomination | null>(readFromStorage);

  const saveNomination = (n: Nomination) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(n));
    setNomination(n);
  };
  const clearNomination = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setNomination(null);
  };

  return (
    <BeneficiariesContext.Provider value={{ nomination, saveNomination, clearNomination }}>
      {children}
    </BeneficiariesContext.Provider>
  );
}

export function useBeneficiaries() {
  return useContext(BeneficiariesContext);
}
