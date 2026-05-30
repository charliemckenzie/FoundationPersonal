'use client';

import React, { createContext, useContext, useState } from 'react';
import type { Nomination } from './types';

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

export function BeneficiariesProvider({ children }: { children: React.ReactNode }) {
  const [nomination, setNomination] = useState<Nomination | null>(null);

  const saveNomination = (n: Nomination) => setNomination(n);
  const clearNomination = () => setNomination(null);

  return (
    <BeneficiariesContext.Provider value={{ nomination, saveNomination, clearNomination }}>
      {children}
    </BeneficiariesContext.Provider>
  );
}

export function useBeneficiaries() {
  return useContext(BeneficiariesContext);
}
