import { ComponentProps } from 'react'

type MapPinProps = ComponentProps<'svg'>
export function MapPin({ ...rest }: MapPinProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M11.386 23.789l-.003-.002-.006-.005-.022-.017-.08-.064a38.025 38.025 0 01-1.345-1.14 40.773 40.773 0 01-3.173-3.142c-1.154-1.282-2.33-2.78-3.222-4.366C2.648 13.476 2 11.739 2 10a10 10 0 0120 0c0 1.74-.648 3.476-1.535 5.053-.892 1.586-2.068 3.084-3.222 4.366a40.77 40.77 0 01-4.517 4.282l-.081.064-.022.017-.006.005-.002.002L12 23l.614.79a1 1 0 01-1.228-.001zM12 23l-.614.789L12 23zm3-13a3 3 0 11-6 0 3 3 0 016 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
