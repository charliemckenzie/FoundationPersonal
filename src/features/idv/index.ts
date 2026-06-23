// Public API surface for the reusable IDV module.
// Consumers import from '@/features/idv' only — never reach into internal files.

// Components
export { StepIDV, canSubmitIDV } from './StepIDV';
export type { StepIDVProps } from './StepIDV';
export { IdvModal } from './IdvModal';
export type { IdvModalProps } from './IdvModal';
export { OfflineIdv } from './OfflineIdv';
export type { OfflineIdvProps } from './OfflineIdv';
export { IdDocumentsModal } from './IdDocumentsModal';
export type { IdDocumentsModalProps } from './IdDocumentsModal';
export {
  VerifyDetailsContent,
  requiredFieldsFilled,
  verifyDetailsCanContinue,
} from './VerifyDetailsContent';
export type { VerifyDetailsContentProps } from './VerifyDetailsContent';

// Hook
export { useIdvGate } from './useIdvGate';
export type { UseIdvGate, IdvStatus } from './useIdvGate';

// Service
export { checkIDVCache, setIDVCache, clearIDVCache, submitIDV } from './idvService';

// Constants & factories
export {
  AUSTRALIAN_STATES,
  MEDICARE_COLOUR_OPTIONS,
  MOCK_USER_PROFILE,
  IDV_STORAGE_KEY,
  IDV_CACHE_YEARS,
  initialIDVState,
  initialVerifyDetailsState,
  initialOtherIdState,
  OTHER_ID_METHOD_OPTIONS,
} from './constants';

// Types
export type {
  IDVDocument,
  IDVState,
  OtherIdMethod,
  OtherIdState,
  UserProfile,
  VerifyDetailsState,
} from './types';
