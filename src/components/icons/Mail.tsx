import { ComponentProps } from 'react'

type MailProps = ComponentProps<'svg'>
export function Mail({ ...rest }: MailProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...rest} viewBox="0 -3.5 32 32">
      <g>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill="#000" transform="translate(-414 -261)">
            <path d="M430 275.916l-3.316-2.749-11.569 11.843h29.476l-11.356-11.863-3.235 2.769zm4.89-4.026l11.002 11.439a2.53 2.53 0 00.108-.695v-19.772l-11.11 9.028zM414 262.816v19.818c0 .243.045.473.108.695l11.039-11.402L414 262.816zM445 261h-30l15 12.019L445 261z"></path>
          </g>
        </g>
      </g>
    </svg>
  )
}
