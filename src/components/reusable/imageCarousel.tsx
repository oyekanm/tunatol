"use client"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import Link from 'next/link'
import Button from './button'
import { useState } from "react"

type Props = {
  files: Image[];
  showTexts?: boolean;
  duration?: number;
  moveBtn?: boolean;
  session?:Partial<User>
}

const files = [
  "/assets/Image/lux room.jpg",
  "/assets/Image/steven-ungermann.png",
  "/assets/Image/room.png",
]

const arrowStyle = "h-[100%] px-10 bg-transparent rounded-none hover:bg-[rgba(0,0,0,.3)] border-none"
const btnTextStyle = "h-16 w-full mx-auto text-[1.2rem] font-semibold md:font-normal sm:text-[1.5rem] md:text-[1.8rem]"

export default function ImageCarousel({ showTexts = false, files, duration, moveBtn = true,session }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  console.log(api)
  return (
    <section className='relative h-full'>
      <Carousel
      setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: duration || 5000,
          }),
        ]}
        className='relative h-full'
      >
        <CarouselContent className="h-full">
          {files?.map((file) => (
            <CarouselItem key={file.key} className="relative md:basis-full ">
              <Image alt={file.url} src={file.url} width={300} height={300}
                className="w-full h-full"
                priority={false}
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,.3)] to-[rgba(0,0,0,.5)] "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {moveBtn && (
          <>
            <CarouselPrevious className={`left-0 ${arrowStyle}`} />
            <CarouselNext className={`right-0 ${arrowStyle}`} />
          </>
        )
        }
      </Carousel>
      {showTexts && (
        <div className='centre w-[80%] grid gap-8 '>
          <div className='grid gap-2 sm:gap-4 md:gap-8 text-white'>
            <p className='text-[1.8rem] sm:text-[2.2rem] font-medium'>Tunatol Eden</p>
            <p className='text-[2rem] md:text-[5rem] font-bold capitalize'>Home away from home</p>
            <p className='text-[1.6rem] sm:text-[1.8rem]  md:text-[2.5rem] font-medium uppercase'>Best price guaranteed</p>
          </div>

          <div className="flex flex-col sm:flex-row w-[80%]  items-center justify-center md:w-[50%] mx-auto gap-2 md:gap-4 ">
            <Link href={"/rooms"} className="w-full">
              <Button text='Make Reservations' clx={`${btnTextStyle}`} />
            </Link>
            {!session?.email && <Link href={"/login"} className="w-full">
              <Button text='Get Started' clx={`${btnTextStyle}`} />
            </Link>}
          </div>

        </div>
      )}
    </section>
  )
}

