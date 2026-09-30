import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { loanApplicationService } from '@/features/loan-applications/services/loanApplicationService'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'

export function useLoanApplications() {
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput)
  const { page, pageSize, setPage, onChange } = usePagination()

  useEffect(() => {
    setPage(1)
  }, [search, setPage])

  const query = useQuery({
    queryKey: ['loan-applications', search, page, pageSize],
    queryFn: () => loanApplicationService.list({ search, page, pageSize }),
  })

  return {
    searchInput,
    setSearchInput,
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

export function useLoanApplication(id) {
  return useQuery({
    queryKey: ['loan-applications', id],
    queryFn: () => loanApplicationService.getById(id),
    enabled: Boolean(id),
  })
}

export function useSaveLoanApplication(id) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => (
      id ? loanApplicationService.update(id, payload) : loanApplicationService.create(payload)
    ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['loan-applications'] }),
  })
}
