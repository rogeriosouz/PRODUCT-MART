import { useState } from 'react'

export function useRequests() {
  const [ordemCreatedAt, setOrdemCreatedAt] = useState('asc')
  const [page, setPage] = useState(1)

  function setValuePage(page: number) {
    setPage(page)
  }

  function prevPage() {
    setPage(page - 1)
  }

  function nextPage() {
    setPage(page + 1)
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
  }
}
