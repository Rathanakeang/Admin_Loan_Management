import { Link } from 'react-router-dom'
import Table from '@/components/common/Table/Table'
import Money from '@/components/common/Money/Money'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import { formatDate } from '@/utils/formatDate'

export default function RepaymentTable({ items, loading }) {
  return (
    <Table
      loading={loading}
      dataSource={items}
      columns={[
        { title: 'Loan / application ID', dataIndex: 'loanId', render: (value) => value || '—' },
        { title: 'Customer', dataIndex: 'customerName', render: (value, record) => value || record.name || '—' },
        { title: 'Amount', dataIndex: 'amount', align: 'right', render: (value) => <Money value={value} /> },
        { title: 'Payment date', dataIndex: 'paidAt', render: (value) => formatDate(value) },
        { title: 'Payment method', dataIndex: 'method', render: (value) => value || '—' },
        { title: 'Status', dataIndex: 'status', render: (value) => <StatusBadge status={value} /> },
        {
          title: 'Action',
          dataIndex: 'id',
          width: 90,
          render: (id) => <Link to={`/repayments/${id}`} className="text-sm font-medium text-brand hover:underline">Open</Link>,
        },
      ]}
    />
  )
}
