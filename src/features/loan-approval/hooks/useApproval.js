import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { approvalService } from '@/features/loan-approval/services/approvalService'
import { usePagination } from '@/hooks/usePagination'

export function useApprovalQueue() {
  const { page, pageSize, onChange } = usePagination()
  const query = useQuery({
    queryKey: ['approvals', page, pageSize],
    queryFn: () => approvalService.queue({ page, pageSize, status: 'PENDING' }),
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
  }
}

export function useApproval(id) {
  return useQuery({
    queryKey: ['approvals', id],
    queryFn: () => approvalService.getById(id),
    enabled: Boolean(id),
  })
}

export function useApprovalHistory(id) {
  return useQuery({
    queryKey: ['approvals', id, 'history'],
    queryFn: () => approvalService.history(id),
    enabled: Boolean(id),
  })
}

export function useApprovalDecision(id) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => approvalService.decide(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvals'] })
      queryClient.invalidateQueries({ queryKey: ['loan-applications'] })
    },
  })
}
