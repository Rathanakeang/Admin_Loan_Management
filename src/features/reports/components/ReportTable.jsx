import Table from '@/components/common/Table/Table'
import EmptyState from '@/components/common/EmptyState/EmptyState'

export default function ReportTable({ columns, items = [], loading = false, emptyText = 'No records in this period' }) {
  if (!loading && items.length === 0) return <EmptyState description={emptyText} />
  return <Table loading={loading} dataSource={items} columns={columns} pagination={false} />
}
