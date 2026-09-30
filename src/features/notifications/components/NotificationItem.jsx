import { formatRelative } from '@/utils/formatDate'

export default function NotificationItem({ item, onRead }) {
  return (
    <button
      type="button"
      onClick={() => onRead?.(item)}
      className={`flex w-full items-start gap-3 border-b border-line px-2 py-3 text-left last:border-b-0 ${item.read ? 'bg-transparent' : 'bg-blue-50/70'}`}
    >
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.read ? 'bg-transparent' : 'bg-red-500'}`} aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-ink">{item.title || item.type}</span>
        {(item.message || item.body) && (
          <span className="mt-1 block text-sm text-muted">{item.message || item.body}</span>
        )}
      </span>
      <span className="shrink-0 text-xs text-subtle">{formatRelative(item.createdAt)}</span>
    </button>
  )
}
