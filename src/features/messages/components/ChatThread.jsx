import { Button } from 'antd'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import { formatDateTime } from '@/utils/formatDate'

export default function ChatThread({ messages = [], onDelete }) {
  if (messages.length === 0) return <EmptyState description="No messages in this conversation" />

  return (
    <div className="flex min-h-[420px] flex-col gap-3">
      {messages.map((message) => {
        const fromAdmin = message.sender === 'admin' || message.fromAdmin || message.direction === 'outbound'
        return (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-lg border px-3.5 py-2.5 text-sm sm:max-w-[70%] ${fromAdmin ? 'ml-auto border-blue-100 bg-blue-50 text-ink' : 'border-line bg-white text-ink'}`}
          >
            <p className="m-0 mb-1 text-xs font-medium text-muted">{fromAdmin ? 'Admin' : 'Customer'}</p>
            {message.deleted ? (
              <em className="text-muted">This message was deleted</em>
            ) : (
              <>
                {message.fileName && <div>{message.fileName}</div>}
                {message.text && <div>{message.text}</div>}
              </>
            )}
            <div className="mt-1 text-xs text-subtle">{formatDateTime(message.createdAt)}</div>
            {fromAdmin && !message.deleted && message.id && (
              <Button type="link" size="small" danger onClick={() => onDelete(message.id)}>
                Delete
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
