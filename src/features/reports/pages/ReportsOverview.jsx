import { Alert } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import SummaryCards from '@/features/dashboard/components/SummaryCards'
import { reportService } from '@/features/reports/services/reportService'
import { getErrorMessage } from '@/services/api/apiClient'

const links = [
  ['/reports/loans', 'Loan applications', 'Applications in the selected period'],
  ['/reports/approved', 'Approved loans', 'Loans an admin approved'],
  ['/reports/rejected', 'Rejected loans', 'Loans an admin rejected'],
  ['/reports/repayments', 'Payments', 'Repayments by period'],
  ['/reports/customers', 'Customers', 'Registered customers'],
  ['/reports/portfolio', 'Portfolio', 'Outstanding balances and collections'],
]

export default function ReportsOverview() {
  const query = useQuery({
    queryKey: ['reports', 'overview'],
    queryFn: () => reportService.overview(),
  })

  return (
    <div>
      <PageToolbar
        title="Reports"
        description="Portfolio, applications, and payments for this browser copy."
      />
      {query.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(query.error)} />}
      <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">All-time overview</h2>
      <SummaryCards summary={query.data} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {links.map(([to, label, description]) => (
          <Link key={to} to={to} className="rounded-xl border border-line bg-white p-5 no-underline transition-colors hover:border-brand">
            <span className="block text-sm font-semibold text-ink">{label}</span>
            <span className="mt-1 block text-sm text-muted">{description}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
