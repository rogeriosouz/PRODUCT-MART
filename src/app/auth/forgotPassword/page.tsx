import { FormForgotPassword } from '@/components/forms'
import { User } from 'lucide-react'

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-5">
      <div className="w-[480px] rounded bg-white px-10 py-14 shadow-2xl md:px-5 sm:w-full">
        <div className="mb-10 flex w-full flex-col items-center justify-center space-y-3 ">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-text-primary text-2xl font-bold">
            Forgot Password
          </h1>
        </div>

        <FormForgotPassword />
      </div>
    </div>
  )
}
