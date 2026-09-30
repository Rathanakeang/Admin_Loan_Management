import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { loanProductService } from '@/features/loan-products/services/loanProductService'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'

export function useLoanProducts() {
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput)
  const { page, pageSize, setPage, onChange } = usePagination()

  useEffect(() => {
    setPage(1)
  }, [search, setPage])

  const query = useQuery({
    queryKey: ['loan-products', search, page, pageSize],
    queryFn: () => loanProductService.list({ search, page, pageSize }),
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

export function useLoanProduct(id) {
  return useQuery({
    queryKey: ['loan-products', id],
    queryFn: () => loanProductService.getById(id),
    enabled: Boolean(id),
  })
}

export function useSaveLoanProduct(id) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => (id ? loanProductService.update(id, payload) : loanProductService.create(payload)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['loan-products'] }),
  })
}
