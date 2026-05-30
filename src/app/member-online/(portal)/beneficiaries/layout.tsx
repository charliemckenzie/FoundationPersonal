'use client';

import { BeneficiariesProvider } from '../../../../features/beneficiaries/BeneficiariesContext';

export default function BeneficiariesLayout({ children }: { children: React.ReactNode }) {
  return <BeneficiariesProvider>{children}</BeneficiariesProvider>;
}
