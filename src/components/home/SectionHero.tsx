import imageSectionHero from '@/assets/images/image-section-home-hero.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export function SectionHero() {
  return (
    <section className="bg-bg-secondary mt-[120px] w-full py-14">
      <div className="flex w-full items-center justify-between px-12 md:px-5">
        <div className="max-w-[700px] text-left sm:w-full">
          <h1 className="mb-5 text-7xl font-black text-zinc-800 sm:text-5xl">
            PROVIDING SERVICES AT YOUR DOOR
          </h1>

          <p className="mb-6 font-medium text-muted-foreground sm:text-sm">
            MACC Essentials has an important role in making supplies and
            services available to customers and their patients during this
          </p>

          <Button asChild variant={'default'} className="px-32 py-6">
            <Link href={'/products'}>See products</Link>
          </Button>
        </div>

        <div className="block lg:hidden">
          <Image
            src={imageSectionHero}
            alt="imageSectionHero"
            width={570}
            height={500}
            className="rounded "
          />
        </div>
      </div>
    </section>
  )
}
