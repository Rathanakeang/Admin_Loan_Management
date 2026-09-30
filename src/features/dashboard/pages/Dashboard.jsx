import { Alert } from 'antd'
import { useQuery } from '@tanstack/react-query'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import SummaryCards from '@/features/dashboard/components/SummaryCards'
import LoanChart from '@/features/dashboard/components/LoanChart'
import PaymentChart from '@/features/dashboard/components/PaymentChart'
import RecentLoans from '@/features/dashboard/components/RecentLoans'
import { dashboardService } from '@/features/dashboard/services/dashboardService'
import { getErrorMessage } from '@/services/api/apiClient'

export default function Dashboard() {
  const summary = useQuery({ queryKey: ['dashboard', 'summary'], queryFn: dashboardService.summary })
  const registrations = useQuery({
    queryKey: ['dashboard', 'registrations'],
    queryFn: dashboardService.registrationChart,
  })
  const loans = useQuery({ queryKey: ['dashboard', 'loans'], queryFn: dashboardService.loanChart })
  const payments = useQuery({ queryKey: ['dashboard', 'payments'], queryFn: dashboardService.paymentChart })
  const recent = useQuery({ queryKey: ['dashboard', 'recent'], queryFn: dashboardService.recentLoans })

  const firstError = [summary, registrations, loans, payments, recent].find((query) => query.isError)

  return (
    <div>
      <PageToolbar
        title="User registration"
        description="Applications, decisions, and payment activity for this browser copy."
      />
      {firstError && (
        <Alert
          type="error"
          showIcon
          className="mb-4"
          message={getErrorMessage(firstError.error)}
        />
      )}
      <SummaryCards summary={summary.data} />
      <LoanChart
        title="Total diagram"
        labels={registrations.data?.labels}
        values={registrations.data?.values}
        loading={registrations.isLoading}
      />
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PaymentChart
          labels={payments.data?.labels}
          values={payments.data?.values}
          loading={payments.isLoading}
        />
        <LoanChart
          title="Loan volume"
          labels={loans.data?.labels}
          values={loans.data?.values}
          loading={loans.isLoading}
        />
      </div>
      <RecentLoans items={recent.data?.items} loading={recent.isLoading} />
    </div>
  )
}
