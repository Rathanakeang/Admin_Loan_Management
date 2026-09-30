import { Alert } from 'antd'
import { Link } from 'react-router-dom'
import Pagination from '@/components/common/Pagination/Pagination'
import Table from '@/components/common/Table/Table'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import Money from '@/components/common/Money/Money'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import { useApprovalQueue } from '@/features/loan-approval/hooks/useApproval'
import { getErrorMessage } from '@/services/api/apiClient'
import { formatDate } from '@/utils/formatDate'

export default function ApprovalQueue() {
  const queue = useApprovalQueue()
  return (
    <div>
      <PageToolbar
        title="Approval queue"
        description="Pending loan applications waiting for a decision."
      />
      <PanelCard>
        {queue.isError && <Alert type="error" showIcon className="mb-4" message={getErrorMessage(queue.error)} />}
        <Table
          loading={queue.isLoading}
          dataSource={queue.items}
          columns={[
            { title: 'Applicant', dataIndex: 'customerName', render: (value, record) => value || record.name },
            { title: 'Amount', dataIndex: 'amount', align: 'right', render: (value) => <Money value={value} /> },
            { title: 'Duration', dataIndex: 'termMonths', render: (value) => (value ? `${value} months` : '—') },
            { title: 'Submitted date', dataIndex: 'createdAt', render: (value) => formatDate(value) },
            { title: 'Status', dataIndex: 'status', render: (value) => <StatusBadge status={value} /> },
            {
              title: 'Action',
              dataIndex: 'id',
              width: 100,
              render: (id) => <Link to={`/approvals/${id}`} className="text-sm font-medium text-brand hover:underline">Review</Link>,
            },
          ]}
        />
        <Pagination total={queue.total} page={queue.page} pageSize={queue.pageSize} onChange={queue.onChange} />
      </PanelCard>
    </div>
  )
}
