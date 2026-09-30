import { Timeline } from 'antd'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import StatusBadge from '@/components/common/StatusBadge/StatusBadge'
import { formatDateTime } from '@/utils/formatDate'

export default function ApprovalHistory({ items = [] }) {
  if (items.length === 0) return <EmptyState description="No approval history" />
  return (
    <Timeline
      items={items.map((item) => ({
        children: (
          <div>
            <StatusBadge status={item.decision || item.status} />
            {item.comment ? <p className="mt-2 mb-1 text-sm text-ink">{item.comment}</p> : null}
            <p className="m-0 text-xs text-muted">
              {formatDateTime(item.createdAt)}
              {item.actorName || item.actor ? ` · ${item.actorName || item.actor}` : ''}
            </p>
          </div>
        ),
      }))}
    />
  )
}
