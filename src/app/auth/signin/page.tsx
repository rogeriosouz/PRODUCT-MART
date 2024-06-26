import { FormSignin } from '@/components/forms'
import { User } from 'lucide-react'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-5">
      <div className="w-[480px] rounded bg-white px-10 py-14 shadow-2xl md:px-5 sm:w-full">
        <div className="mb-10 flex w-full flex-col items-center justify-center space-y-3 ">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-text-primary text-2xl font-bold">Sign In</h1>
        </div>

        <FormSignin />

        <div className="mt-3 flex w-full items-center justify-center gap-1">
          <p className="text-sm font-normal">If you don t have an account ?</p>
          <Link
            href={'/auth/signup'}
            className="text-sm font-normal text-zinc-900 transition-all hover:text-zinc-900/70 hover:underline"
          >
            SignUp now!
          </Link>
        </div>
      </div>
    </div>
  )
}
