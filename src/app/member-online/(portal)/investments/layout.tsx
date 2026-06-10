'use client';

import { InvestmentMixProvider } from '../../../../features/investment-mix/InvestmentMixContext';

export default function InvestmentsLayout({ children }: { children: React.ReactNode }) {
  return <InvestmentMixProvider>{children}</InvestmentMixProvider>;
}
