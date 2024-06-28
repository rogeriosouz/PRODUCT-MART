'use client'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

interface ImageProductProps {
  images: string[]
}

export function ImageProduct({ images }: ImageProductProps) {
  const [image, setImage] = useState(0)

  return (
    <div className="flex w-full flex-1 items-start gap-8 md:flex-col">
      <div className="grid w-20 grid-cols-1 gap-6">
        {images.map((imageItem, index) => (
          <Button
            onClick={() => setImage(index)}
            key={imageItem}
            variant={'outline'}
            className={clsx(
              'flex h-20 w-full items-center justify-center overflow-hidden border-2',
              {
                'border-primary': index === image,
                'border-transparent': index !== image,
              },
            )}
          >
            <Image src={imageItem} alt={imageItem} width={80} height={80} />
          </Button>
        ))}
      </div>

      <div className="bg-bg-secondary flex h-[514px] w-[514px] items-center justify-center overflow-hidden md:w-full">
        <Image
          src={images[image]}
          alt={images[image]}
          width={450}
          height={450}
        />
      </div>
    </div>
  )
}
