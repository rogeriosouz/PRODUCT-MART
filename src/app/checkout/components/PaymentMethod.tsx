import * as RadioGroup from '@radix-ui/react-radio-group'
import { CreditCard, schemaCreditCart } from './CreditCard'
import { PixComponent, schemaPix } from './PixComponent'
import { CreditCard as CreditCardIcon } from 'lucide-react'
import { Pix } from '@/components/icons'
import clsx from 'clsx'

export const methodsData = [
  {
    name: 'Credit',
    paymentMethod: 'Credit',
    schema: schemaCreditCart,
    children: CreditCard,
    Icon: CreditCardIcon,
  },
  {
    name: 'Pix',
    paymentMethod: 'Pix',
    schema: schemaPix,
    children: PixComponent,
    Icon: Pix,
  },
]

interface PaymentMethodProps {
  methodSelect: string
  setValueMethodSelect: (method: string) => void
}

export function PaymentMethod({
  methodSelect,
  setValueMethodSelect,
}: PaymentMethodProps) {
  return (
    <div className="my-6 w-full">
      <h1 className="text-text-primary/90 text-2xl font-semibold">
        Payment Method
      </h1>

      <div className="mt-5 w-full space-y-2">
        <RadioGroup.Root
          defaultValue={'0'}
          onValueChange={setValueMethodSelect}
          className="space-y-3"
        >
          {methodsData.map((method: any, index: number) => (
            <div key={index} className="w-full rounded bg-white  shadow-2xl">
              <label className="flex w-full cursor-pointer items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <RadioGroup.Item
                    className="flex h-7 w-7 items-center justify-center rounded bg-zinc-200"
                    value={String(index)}
                  >
                    <RadioGroup.Indicator asChild>
                      <div className="h-3 w-3 rounded bg-primary"></div>
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>

                  <p className="text-base font-normal text-zinc-700">
                    {method.name}
                  </p>
                </div>

                <method.Icon />
              </label>

              <div
                className={clsx('w-full overflow-hidden transition-all', {
                  'h-min': index === Number(methodSelect),
                  'h-[0px]': index !== Number(methodSelect),
                })}
              >
                <method.children />
              </div>
            </div>
          ))}
        </RadioGroup.Root>
      </div>
    </div>
  )
}
