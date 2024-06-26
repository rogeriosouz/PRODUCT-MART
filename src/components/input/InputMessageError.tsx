import { AlertCircle } from 'lucide-react'

interface InputMessageErroProps {
  message: string
}
export function InputMessageError({ message }: InputMessageErroProps) {
  return (
    <div className="mt-1 flex items-center gap-2">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <p className="text-xs font-normal text-red-500">{message}</p>
    </div>
  )
}
