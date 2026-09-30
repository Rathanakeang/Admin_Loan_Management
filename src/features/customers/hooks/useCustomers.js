import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { customerService } from '@/features/customers/services/customerService'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'

export function useCustomers() {
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput)
  const { page, pageSize, setPage, onChange } = usePagination()

  useEffect(() => {
    setPage(1)
  }, [search, setPage])

  const query = useQuery({
    queryKey: ['customers', search, page, pageSize],
    queryFn: () => customerService.list({ search, page, pageSize }),
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

export function useCustomer(id) {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => customerService.getById(id),
    enabled: Boolean(id),
  })
}

export function useSaveCustomer(id) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => (id ? customerService.update(id, payload) : customerService.create(payload)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] }),
  })
}
