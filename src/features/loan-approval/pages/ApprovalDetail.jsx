import { Alert, App } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@/components/common/Loading/Loading'
import InfoGrid from '@/components/common/InfoGrid/InfoGrid'
import Money from '@/components/common/Money/Money'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import ApprovalForm from '@/features/loan-approval/components/ApprovalForm'
import ApprovalHistory from '@/features/loan-approval/components/ApprovalHistory'
import { useApproval, useApprovalDecision, useApprovalHistory } from '@/features/loan-approval/hooks/useApproval'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDateTime } from '@/utils/formatDate'
import { approvalSchema } from '@/utils/validation'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PERMISSIONS } from '@/utils/permissions'

export default function ApprovalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const { hasPermission } = useAuth()
  const approval = useApproval(id)
  const history = useApprovalHistory(id)
  const decision = useApprovalDecision(id)

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      approvedAmount: values.decision === 'APPROVED' ? values.approvedAmount : null,
    }
    try {
      await approvalSchema.validate(payload, { abortEarly: false })
    } catch (error) {
      message.error(error.errors?.[0] || 'Check the form')
      return
    }
    try {
      await decision.mutateAsync(payload)
      message.success(payload.decision === 'APPROVED' ? 'Loan approved' : 'Loan rejected')
      navigate('/approvals')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  if (approval.isLoading) return <Loading />
  if (approval.isError) return <Alert type="error" showIcon message={getErrorMessage(approval.error)} />

  const record = approval.data || {}
  return (
    <div className="flex flex-col gap-4">
      <PageToolbar
        title="Review application"
        description={`Application ${id}`}
        actions={<StatusBadge status={record.status} />}
      />
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Applicant information</h2>
        <InfoGrid
          items={[
            { label: 'Application ID', value: id },
            { label: 'Applicant', value: record.customerName || record.name || '—' },
            { label: 'Email', value: record.email || '—' },
            { label: 'Current status', value: <StatusBadge status={record.status} /> },
          ]}
        />
      </PanelCard>
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Loan information</h2>
        <InfoGrid
          items={[
            { label: 'Requested', value: <Money value={record.amount} /> },
            { label: 'Duration', value: record.termMonths ? `${record.termMonths} months` : '—' },
            { label: 'Purpose', value: record.purpose || '—' },
            { label: 'Submitted', value: formatDateTime(record.createdAt) },
          ]}
        />
      </PanelCard>
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Application history</h2>
        {history.isError ? (
          <Alert type="error" showIcon message={getErrorMessage(history.error)} />
        ) : (
          <ApprovalHistory items={history.data?.items || []} />
        )}
      </PanelCard>
      {hasPermission(PERMISSIONS.APPROVAL_DECIDE) && (
        <PanelCard>
          <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Decision</h2>
          {decision.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(decision.error)} />}
          <ApprovalForm onSubmit={onSubmit} submitting={decision.isPending} />
        </PanelCard>
      )}
    </div>
  )
}
