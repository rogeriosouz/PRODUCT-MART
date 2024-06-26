import { querryClient } from '@/lib/querryClient'
import { api } from '@/lib/axios'
import { useMutation } from 'react-query'
import { Button } from '@/components/ui/button'

interface ModalClearCartProps {
  close: () => void
  open: boolean
  stopLoadingCart: () => void
  startLoadingCart: () => void
}

export function ModalClearCart({
  open = false,
  startLoadingCart,
  stopLoadingCart,
  close,
}: ModalClearCartProps) {
  const clearCartMutation = useMutation(
    async () => {
      startLoadingCart()
      const response = await api.delete('/cart')

      return response.data
    },
    {
      onSuccess() {
        setTimeout(() => {
          stopLoadingCart()
          querryClient.invalidateQueries(['/cart'])
        }, 2000)
      },
    },
  )

  function clearCart() {
    clearCartMutation.mutate()
  }

  return (
    <>
      {open && (
        <div className="animate__animated animate__fadeIn fixed bottom-0 left-0 right-0 top-0 z-[9999999] flex h-screen w-screen items-center justify-center bg-zinc-50/90 px-5">
          <div className="animate__animated animate__fadeInDown z-[9999999] rounded bg-white px-10 py-5 shadow-2xl ">
            <h1 className="mb-1 text-center text-2xl font-medium text-zinc-900">
              REMOVE ALL PRODUCTS
            </h1>
            <p className="mb-4 text-sm font-normal text-zinc-900">
              Are you sure you want to remove all products from your cart?
            </p>
            <div className="flex w-full items-center gap-2">
              <Button onClick={close} variant={'default'}>
                No
              </Button>

              <Button onClick={clearCart} variant={'destructive'}>
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
