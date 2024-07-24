'use client'
import { ChevronLeft, CircleDashed } from 'lucide-react'
import Link from 'next/link'
import { FormProvider } from 'react-hook-form'
import { Address } from './components/Address'
import { ItemCheckout } from './components/ItemCheckout'
import { LoadingItemCheckout } from './components/LoadingItemCheckout'
import { convertPrice } from '@/utils/convertePrice'
import { useCheckout } from '@/hooks/useCheckout'
import { Button } from '@/components/ui/button'

export default function Checkout() {
  const { data, methods, onSubmit, requestMutation, status } = useCheckout()

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
            className="bg-bg-blue mx-auto flex w-[300px] items-center justify-center gap-3 rounded py-2 font-semibold uppercase text-white"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto mt-[150px] flex w-full items-start gap-10 px-12 lg:flex-col md:px-5"
      >
        <div className="w-full flex-1">
          <Button variant={'ghost'}>
            <Link
              href={'/cart'}
              className="text-bg-blue flex w-[130px] items-center gap-2 text-base font-normal"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to cart
            </Link>
          </Button>

          <div className="mt-6 w-full space-y-4">
            {status === 'loading' && (
              <>
                <LoadingItemCheckout />
                <LoadingItemCheckout />
              </>
            )}

            {status === 'success' && data && (
              <>
                {data.cart.itemsCarts.map((itemCart) => (
                  <ItemCheckout
                    key={itemCart.id}
                    id={itemCart.id}
                    imageUrl={itemCart.image}
                    name={itemCart.name}
                    priceTotalQuant={itemCart.priceTotalQuant}
                    quant={itemCart.quant}
                    type={itemCart.type}
                  />
                ))}
              </>
            )}
          </div>

          <Address />
        </div>

        <div className="sticky top-[150px] w-[450px] rounded bg-white p-10 shadow-2xl lg:w-full sm:px-5">
          <div className="w-full space-y-5">
            <h1 className="text-2xl font-semibold text-zinc-900">
              Order Summary
            </h1>

            <div className="w-full space-y-1">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm text-zinc-600">
                  Items ({data && data.cart.itemsCarts.length}):
                </p>
                <p className="text-sm text-zinc-600">
                  {data && convertPrice(data.cart.totalPrice)}
                </p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm text-zinc-600">Frete</p>
                <p className="text-sm text-zinc-600">R$ 0,00</p>
              </div>
            </div>
          </div>

          <div className="mx-auto my-6 h-[1px] w-[99%] bg-zinc-400/30"></div>

          <div className="mb-6 flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-zinc-600">Total</p>
            <p className="text-lg font-semibold text-zinc-600">
              {' '}
              {data && convertPrice(data.cart.totalPrice)}
            </p>
          </div>

          <Button
            disabled={requestMutation.status === 'loading'}
            type="submit"
            className="w-full"
          >
            {requestMutation.status === 'loading' ? (
              <CircleDashed className="animate-spin" />
            ) : (
              'Go to payment'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
