import { useState } from 'react';
import { initialIDVState } from './constants';
import { checkIDVCache, setIDVCache, submitIDV } from './idvService';
import type { IDVState } from './types';

export type IdvStatus = 'verified' | 'unverified' | 'submitting' | 'error';

export interface UseIdvGate {
  status: IdvStatus;
  idvState: IDVState;
  setIdvState: (next: IDVState) => void;
  error: string;
  /** Runs submitIDV; on success caches + flips status to 'verified'. Returns success. */
  submit: () => Promise<boolean>;
  /** True if checkIDVCache() passed on mount (member already verified). */
  alreadyVerified: boolean;
}

const GENERIC_ERROR = 'We could not verify your identity. Please check your details and try again.';

/**
 * State machine for the IDV gate: holds the document form state, runs the
 * (mock) Equifax submit, and records a successful verification in the shared
 * cache. Consumers pair this with either StepIDV (inline) or IdvModal (dialog).
 */
export function useIdvGate(): UseIdvGate {
  const [alreadyVerified] = useState(() => checkIDVCache());
  const [status, setStatus] = useState<IdvStatus>(alreadyVerified ? 'verified' : 'unverified');
  const [idvState, setIdvState] = useState<IDVState>(initialIDVState);
  const [error, setError] = useState('');

  async function submit(): Promise<boolean> {
    setStatus('submitting');
    setError('');
    const result = await submitIDV(idvState.selectedDocument, idvState);
    if (result.success) {
      setIDVCache();
      setStatus('verified');
      return true;
    }
    setStatus('error');
    setError(result.error ?? GENERIC_ERROR);
    return false;
  }

  return { status, idvState, setIdvState, error, submit, alreadyVerified };
}
