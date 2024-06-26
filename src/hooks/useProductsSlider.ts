import { useRef, useState } from 'react'

interface useProductsSliderProps {
  productsListLength: number
}

export function useProductsSlider({
  productsListLength,
}: useProductsSliderProps) {
  const outerDivRef = useRef<HTMLDivElement>(null)
  const [scrol, setScrol] = useState(0)

  function prev() {
    if (scrol > 0) {
      const nemScroll = scrol - 10
      setScrol((state) => state - 10)
      handleScrollButtonClick(nemScroll)
    }
  }

  function next() {
    if (scrol < 100) {
      const nemScroll = scrol + 10
      setScrol((state) => state + 10)
      handleScrollButtonClick(nemScroll)
    }
  }

  const handleScrollButtonClick = (percentage: number) => {
    const outerDiv = outerDivRef.current
    if (outerDiv) {
      const totalWidth = outerDiv.scrollWidth - outerDiv.clientWidth
      const scrollPosition = (percentage / 100) * totalWidth
      outerDiv.scrollLeft = scrollPosition
    }
  }

  const canPrev = scrol > 0 && productsListLength >= 10
  const canNext = scrol < 100 && productsListLength >= 10

  return {
    outerDivRef,
    canPrev,
    canNext,
    prev,
    next,
  }
}
