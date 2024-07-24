import { Button } from '@/components/ui/button'
import { ItemsRequests, Address } from '@/types/ResponseRequestsType'
import { convertPrice } from '@/utils/convertePrice'
import { formatDate } from '@/utils/formatDate'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Pix } from '@/components/icons'
import { CreditCard } from '@phosphor-icons/react'
import Image from 'next/image'

interface RequestProps {
  numberId: number
  status: string
  date: string
  paymentMethod: string
  totalPrice: number
  address: Address
  productsRequest: ItemsRequests[]
}

export function Request({
  date,
  numberId,
  paymentMethod,
  status,
  productsRequest,
  totalPrice,
  address,
}: RequestProps) {
  const [openRequest, setOpenRequest] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusColor: any = {
    DONE: 'text-yellow-500',
    ERROR: 'text-red-500',
    CANCEL: 'text-red-500',
  }

  const IconPayment = paymentMethod === 'Pix' ? Pix : CreditCard

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="w-[180px] space-y-7  text-left">
          <p className="text-lg font-semibold text-zinc-900">REQUEST NUMBER</p>
          <p className="text-sm font-medium text-zinc-900">#{numberId}</p>
        </div>

        <div className="w-[180px] space-y-7 text-left md:hidden">
          <p className="text-lg font-semibold text-zinc-900">STATUS</p>
          <p className={`text-base font-semibold ${statusColor[status]}`}>
            {status}
          </p>
        </div>

        <div className="w-[180px] space-y-7 text-left md:hidden">
          <p className="text-lg font-semibold text-zinc-900">DATE</p>
          <p className="text-sm font-normal text-zinc-900">
            {formatDate(date)}
          </p>
        </div>

        <div className="w-[180px] space-y-7 text-left md:hidden">
          <p className="text-lg font-semibold text-zinc-900">PAYMENT</p>

          <div className="flex h-6 items-center gap-2">
            <IconPayment className="h-6 w-6" weight="fill" />

            <p className="text-sm font-normal text-zinc-900">{paymentMethod}</p>
          </div>
        </div>

        <Button
          onClick={() => setOpenRequest((v) => !v)}
          variant={'ghost'}
          className="flex h-full  items-center gap-2"
        >
          <p className="text-bg-blue text-base font-normal md:hidden">
            Order details
          </p>

          {openRequest ? (
            <ChevronUp className="text-bg-blue h-5 w-5 md:h-7 md:w-7" />
          ) : (
            <ChevronDown className="text-bg-blue h-5 w-5 md:h-7 md:w-7" />
          )}
        </Button>
      </div>

      {openRequest && (
        <div className="w-full">
          <div className="my-8 h-[2px] w-full bg-zinc-500/10"></div>

          <div className="mb-8 hidden space-y-5 md:block">
            <div className="w-[180px] space-y-2 text-left">
              <p className="text-lg font-semibold text-zinc-900">STATUS</p>
              <p className={`text-base font-semibold ${statusColor[status]}`}>
                {status}
              </p>
            </div>

            <div className="w-[180px] space-y-2 text-left">
              <p className="text-lg font-semibold text-zinc-900">DATE</p>
              <p className="text-sm font-normal text-zinc-900">
                {formatDate(date)}
              </p>
            </div>

            <div className="w-[180px] space-y-2 text-left">
              <p className="text-lg font-semibold text-zinc-900">PAYMENT</p>
              <div className="flex items-center gap-2">
                <IconPayment className="h-6 w-6" weight="fill" />
                <p className="text-sm font-normal text-zinc-900">
                  {paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 flex w-full flex-col gap-1">
            <h2 className="text-base font-medium text-zinc-900">Address</h2>
            <div>
              <p className="text-sm font-normal text-zinc-800">
                <span className="capitalize">{address.fistName}</span>,{' '}
              </p>
              <p className="text-sm font-normal text-zinc-800">
                {address.state}, Nº {address.aptNumber} - CEP: {address.zipcode}
              </p>
            </div>
          </div>

          <h2 className="mb-4 text-base font-medium text-zinc-900">
            Products ({productsRequest.length})
          </h2>

          <div className="flex w-full flex-col gap-5">
            {productsRequest.map(({ ItemsRequests }) => (
              <div
                key={ItemsRequests.id}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded border border-zinc-900">
                    <Image
                      src={ItemsRequests.image}
                      alt={ItemsRequests.name}
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="space-y-2 pt-3">
                    <p className="text-lg font-semibold text-zinc-900">
                      {ItemsRequests.name}
                    </p>
                    <p className="text-sm font-normal text-zinc-900">
                      Quantidade: {ItemsRequests.quant}
                    </p>
                  </div>
                </div>

                <p className="font-normal text-zinc-900">
                  {convertPrice(ItemsRequests.priceTotalQuant)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex w-full items-center justify-between bg-zinc-200 px-5 py-3">
            <p className="text-lg font-medium text-zinc-900">Total</p>
            <p className="text-base font-normal text-zinc-900">
              {convertPrice(totalPrice)}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
