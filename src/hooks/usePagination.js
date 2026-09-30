import { useState } from 'react'

export function usePagination(initialPageSize = 10) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const onChange = (nextPage, nextPageSize) => {
    setPage(nextPageSize !== pageSize ? 1 : nextPage)
    setPageSize(nextPageSize)
  }

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    onChange,
    reset() {
      setPage(1)
    },
  }
}
