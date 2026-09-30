import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { messageService } from '@/features/messages/services/messageService'

export function useConversations() {
  const query = useQuery({
    queryKey: ['messages', 'conversations'],
    queryFn: () => messageService.conversations(),
  })
  return {
    items: query.data?.items || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}

export function useThread(userId) {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['messages', 'thread', userId],
    queryFn: () => messageService.thread(userId),
    enabled: Boolean(userId),
  })

  const send = useMutation({
    mutationFn: (payload) => messageService.send(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', 'thread', userId] })
      queryClient.invalidateQueries({ queryKey: ['messages', 'conversations'] })
    },
  })

  const remove = useMutation({
    mutationFn: (messageId) => messageService.remove(userId, messageId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages', 'thread', userId] }),
  })

  const thread = query.data || {}
  return {
    customer: thread.customer || thread.profile || null,
    messages: thread.messages || thread.items || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    send,
    remove,
  }
}
