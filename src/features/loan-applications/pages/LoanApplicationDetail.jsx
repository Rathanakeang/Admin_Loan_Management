import { Alert } from 'antd'
import { useParams } from 'react-router-dom'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Loading from '@/components/common/Loading/Loading'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import InfoGrid from '@/components/common/InfoGrid/InfoGrid'
import Money from '@/components/common/Money/Money'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import ApplicationStatus from '@/features/loan-applications/components/ApplicationStatus'
import ApprovalHistory from '@/features/loan-approval/components/ApprovalHistory'
import { useLoanApplication } from '@/features/loan-applications/hooks/useLoanApplications'
import { useApprovalHistory } from '@/features/loan-approval/hooks/useApproval'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDateTime } from '@/utils/formatDate'
import { PERMISSIONS } from '@/utils/permissions'

export default function LoanApplicationDetail() {
  const { id } = useParams()
  const application = useLoanApplication(id)
  const history = useApprovalHistory(id)
  const { hasPermission } = useAuth()

  if (application.isLoading) return <Loading />
  if (application.isError) return <Alert type="error" showIcon message={getErrorMessage(application.error)} />

  const record = application.data || {}
  const pending = record.status === 'PENDING'
  const documents = record.documents || []

  return (
    <div className="flex flex-col gap-4">
      <PageToolbar
        title="Loan request"
        description={record.customerName || record.name || 'Application'}
        actions={(
          <div className="flex flex-wrap items-center gap-2">
            <ApplicationStatus status={record.status} />
            {hasPermission(PERMISSIONS.APPLICATION_MANAGE) && pending && (
              <LinkButton to={`/loan-applications/${id}/edit`} variant="secondary">Edit</LinkButton>
            )}
            {hasPermission(PERMISSIONS.APPROVAL_DECIDE) && pending && (
              <LinkButton to={`/approvals/${id}`}>Send to review</LinkButton>
            )}
          </div>
        )}
      />
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Applicant information</h2>
        <InfoGrid
          items={[
            { label: 'Applicant', value: record.customerName || record.name || '—' },
            { label: 'Email', value: record.email || '—' },
            { label: 'Purpose', value: record.purpose || '—' },
            { label: 'Submitted', value: formatDateTime(record.createdAt) },
          ]}
        />
      </PanelCard>
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Loan information</h2>
        <InfoGrid
          items={[
            { label: 'Amount', value: <Money value={record.amount} /> },
            { label: 'Duration', value: record.termMonths ? `${record.termMonths} months` : '—' },
            { label: 'Status', value: <ApplicationStatus status={record.status} /> },
          ]}
        />
      </PanelCard>
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Documents</h2>
        {documents.length === 0 ? (
          <EmptyState description="No documents attached" />
        ) : (
          <ul className="m-0 list-none p-0">
            {documents.map((document) => (
              <li key={document.id || document.fileName} className="border-b border-line py-2 text-sm text-ink last:border-b-0">
                {document.fileName || document.name || 'Document'}
              </li>
            ))}
          </ul>
        )}
      </PanelCard>
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Application history</h2>
        {history.isError ? (
          <Alert type="error" showIcon message={getErrorMessage(history.error)} />
        ) : (
          <ApprovalHistory items={history.data?.items || []} />
        )}
      </PanelCard>
    </div>
  )
}
