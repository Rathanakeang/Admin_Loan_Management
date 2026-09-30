import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/features/notifications/services/notificationService'
import { usePagination } from '@/hooks/usePagination'

export function useNotifications() {
  const { page, pageSize, onChange } = usePagination(20)
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['notifications', page, pageSize],
    queryFn: () => notificationService.list({ page, pageSize }),
  })

  const markRead = useMutation({
    mutationFn: notificationService.markRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  return {
    page,
    pageSize,
    onChange,
    items: query.data?.items || [],
    total: query.data?.total || 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    markRead: markRead.mutate,
  }
}
