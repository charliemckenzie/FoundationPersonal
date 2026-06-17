'use client';

import { ConsolidateProvider } from '@/features/consolidate/ConsolidateContext';

export default function ConsolidateLayout({ children }: { children: React.ReactNode }) {
  return <ConsolidateProvider>{children}</ConsolidateProvider>;
}
