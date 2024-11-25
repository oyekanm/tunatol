import { ImageCarousel } from '@/components/reusable'
import { prisma } from '@/lib'
import React from 'react'

type Props = {
    params:{roomName:string}
}

export default async function page({params}:Props) {
const name = params.roomName.split("-").join(" ")

const data:any = await prisma.room.findFirst({
  where:{
    name,
  },
  include:{
    images:true,
    Reviews:true,
  }
})

  return (
    <div>
      <div className='h-[80vh]'>
          <ImageCarousel files={data?.images} />
        </div>
    </div>
  )
}
