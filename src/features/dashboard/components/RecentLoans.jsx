import { Link } from 'react-router-dom'
import Table from '@/components/common/Table/Table'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import Money from '@/components/common/Money/Money'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import { formatDate } from '@/utils/formatDate'

export default function RecentLoans({ items = [], loading = false }) {
  return (
    <PanelCard className="mt-4">
      <h2 className="mt-0 mb-4 text-lg font-semibold text-ink">Recent loans</h2>
      {!loading && items.length === 0 ? (
        <EmptyState description="No recent loans" />
      ) : (
        <Table
          loading={loading}
          dataSource={items}
          pagination={false}
          columns={[
            {
              title: 'Name',
              dataIndex: 'customerName',
              render: (value, record) => value || record.name || '—',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              align: 'right',
              render: (value) => <Money value={value} />,
            },
            {
              title: 'Status',
              dataIndex: 'status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              title: 'Date',
              dataIndex: 'createdAt',
              render: (value) => formatDate(value),
            },
            {
              title: 'Action',
              dataIndex: 'id',
              width: 90,
              render: (id) => (id ? <Link to={`/loan-applications/${id}`} className="text-sm font-medium text-brand hover:underline">Open</Link> : null),
            },
          ]}
        />
      )}
    </PanelCard>
  )
}
