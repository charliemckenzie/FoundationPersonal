// Public API surface for the reusable IDV module.
// Consumers import from '@/components/idv' only — never reach into internal files.

// Components
export { DigitalIDV, canSubmitIDV } from './DigitalIDV';
export type { DigitalIDVProps } from './DigitalIDV';
export { OfflineIdv } from './OfflineIdv';
export type { OfflineIdvProps } from './OfflineIdv';
export { IdDocumentsModal } from './IdDocumentsModal';
export type { IdDocumentsModalProps } from './IdDocumentsModal';


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
