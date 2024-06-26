import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useProducts() {
  const { get } = useSearchParams()
  const categoryParams = get('category')
  const search = get('search')
  const discount = get('discount')

  const [ordemProduct, setOrdemProduct] = useState('asc')
  const [page, setPage] = useState(1)

  const { push } = useRouter()

  useEffect(() => {
    if (!categoryParams || categoryParams === 'null') {
      push(
        `/products?category=all-products&discount=${discount}&search=${search}`,
      )

      return
    }

    push(
      `/products?category=${categoryParams}&discount=${discount}&search=${search}`,
    )
  }, [discount, categoryParams, push, search])

  function setCategoryQuerryParams(category: string) {
    push(`/products?category=${category}`)
  }

  function setValuePage(page: number) {
    setPage(page)
  }

  function prevPage() {
    setPage(page - 1)
  }

  function nextPage() {
    setPage(page + 1)
  }

  function setValueOrdemProduct(ordem: string): void {
    setOrdemProduct(ordem)
  }

  return {
    ordemProduct,
    page,
    setValuePage,
    prevPage,
    nextPage,
    setValueOrdemProduct,
    setCategoryQuerryParams,
    categoryParams,
    search,
    discount,
  }
}
