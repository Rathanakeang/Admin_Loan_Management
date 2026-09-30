import { Alert, App } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@/components/common/Button/Button'
import Input from '@/components/common/Input/Input'
import Loading from '@/components/common/Loading/Loading'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import ConversationList from '@/features/messages/components/ConversationList'
import CustomerSummary from '@/features/messages/components/CustomerSummary'
import ChatThread from '@/features/messages/components/ChatThread'
import { useConversations, useThread } from '@/features/messages/hooks/useMessages'
import { getErrorMessage } from '@/services/api/apiClient'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PERMISSIONS } from '@/utils/permissions'

export default function Chat() {
  const { userId } = useParams()
  const { message } = App.useApp()
  const { hasPermission } = useAuth()
  const conversations = useConversations()
  const thread = useThread(userId)
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)

  const onSend = async () => {
    if (!text.trim() && !file) return
    try {
      await thread.send.mutateAsync({ text: text.trim(), file })
      setText('')
      setFile(null)
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const onDelete = async (messageId) => {
    try {
      await thread.remove.mutateAsync(messageId)
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  return (
    <div>
      <PageToolbar
        title={thread.customer?.name ? `Chat with ${thread.customer.name}` : 'Messages'}
        description="Admin replies stay with this customer conversation."
      />
      <div className="grid min-h-[640px] grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <PanelCard className="p-3 md:p-4">
          <ConversationList items={conversations.items} loading={conversations.isLoading} activeId={userId} />
        </PanelCard>
        <PanelCard>
          {thread.isLoading && <Loading />}
          {thread.isError && <Alert type="error" showIcon message={getErrorMessage(thread.error)} />}
          {!thread.isLoading && !thread.isError && (
            <>
              <CustomerSummary customer={thread.customer} />
              <ChatThread messages={thread.messages} onDelete={onDelete} />
              {hasPermission(PERMISSIONS.MESSAGE_REPLY) && (
                <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center">
                  <input
                    type="file"
                    aria-label="Attach a file"
                    className="text-sm text-muted"
                    onChange={(event) => setFile(event.target.files?.[0] || null)}
                  />
                  <Input
                    placeholder="Write a reply"
                    aria-label="Message"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onPressEnter={onSend}
                  />
                  <Button onClick={onSend} loading={thread.send.isPending}>Send</Button>
                </div>
              )}
            </>
          )}
        </PanelCard>
      </div>
    </div>
  )
}
