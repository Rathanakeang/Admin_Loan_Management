import { Empty } from 'antd'

export default function EmptyState({ description = 'No records yet' }) {
  return (
    <div className="py-6">
      <Empty description={description} />
    </div>
  )
}
