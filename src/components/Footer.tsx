import logo from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-bg-secondary mt-[41px] flex w-full flex-col justify-stretch px-[98px] py-10">
      <div className="flex items-start justify-between">
        <div className="flex w-[623px] items-start gap-[120px] ">
          <Image width={145} height={90} src={logo} alt="logo" />

          <div className="flex flex-col gap-5">
            <Link href={''} className="text-text-primary text-lg font-normal">
              Home
            </Link>
            <Link href={''} className="text-text-primary text-lg font-normal">
              Collection
            </Link>
            <Link href={''} className="text-text-primary text-lg font-normal">
              Products
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <Link href={''} className="text-text-primary text-lg font-normal">
              About
            </Link>
            <Link href={''} className="text-text-primary text-lg font-normal">
              Contact
            </Link>
            <Link href={''} className="text-text-primary text-lg font-normal">
              FAQ
            </Link>
          </div>
        </div>

        <div className="w-[500px] ">
          <p className="text-text-primary mb-10 text-lg font-normal">
            Be the first to know about our biggest and best sales. ll never send
            more than one email a month.
          </p>

          <input
            type="text"
            placeholder="ENTER YOUR EMAIL"
            className="border-text-primary placeholder:text-text-secondary mb-5 w-full border-b py-[14px] outline-none"
          />

          <div className="flex items-center gap-4">
            <div className="bg-bg-blue h-9 w-9 rounded-full"></div>
            <div className="bg-bg-blue h-9 w-9 rounded-full"></div>
            <div className="bg-bg-blue h-9 w-9 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="text-text-primary  mt-10  w-full">
        <p className="text-center">All rights are reserved</p>
      </div>
    </footer>
  )
}
