import Table from '@/components/common/Table/Table'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import Money from '@/components/common/Money/Money'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import { formatDate } from '@/utils/formatDate'

export default function PaymentHistory({ items = [], loading = false }) {
  if (!loading && items.length === 0) return <EmptyState description="No payments recorded for this loan" />
  return (
    <Table
      loading={loading}
      dataSource={items}
      pagination={false}
      columns={[
        { title: 'Amount', dataIndex: 'amount', align: 'right', render: (value) => <Money value={value} /> },
        { title: 'Payment date', dataIndex: 'paidAt', render: (value) => formatDate(value) },
        { title: 'Payment method', dataIndex: 'method', render: (value) => value || '—' },
        { title: 'Status', dataIndex: 'status', render: (value) => <StatusBadge status={value} /> },
      ]}
    />
  )
}
