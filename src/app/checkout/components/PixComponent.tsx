import { z } from 'zod'

export const schemaPix = z.object({})

export function PixComponent() {
  return (
    <div className="w-full px-4 py-5">
      <div className="w-full space-y-2">pix</div>
    </div>
  )
}
