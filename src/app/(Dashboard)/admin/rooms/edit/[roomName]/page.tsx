import { RoomForm } from '@/features/rooms/components'
import { prisma } from '@/lib'
import React from 'react'

type Props = {
    params:{roomName:string}
}

export default async function page({params}:Props) {
    const roomName = params.roomName.split("-").join(" ")
    const data = await prisma.room.findFirst({
      where:{
        name:roomName
      },
      include:{
        images:true
      }
    })
    // console.log(data)

  return (
    <div>
      <RoomForm mutate={""} data={data} editing />
    </div>
  )
}
