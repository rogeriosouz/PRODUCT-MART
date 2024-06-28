import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

export function useRequests() {
  const searchParams = useSearchParams()
  const defaultValuePage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1

  const defaultValueSearch = searchParams.get('search')
    ? searchParams.get('search')
    : ''

  const [ordemCreatedAt, setOrdemCreatedAt] = useState('desc')
  const [page, setPage] = useState(defaultValuePage)
  const { push } = useRouter()

  const [search, debouncedSearch] = useDebounceValue(defaultValueSearch, 500)

  useEffect(() => {
    push(`?page=${page}&search=${search}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  function debouncedSearchFn(value: string) {
    push(`?page=${page}&search=${value}`)
    debouncedSearch(value)
  }

  function setValuePage(page: number) {
    setPage(page)
  }

  function prevPage() {
    const newPage = page - 1

    setPage(newPage)
  }

  function nextPage() {
    const newPage = page + 1

    setPage(newPage)
  }

  function setValueOrdemCreatedAt(ordem: string): void {
    setOrdemCreatedAt(ordem)
  }

  return {
    ordemCreatedAt,
    page,
    setValuePage,
    prevPage,
    nextPage,
    setValueOrdemCreatedAt,
    search,
    debouncedSearchFn,
  }
}
