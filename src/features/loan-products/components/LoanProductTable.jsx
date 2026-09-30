import { Link } from 'react-router-dom'
import Table from '@/components/common/Table/Table'
import Money from '@/components/common/Money/Money'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PERMISSIONS } from '@/utils/permissions'

export default function LoanProductTable({ items, loading }) {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(PERMISSIONS.PRODUCT_MANAGE)

  return (
    <Table
      loading={loading}
      dataSource={items}
      columns={[
        { title: 'Name', dataIndex: 'name' },
        { title: 'Interest', dataIndex: 'interestRate', align: 'right', render: (value) => (value == null ? '—' : `${value}%`) },
        {
          title: 'Amount range',
          align: 'right',
          render: (_, record) => (
            <span className="tabular-nums"><Money value={record.minAmount} /> – <Money value={record.maxAmount} /></span>
          ),
        },
        { title: 'Term', render: (_, record) => `${record.minTermMonths ?? '—'}–${record.maxTermMonths ?? '—'} months` },
        {
          title: 'Actions',
          dataIndex: 'id',
          width: 140,
          render: (id) => (
            <span className="inline-flex gap-3">
              <Link to={`/loan-products/${id}`} className="text-sm font-medium text-brand hover:underline">View</Link>
              {canManage && (
                <Link to={`/loan-products/${id}/edit`} className="text-sm font-medium text-brand hover:underline">Edit</Link>
              )}
            </span>
          ),
        },
      ]}
    />
  )
}
