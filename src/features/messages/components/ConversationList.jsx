import { useNavigate } from 'react-router-dom'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import Loading from '@/components/common/Loading/Loading'

export default function ConversationList({ items = [], loading = false, activeId }) {
  const navigate = useNavigate()
  if (loading) return <Loading tip="Loading conversations" />
  if (items.length === 0) return <EmptyState description="No conversations" />

  return (
    <ul className="m-0 list-none p-0">
      {items.map((item) => {
        const userId = item.userId || item.customerId || item.id
        const active = String(activeId) === String(userId)
        return (
          <li key={userId}>
            <button
              type="button"
              onClick={() => navigate(`/messages/${userId}`)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left ${active ? 'bg-blue-50' : 'hover:bg-canvas'}`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-canvas text-sm font-semibold text-brand">
                {item.name?.[0] || '?'}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-ink">{item.name}</span>
                <span className="block truncate text-xs text-muted">{item.lastMessage || item.preview || 'No messages yet'}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
