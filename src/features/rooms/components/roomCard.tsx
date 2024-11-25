"use client"

import { Button, ImageCarousel } from '@/components/reusable'
import { Star, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    room: Room,
    click?:any
}

export default function RoomCard({ room, click }: Props) {
    const router = useRouter()
    const { images, name, price, id } = room
    const changeRoute = () =>{
        router.push(`/rooms/${name.split(" ").join("-")}`)
      }
    return (
        <div onClick={changeRoute} className='cursor-pointer'>
            <div className='rounded-[10px] h-[200px] w-full overflow-hidden'>
                <ImageCarousel files={images} duration={15000} moveBtn={false} />
            </div>
            <div className=' pt-4 '>
                <div className='flex justify-between items-center'>
                    <p className='text-[1.4rem] font-semibold'>{name}</p>
                    <span className='flex cursor-pointer items-center gap-2'>
                        <StarIcon className='size-4' />
                        <span className='text-[1.4rem] font-medium underline'>100</span>
                    </span>
                </div>
                <div>
                    <p className='cursor-pointer text-[1.3rem] font-semibold'>
                        {price}
                        <span className='text-[1.3rem] font-normal'> night</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
