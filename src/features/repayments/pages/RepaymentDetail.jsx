import { Alert } from 'antd'
import { useParams } from 'react-router-dom'
import Loading from '@/components/common/Loading/Loading'
import InfoGrid from '@/components/common/InfoGrid/InfoGrid'
import Money from '@/components/common/Money/Money'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import PaymentHistory from '@/features/repayments/components/PaymentHistory'
import { usePaymentHistory, useRepayment } from '@/features/repayments/hooks/useRepayments'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDate } from '@/utils/formatDate'

export default function RepaymentDetail() {
  const { id } = useParams()
  const repayment = useRepayment(id)
  const loanId = repayment.data?.loanId
  const history = usePaymentHistory(loanId)

  if (repayment.isLoading) return <Loading />
  if (repayment.isError) return <Alert type="error" showIcon message={getErrorMessage(repayment.error)} />

  const record = repayment.data || {}
  return (
    <div className="flex flex-col gap-4">
      <PageToolbar title="Payment" description={record.customerName || id} actions={<StatusBadge status={record.status} />} />
      <PanelCard>
        <InfoGrid
          items={[
            { label: 'Loan / application ID', value: record.loanId || '—' },
            { label: 'Customer', value: record.customerName || '—' },
            { label: 'Amount', value: <Money value={record.amount} /> },
            { label: 'Payment date', value: formatDate(record.paidAt) },
            { label: 'Payment method', value: record.method || '—' },
            { label: 'Reference', value: record.note || '—' },
          ]}
        />
      </PanelCard>
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Payment history</h2>
        {history.isError ? (
          <Alert type="error" showIcon message={getErrorMessage(history.error)} />
        ) : (
          <PaymentHistory items={history.data?.items} loading={history.isLoading} />
        )}
      </PanelCard>
    </div>
  )
}
