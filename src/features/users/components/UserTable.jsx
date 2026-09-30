import { Link } from 'react-router-dom'
import Table from '@/components/common/Table/Table'

const ROLE_LABELS = {
  SUPER_ADMIN: 'Super admin',
  ADMIN: 'Admin',
  LOAN_OFFICER: 'Loan officer',
  VIEWER: 'Viewer',
}

export default function UserTable({ items, loading }) {
  return (
    <Table
      loading={loading}
      dataSource={items}
      columns={[
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Role', dataIndex: 'role', render: (value) => ROLE_LABELS[value] || value || '—' },
        {
          title: 'Actions',
          dataIndex: 'id',
          width: 90,
          render: (id) => <Link to={`/users/${id}`} className="text-sm font-medium text-brand hover:underline">View</Link>,
        },
      ]}
    />
  )
}
