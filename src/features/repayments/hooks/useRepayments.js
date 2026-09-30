import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { repaymentService } from '@/features/repayments/services/repaymentService'
import { usePagination } from '@/hooks/usePagination'

export function useRepayments() {
  const { page, pageSize, onChange } = usePagination()
  const query = useQuery({
    queryKey: ['repayments', page, pageSize],
    queryFn: () => repaymentService.list({ page, pageSize }),
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

export function useRepayment(id) {
  return useQuery({
    queryKey: ['repayments', id],
    queryFn: () => repaymentService.getById(id),
    enabled: Boolean(id),
  })
}

export function usePaymentHistory(loanId) {
  return useQuery({
    queryKey: ['repayments', 'history', loanId],
    queryFn: () => repaymentService.history(loanId),
    enabled: Boolean(loanId),
  })
}

export function useRecordPayment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: repaymentService.record,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['repayments'] }),
  })
}
