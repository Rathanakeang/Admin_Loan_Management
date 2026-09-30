import { Alert } from 'antd'
import { useParams } from 'react-router-dom'
import Loading from '@/components/common/Loading/Loading'
import InfoGrid from '@/components/common/InfoGrid/InfoGrid'
import Money from '@/components/common/Money/Money'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import { useDisbursement } from '@/features/disbursements/hooks/useDisbursements'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDate } from '@/utils/formatDate'

export default function DisbursementDetail() {
  const { id } = useParams()
  const disbursement = useDisbursement(id)
  if (disbursement.isLoading) return <Loading />
  if (disbursement.isError) return <Alert type="error" showIcon message={getErrorMessage(disbursement.error)} />
  const record = disbursement.data || {}
  return (
    <div>
      <PageToolbar title="Disbursement" description={record.reference || id} actions={<StatusBadge status={record.status} />} />
      <PanelCard>
        <InfoGrid
          items={[
            { label: 'Application ID', value: record.applicationId || '—' },
            { label: 'Customer', value: record.customerName || '—' },
            { label: 'Amount', value: <Money value={record.amount} /> },
            { label: 'Method', value: record.method || '—' },
            { label: 'Reference', value: record.reference || '—' },
            { label: 'Date', value: formatDate(record.disbursedAt) },
          ]}
        />
      </PanelCard>
    </div>
  )
}
