import { Table as AntTable } from 'antd'
import EmptyState from '@/components/common/EmptyState/EmptyState'

export default function Table({ pagination = false, ...props }) {
  return (
    <AntTable
      size="middle"
      rowKey={(record) => record.id || record.userId || record.email}
      pagination={pagination}
      scroll={{ x: 720 }}
      locale={{ emptyText: <EmptyState description="No records yet" /> }}
      {...props}
    />
  )
}
