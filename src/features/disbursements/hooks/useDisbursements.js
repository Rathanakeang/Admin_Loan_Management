import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { disbursementService } from '@/features/disbursements/services/disbursementService'
import { usePagination } from '@/hooks/usePagination'

export function useDisbursements() {
  const { page, pageSize, onChange } = usePagination()
  const query = useQuery({
    queryKey: ['disbursements', page, pageSize],
    queryFn: () => disbursementService.list({ page, pageSize }),
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

export function useDisbursement(id) {
  return useQuery({
    queryKey: ['disbursements', id],
    queryFn: () => disbursementService.getById(id),
    enabled: Boolean(id),
  })
}

export function useRecordDisbursement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: disbursementService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['disbursements'] }),
  })
}
