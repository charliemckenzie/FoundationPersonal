'use client';

import React, { createContext, useContext, useState } from 'react';
import type { ConsolidateSubmission } from './types';

const STORAGE_KEY = 'consolidate_submission';

interface ConsolidateContextValue {
  submission: ConsolidateSubmission | null;
  saveRollover: (s: ConsolidateSubmission) => void;
  clearRollover: () => void;
}

const ConsolidateContext = createContext<ConsolidateContextValue>({
  submission: null,
  saveRollover: () => {},
  clearRollover: () => {},
});

function readFromStorage(): ConsolidateSubmission | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsolidateSubmission) : null;
  } catch {
    return null;
  }
}

export function ConsolidateProvider({ children }: { children: React.ReactNode }) {
  const [submission, setSubmission] = useState<ConsolidateSubmission | null>(readFromStorage);

  const saveRollover = (s: ConsolidateSubmission) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    setSubmission(s);
  };

  const clearRollover = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSubmission(null);
  };

  return (
    <ConsolidateContext.Provider value={{ submission, saveRollover, clearRollover }}>
      {children}
    </ConsolidateContext.Provider>
  );
}

export function useConsolidate() {
  return useContext(ConsolidateContext);
}
