import { ImageCarousel, Modal, Notfound, ReviewCard } from '@/components/reusable'
import { SingleRoomMainLayout } from '@/features/rooms/components'
import { CurrentUser } from '@/hooks'
import { prisma } from '@/lib'
import React from 'react'

type Props = {
  params: { roomName: string }
}

export default async function page({ params }: Props) {
  const name = params.roomName.split("-").join(" ")
  const session = await CurrentUser()

  const data: any = await prisma.room.findFirst({
    where: {
      name,
    },
    include: {
      images: true,
      Reviews: true,
    }
  })

  if (!data) return <Notfound />;

  return (
    <SingleRoomMainLayout room={data} session={session}/>
  )
}
