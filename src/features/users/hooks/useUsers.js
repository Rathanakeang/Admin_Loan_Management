import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/features/users/services/userService'
import { usePagination } from '@/hooks/usePagination'

export function useUsers() {
  const { page, pageSize, onChange } = usePagination()
  const query = useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: () => userService.list({ page, pageSize }),
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

export function useUser(id) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}
