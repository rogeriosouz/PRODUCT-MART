import { Input } from '@/components/input'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

export const schemaCreditCart = z.object({
  cardNumber: z
    .string()
    .refine((value) => /^\d{4} \d{4} \d{4} \d{4}$/.test(value), {
      message: 'Enter a valid card number (XXXX XXXX XXXX XXXX).',
    })
    .transform((value) => value.replaceAll(' ', '')),
  cardHolder: z.string().min(2, 'Invalid Card Holder card holders full name'),
  expiration: z
    .string()
    .refine((value) => /^\d{1,2}\/\d{2}$/.test(value), {
      message: 'Enter the month and year in M/Y format (for example, 9/22).',
    })
    .transform((value) => ({
      month: value.split('/')[0],
      year: value.split('/')[1],
    })),
  cvv: z.string().min(3, 'Enter a valid cvv (XXX).'),
  cpf: z
    .string()
    .refine((value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value), {
      message: 'Enter a valid CPF (XXX.XXX.XXX-XX).',
    })
    .transform((value) => value.replaceAll('.', '').replace('-', '')),
})

export type TypeCreditCart = z.infer<typeof schemaCreditCart>

export function CreditCard() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<TypeCreditCart>()

  const handleExpiration = (event: any) => {
    let value = event.target.value

    value = value.replace(/\D/g, '')

    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, '$1/$2')
    }

    setValue('expiration', value)
  }

  const hadleCardNumber = (event: any) => {
    let value = event.target.value

    value = value.replace(/\D/g, '')

    if (value.length > 4) {
      value = value.replace(/^(\d{4})(\d)/, '$1 $2')
    }
    if (value.length > 9) {
      value = value.replace(/^(\d{4} \d{4})(\d)/, '$1 $2')
    }
    if (value.length > 14) {
      value = value.replace(/^(\d{4} \d{4} \d{4})(\d)/, '$1 $2')
    }

    setValue('cardNumber', value)
  }

  const hadleCpf = (event: any) => {
    let value = event.target.value

    value = value.replace(/\D/g, '')

    if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d)/, '$1.$2')
    }
    if (value.length > 6) {
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    }
    if (value.length > 9) {
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    }

    setValue('cpf', value)
  }

  return (
    <div className="w-full px-4 py-3 pb-6 transition-all">
      <div className="w-full space-y-2">
        <div className="flex w-full items-start gap-2 sm:flex-col sm:gap-2">
          <label className="block w-full">
            <p className="mb-1 text-sm font-normal text-zinc-800">
              Card Holder
            </p>
            <Input.Root>
              <Input.Input
                register={register}
                nameRegister="cardHolder"
                placeholder="Card Holder"
                isErro={!!errors.cardHolder}
                typeInput="text"
              />

              {errors.cardHolder && (
                <Input.MessageError
                  message={errors.cardHolder.message as string}
                />
              )}
            </Input.Root>
          </label>

          <label className="block w-full">
            <p className="mb-1 text-sm font-normal text-zinc-800">Cpf</p>
            <Input.Root>
              <Input.Input
                register={register}
                nameRegister="cpf"
                placeholder="EX: XXX-XXX-XX.XX"
                isErro={!!errors.cpf}
                typeInput="text"
                options={{
                  onChange: (e) => hadleCpf(e),
                }}
              />

              {errors.cpf && (
                <Input.MessageError message={errors.cpf.message as string} />
              )}
            </Input.Root>
          </label>
        </div>
        <label className="block w-full">
          <p className="mb-1 text-sm font-normal text-zinc-800">Card Number</p>
          <Input.Root>
            <Input.Input
              register={register}
              nameRegister="cardNumber"
              placeholder="XXXX XXXX XXXX XXXX"
              isErro={!!errors.cardNumber}
              typeInput="text"
              options={{
                onChange: (e) => hadleCardNumber(e),
              }}
            />

            {errors.cardNumber && (
              <Input.MessageError
                message={errors.cardNumber.message as string}
              />
            )}
          </Input.Root>
        </label>

        <div className=" flex w-full items-start gap-2 sm:flex-col">
          <label className="block w-full">
            <p className="mb-1 text-sm font-normal text-zinc-800">Expiration</p>
            <Input.Root>
              <Input.Input
                register={register}
                nameRegister="expiration"
                placeholder="NM/YY"
                isErro={!!errors.expiration}
                typeInput="text"
                options={{
                  onChange: (e) => handleExpiration(e),
                }}
              />

              {errors.expiration && (
                <Input.MessageError
                  message={errors.expiration.message as string}
                />
              )}
            </Input.Root>
          </label>

          <label className="w-full">
            <p className="mb-1 text-sm font-normal text-zinc-800">cvv</p>
            <Input.Root>
              <Input.Input
                register={register}
                nameRegister="cvv"
                placeholder="EX: XXX"
                isErro={!!errors.cvv}
                typeInput="text"
              />

              {errors.cvv && (
                <Input.MessageError message={errors.cvv.message as string} />
              )}
            </Input.Root>
          </label>
        </div>
      </div>
    </div>
  )
}
