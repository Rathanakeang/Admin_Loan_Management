import { Link } from 'react-router-dom'
import Table from '@/components/common/Table/Table'
import Money from '@/components/common/Money/Money'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import { formatDate } from '@/utils/formatDate'

export default function DisbursementTable({ items, loading }) {
  return (
    <Table
      loading={loading}
      dataSource={items}
      columns={[
        { title: 'Application ID', dataIndex: 'applicationId', render: (value) => value || '—' },
        { title: 'Customer', dataIndex: 'customerName' },
        { title: 'Amount', dataIndex: 'amount', align: 'right', render: (value) => <Money value={value} /> },
        { title: 'Method', dataIndex: 'method', render: (value) => value || '—' },
        { title: 'Reference', dataIndex: 'reference', render: (value, record) => value || record.id },
        { title: 'Date', dataIndex: 'disbursedAt', render: (value) => formatDate(value) },
        { title: 'Status', dataIndex: 'status', render: (value) => <StatusBadge status={value} /> },
        {
          title: 'Action',
          dataIndex: 'id',
          width: 90,
          render: (id) => <Link to={`/disbursements/${id}`} className="text-sm font-medium text-brand hover:underline">Open</Link>,
        },
      ]}
    />
  )
}
