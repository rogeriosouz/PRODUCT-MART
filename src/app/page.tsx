import { SectionHero } from '@/components/home/SectionHero'
import { SectionNewProduct } from '@/components/home/SectionNewProduct'
import { SectionPromotion } from '@/components/home/SectionPromotion'

export default function Home() {
  return (
    <main className="w-full">
      <SectionHero />
      <SectionNewProduct />
      <SectionPromotion />
    </main>
  )
}
