import { ImageCarousel, Notfound } from '@/components/reusable'
import { SingleRoomContentLayout } from '@/features/rooms/components'
import { prisma } from '@/lib'
import React from 'react'

type Props = {
  params: { roomName: string }
}

export default async function page({ params }: Props) {
  const name = params.roomName.split("-").join(" ")

  const data: any = await prisma.room.findFirst({
    where: {
      name,
    },
    include: {
      images: true,
      Reviews: true,
    }
  })

  if(!data) return <Notfound />;

  return (
    <div>
      <div className='h-[80vh]'>
        <ImageCarousel  files={data?.images} />
      </div>
      <SingleRoomContentLayout room={data}/>
    </div>
  )
}
