import { Alert } from 'antd'
import { useParams } from 'react-router-dom'
import Loading from '@/components/common/Loading/Loading'
import InfoGrid from '@/components/common/InfoGrid/InfoGrid'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import { useUser } from '@/features/users/hooks/useUsers'
import { getErrorMessage } from '@/services/api/apiClient'
import { PERMISSIONS, resolvePermissions } from '@/utils/permissions'

const ROLE_LABELS = {
  SUPER_ADMIN: 'Super admin',
  ADMIN: 'Admin',
  LOAN_OFFICER: 'Loan officer',
  VIEWER: 'Viewer',
}

const GROUPS = [
  { label: 'Customers', permissions: [PERMISSIONS.CUSTOMER_VIEW, PERMISSIONS.CUSTOMER_MANAGE] },
  { label: 'Loan applications', permissions: [PERMISSIONS.APPLICATION_VIEW, PERMISSIONS.APPLICATION_MANAGE] },
  { label: 'Approvals', permissions: [PERMISSIONS.APPROVAL_VIEW, PERMISSIONS.APPROVAL_DECIDE] },
  { label: 'Disbursements', permissions: [PERMISSIONS.DISBURSEMENT_VIEW, PERMISSIONS.DISBURSEMENT_MANAGE] },
  { label: 'Repayments', permissions: [PERMISSIONS.REPAYMENT_VIEW, PERMISSIONS.REPAYMENT_RECORD] },
  { label: 'Reports', permissions: [PERMISSIONS.REPORT_VIEW] },
  { label: 'Messages', permissions: [PERMISSIONS.MESSAGE_VIEW, PERMISSIONS.MESSAGE_REPLY] },
  { label: 'Notifications', permissions: [PERMISSIONS.NOTIFICATION_VIEW] },
  { label: 'Staff users', permissions: [PERMISSIONS.USER_VIEW, PERMISSIONS.USER_MANAGE] },
]

export default function UserDetail() {
  const { id } = useParams()
  const user = useUser(id)
  if (user.isLoading) return <Loading />
  if (user.isError) return <Alert type="error" showIcon message={getErrorMessage(user.error)} />
  const record = user.data || {}
  const granted = new Set(resolvePermissions(record))

  return (
    <div className="flex flex-col gap-4">
      <PageToolbar title={record.name || 'Staff user'} description="Staff profile and the screens this role can open." />
      <PanelCard>
        <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Profile</h2>
        <InfoGrid
          items={[
            { label: 'Name', value: record.name || '—' },
            { label: 'Email', value: record.email || '—' },
            { label: 'Role', value: ROLE_LABELS[record.role] || record.role || '—' },
          ]}
        />
      </PanelCard>
      <PanelCard>
        <h2 className="mt-0 mb-1 text-lg font-semibold text-ink">Permissions</h2>
        <p className="mt-0 mb-4 text-sm text-muted">Shown from the role. This screen only controls what the interface displays.</p>
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
          {GROUPS.map((group) => {
            const included = group.permissions.filter((permission) => granted.has(permission))
            return (
              <li key={group.label} className="rounded-lg border border-line px-4 py-3">
                <p className="m-0 text-sm font-medium text-ink">{group.label}</p>
                <p className="mt-1 mb-0 text-sm text-muted">
                  {included.length ? 'Visible in this console' : 'Hidden in this console'}
                </p>
              </li>
            )
          })}
        </ul>
      </PanelCard>
    </div>
  )
}
