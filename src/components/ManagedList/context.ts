import { createContext, useContext } from 'react';

export interface ManagedListContextValue {
  itemVariant: 'card' | 'list';
  metadataVariant: 'row' | 'column';
}

export const ManagedListContext = createContext<ManagedListContextValue>({
  itemVariant: 'card',
  metadataVariant: 'row',
});

export const useManagedListContext = () => useContext(ManagedListContext);
