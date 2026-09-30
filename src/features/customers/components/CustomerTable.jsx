import { Link } from 'react-router-dom'
import Table from '@/components/common/Table/Table'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PERMISSIONS } from '@/utils/permissions'

export default function CustomerTable({ items, loading }) {
  const { hasPermission } = useAuth()
  const canManage = hasPermission(PERMISSIONS.CUSTOMER_MANAGE)

  return (
    <Table
      loading={loading}
      dataSource={items}
      columns={[
        { title: 'User ID', dataIndex: 'userId', render: (value, record) => value || record.id },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Phone', dataIndex: 'phone', render: (value) => value || '—' },
        {
          title: 'Actions',
          dataIndex: 'id',
          width: 140,
          render: (id) => (
            <span className="inline-flex gap-3">
              <Link to={`/customers/${id}`} className="text-sm font-medium text-brand hover:underline">View</Link>
              {canManage && (
                <Link to={`/customers/${id}/edit`} className="text-sm font-medium text-brand hover:underline">Edit</Link>
              )}
            </span>
          ),
        },
      ]}
    />
  )
}
