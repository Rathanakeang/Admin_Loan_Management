import { Alert } from 'antd'
import { Link } from 'react-router-dom'
import LinkButton from '@/components/common/LinkButton/LinkButton'
import Input from '@/components/common/Input/Input'
import Pagination from '@/components/common/Pagination/Pagination'
import Table from '@/components/common/Table/Table'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import Money from '@/components/common/Money/Money'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import { useLoanApplications } from '@/features/loan-applications/hooks/useLoanApplications'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDate } from '@/utils/formatDate'
import { PERMISSIONS } from '@/utils/permissions'

export default function LoanApplicationList() {
  const applications = useLoanApplications()
  const { hasPermission } = useAuth()

  return (
    <div>
      <PageToolbar
        title="Loan requests"
        description="Applications waiting for review, approval, or follow-up."
        actions={hasPermission(PERMISSIONS.APPLICATION_MANAGE) ? (
          <LinkButton to="/loan-applications/new">New application</LinkButton>
        ) : null}
      />
      <PanelCard>
        <div className="mb-4 max-w-md">
          <Input
            placeholder="Search by name or email"
            aria-label="Search loan requests"
            value={applications.searchInput}
            onChange={(event) => applications.setSearchInput(event.target.value)}
          />
        </div>
        {applications.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(applications.error)} />}
        <Table
          loading={applications.isLoading}
          dataSource={applications.items}
          columns={[
            { title: 'Applicant', dataIndex: 'customerName', render: (value, record) => value || record.name },
            { title: 'Email', dataIndex: 'email' },
            { title: 'Amount', dataIndex: 'amount', align: 'right', render: (value) => <Money value={value} /> },
            { title: 'Duration', dataIndex: 'termMonths', render: (value) => (value ? `${value} months` : '—') },
            { title: 'Status', dataIndex: 'status', render: (value) => <StatusBadge status={value} /> },
            { title: 'Date', dataIndex: 'createdAt', render: (value) => formatDate(value) },
            {
              title: 'Actions',
              dataIndex: 'id',
              width: 90,
              render: (id) => <Link to={`/loan-applications/${id}`} className="text-sm font-medium text-brand hover:underline">Open</Link>,
            },
          ]}
        />
        <Pagination total={applications.total} page={applications.page} pageSize={applications.pageSize} onChange={applications.onChange} />
      </PanelCard>
    </div>
  )
}
