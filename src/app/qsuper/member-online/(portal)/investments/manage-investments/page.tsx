import { InvestmentAccountSelect } from '@/features/investment-mix/InvestmentAccountSelect';
import { MOCK_ACCOUNTS } from '@/features/investment-mix/mockData';

export default function QSuperManageInvestmentsPage() {
  return (
    <InvestmentAccountSelect
      accounts={MOCK_ACCOUNTS}
      formPath="/qsuper/member-online/investments/manage-investments/change-mix"
      historyPath="/qsuper/member-online/investments/manage-investments/history"
    />
  );
}
