import { querryClient } from '@/lib/querryClient'
import { api } from '@/lib/axios'
import { useState } from 'react'
import { useMutation } from 'react-query'

export function useCart() {
  const [loadingCartUpdate, setLoadingCartUpdate] = useState(false)

  function startLoadingCart() {
    setLoadingCartUpdate(true)
  }

  function stopLoadingCart() {
    setLoadingCartUpdate(false)
  }

  const updateQuantProductCartMutation = useMutation<
    unknown,
    unknown,
    { quantItem: number; idItemCart: string },
    unknown
  >(
    async ({ idItemCart, quantItem }) => {
      startLoadingCart()
      const response = await api.put('/cart', {
        idItemCart,
        quantItem,
      })

      return response.data
    },
    {
      onSuccess() {
        setTimeout(() => {
          stopLoadingCart()
          querryClient.invalidateQueries(['/cart'])
        }, 1000)
      },
    },
  )

  function updateQuant({
    quantItem,
    idItemCart,
  }: {
    quantItem: number
    idItemCart: string
  }) {
    updateQuantProductCartMutation.mutate({ idItemCart, quantItem })
  }

  return {
    updateQuant,
    loadingCartUpdate,
    startLoadingCart,
    stopLoadingCart,
  }
}
