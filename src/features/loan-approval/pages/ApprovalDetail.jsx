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
import { isFirebaseConfigured } from '@/services/firebase/firebase'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object' && typeof value.toDate === 'function') return formatDateTime(value.toDate())
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function DocumentValue({ value }) {
  if (Array.isArray(value)) {
    return value.length ? (
      <ul className="m-0 list-disc pl-5">
        {value.map((item, index) => <li key={item?.id || index}><DocumentValue value={item} /></li>)}
      </ul>
    ) : '—'
  }

  const url = typeof value === 'string' ? value : value?.url || value?.downloadURL || value?.downloadUrl
  if (typeof url === 'string' && /^https?:\/\//i.test(url)) {
    const label = typeof value === 'object' && (value.name || value.fileName)
    return <a href={url} target="_blank" rel="noreferrer" className="font-medium text-brand hover:underline">{label || 'Open document'}</a>
  }
  return formatValue(value)
}

function documentItems(documents = {}) {
  if (!documents || typeof documents !== 'object' || Array.isArray(documents)) return []
  return Object.entries(documents).map(([label, value]) => ({
    label: label.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase()),
    value: <DocumentValue value={value} />,
  }))
}

export default function ApprovalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const { hasPermission } = useAuth()
  const approval = useApproval(id)
  const history = useApprovalHistory(id)
  const decision = useApprovalDecision(id)

  const onSubmit = async (values) => {
    const payload = { decision: values.decision, comment: values.comment }
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
  const witness = record.witness || {}
  const applicantDetails = [
    { label: 'Full name', value: record.fullName || record.customerName || record.name },
    { label: 'Email', value: record.email },
    { label: 'Phone', value: record.phone },
    { label: 'Address', value: record.address },
    { label: 'Date of birth', value: record.dob || record.dateOfBirth },
    { label: 'Gender', value: record.gender },
    { label: 'Employer', value: record.employerName },
    { label: 'Job title', value: record.jobTitle },
    { label: 'Monthly income', value: record.monthlyIncome },
  ].map((item) => ({ ...item, value: formatValue(item.value) }))
  const witnessDetails = [
    { label: 'Full name', value: witness.fullName },
    { label: 'Phone', value: witness.phone },
    { label: 'Address', value: witness.address },
    { label: 'Date of birth', value: witness.dob },
    { label: 'Gender', value: witness.gender },
    { label: 'Employer', value: witness.employerName },
    { label: 'Job title', value: witness.jobTitle },
    { label: 'Monthly income', value: witness.monthlyIncome },
  ].map((item) => ({ ...item, value: formatValue(item.value) }))
  const applicantDocuments = documentItems(record.applicantDocuments || record.documents)
  const witnessDocuments = documentItems(witness.documents)
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
            { label: 'Applicant', value: record.fullName || record.customerName || record.name || '—' },
            { label: 'Email', value: record.email || '—' },
            { label: 'Current status', value: <StatusBadge status={record.status} /> },
          ]}
        />
      </PanelCard>
      {isFirebaseConfigured && (
        <PanelCard>
          <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Applicant details</h2>
          <InfoGrid items={applicantDetails} />
        </PanelCard>
      )}
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Loan information</h2>
        <InfoGrid
          items={[
            { label: 'Requested', value: <Money value={record.amount} /> },
            { label: 'Duration', value: record.termMonths ? `${record.termMonths} months` : '—' },
            { label: 'Purpose', value: record.purpose || '—' },
            ...(isFirebaseConfigured ? [
              { label: 'Loan ID', value: record.loanId || '—' },
              { label: 'Term in years', value: record.loanTermYears ? `${record.loanTermYears} years` : '—' },
              { label: 'Interest rate', value: record.rate || '—' },
            ] : []),
            { label: 'Submitted', value: formatValue(record.createdAt) },
          ]}
        />
      </PanelCard>
      {isFirebaseConfigured && applicantDocuments.length > 0 && (
        <PanelCard>
          <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Applicant documents</h2>
          <InfoGrid items={applicantDocuments} />
        </PanelCard>
      )}
      {isFirebaseConfigured && record.propertyImage && (
        <PanelCard>
          <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Property image</h2>
          <InfoGrid items={[{ label: 'Property image', value: <DocumentValue value={record.propertyImage} /> }]} />
        </PanelCard>
      )}
      {isFirebaseConfigured && Object.keys(witness).length > 0 && (
        <PanelCard>
          <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Witness details</h2>
          <InfoGrid items={witnessDetails} />
          {witnessDocuments.length > 0 && <InfoGrid items={witnessDocuments} />}
        </PanelCard>
      )}
      {!isFirebaseConfigured && (
        <PanelCard>
          <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Application history</h2>
          {history.isError ? (
            <Alert type="error" showIcon message={getErrorMessage(history.error)} />
          ) : (
            <ApprovalHistory items={history.data?.items || []} />
          )}
        </PanelCard>
      )}
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
