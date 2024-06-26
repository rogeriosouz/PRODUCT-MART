'use client'
import { convertPrice } from '@/utils/convertePrice'
import { LoadingProductsCart } from './components/LoadingProductsCart'
import { ProductsCart } from './components/ProductsCart'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { Cart as CartIcon } from '@/components/icons'
import { Trash2 } from 'lucide-react'
import { ModalClearCart } from './components/ModalClearCart'
import { useModal } from '@/hooks/useModal'
import { useQuery } from 'react-query'
import { ResponseCartType } from '@/types/ResponseCartType'
import { api } from '@/lib/axios'
import { LoadingCartUpdate } from './components/loadingCartUpdate'
import { Button } from '@/components/ui/button'

export default function Cart() {
  const { loadingCartUpdate, updateQuant, startLoadingCart, stopLoadingCart } =
    useCart()

  const { close, open, openModal } = useModal()

  const { data, status } = useQuery<ResponseCartType>(['/cart'], async () => {
    const response = await api.get('/cart')
    return response.data
  })

  if (data && data.cart.itemsCarts.length <= 0) {
    return (
      <div className="h-screen w-full pt-[160px]">
        <div className="mx-auto w-[400px] text-center">
          <h1 className="mb-2 text-2xl font-bold text-zinc-900">
            Your cart is empty.
          </h1>
          <p className="mb-4 text-lg font-normal text-zinc-900">
            Want to look at other similar products?
          </p>

          <Link
            href={'/products'}
            className="bg-bg-blue mx-auto flex w-[300px] items-center justify-center gap-3 rounded py-2 font-semibold text-white"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-[150px] min-h-screen px-12 lg:px-5">
      <LoadingCartUpdate loadingCartUpdate={loadingCartUpdate} />

      <ModalClearCart
        startLoadingCart={startLoadingCart}
        stopLoadingCart={stopLoadingCart}
        close={close}
        open={openModal}
      />

      <div className="mx-auto flex items-start gap-10 lg:flex-col">
        <div className="flex w-full flex-1 flex-col">
          <div className="my-5 flex w-full items-center justify-between rounded bg-white p-5 shadow-xl sm:flex-col sm:items-start sm:gap-2">
            <div className="flex items-center gap-2">
              <CartIcon className="h-5 w-5 fill-zinc-900" />
              <h1 className="text-lg font-medium text-zinc-900">Products</h1>
            </div>

            <Button onClick={open} variant={'outline'} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Remove products
            </Button>
          </div>

          {status === 'loading' && (
            <div className="flex w-full flex-col gap-3">
              <LoadingProductsCart />
              <LoadingProductsCart />
              <LoadingProductsCart />
            </div>
          )}

          {status === 'success' && data && (
            <div className="flex w-full flex-col gap-3">
              {data.cart.itemsCarts.map((product) => (
                <ProductsCart
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  discount={product.Promotion ? product.Promotion.discount : 0}
                  slug={product.slug}
                  image={product.image}
                  priceTotalQuant={product.priceTotalQuant}
                  quant={product.quant}
                  type={product.type}
                  updateQuant={updateQuant}
                  startLoadingCart={startLoadingCart}
                  stopLoadingCart={stopLoadingCart}
                />
              ))}
            </div>
          )}
        </div>

        <div className="sticky top-[150px] w-[450px] bg-white px-10 py-10 shadow-xl lg:w-full md:px-5">
          <div className="mb-7 flex w-full items-end gap-1 px-2">
            <h1 className="text-lg font-medium uppercase text-zinc-900">
              summary
            </h1>
          </div>

          <div className="mb-5 flex w-full items-center justify-between px-2">
            <p className="text-base font-medium  text-zinc-900">
              Value of Products:
            </p>

            {status === 'success' && data && (
              <p className="text-bg-red text-base font-bold">
                {convertPrice(data?.cart.totalPrice)}
              </p>
            )}
          </div>

          <Button asChild variant={'default'} className="w-full">
            <Link href={'/checkout'}>Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
