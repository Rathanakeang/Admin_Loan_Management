import { Alert } from 'antd'
import { useParams } from 'react-router-dom'
import PageToolbar from '@/components/common/PageToolbar/PageToolbar'
import PanelCard from '@/components/common/PanelCard/PanelCard'
import ConversationList from '@/features/messages/components/ConversationList'
import { useConversations } from '@/features/messages/hooks/useMessages'
import { getErrorMessage } from '@/services/api/apiClient'

export default function MessageList() {
  const conversations = useConversations()
  const { userId } = useParams()

  return (
    <div>
      <PageToolbar title="Messages" description="Customer conversations for this console." />
      <PanelCard>
        {conversations.isError && <Alert type="error" showIcon message={getErrorMessage(conversations.error)} />}
        <ConversationList items={conversations.items} loading={conversations.isLoading} activeId={userId} />
      </PanelCard>
    </div>
  )
}
