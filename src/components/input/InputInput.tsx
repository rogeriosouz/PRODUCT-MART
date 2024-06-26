'use client'
import clsx from 'clsx'
import { EyeOff, Eye } from 'lucide-react'
import { useState, ComponentProps } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputInputProps extends ComponentProps<'input'> {
  typeInput: 'password' | 'text' | 'number' | 'search'
  isErro: boolean
  messageError?: string
  register?: UseFormRegister<any>
  nameRegister?: string
  options?: RegisterOptions
}

export function InputInput({
  typeInput,
  isErro,
  messageError,
  register,
  nameRegister,
  options,
  ...rest
}: InputInputProps) {
  const [visibleInput, setVisibleInput] = useState(false)
  const registerRef =
    register && nameRegister ? register(nameRegister, options) : {}

  return (
    <div className="group relative w-full overflow-hidden rounded">
      <input
        type={
          typeInput === 'password'
            ? visibleInput
              ? 'text'
              : 'password'
            : typeInput
        }
        {...registerRef}
        {...rest}
        className={clsx(
          'w-full rounded border  px-3 py-2 text-sm font-normal outline-none',
          {
            'border-red-500 text-red-500 placeholder:text-red-500 group-focus-within:border-red-500':
              isErro,

            'border-zinc-900/20 group-focus-within:border-bg-blue': !isErro,
          },
          rest.className,
        )}
      />

      {typeInput === 'password' && (
        <button
          type="button"
          onClick={() => setVisibleInput((v) => !v)}
          className="absolute left-[93%] top-1/2 -translate-y-1/2"
        >
          {visibleInput ? (
            <EyeOff
              className={clsx('h-4 w-4 ', {
                'text-red-500': isErro,
                'text-zinc-900/80': !isErro,
              })}
            />
          ) : (
            <Eye
              className={clsx('h-4 w-4 ', {
                'text-red-500': isErro,
                'text-zinc-900/80': !isErro,
              })}
            />
          )}
        </button>
      )}
    </div>
  )
}
