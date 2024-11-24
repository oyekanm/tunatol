import { DbRoomMainLayout } from '@/features/rooms/components'
import { prisma } from '@/lib'
import React from 'react'

export default async function page() {
  const resp:any = await prisma.room.findMany()

  console.log(resp)
  return (
    <div>
        <DbRoomMainLayout data={resp}/>
    </div>
  )
}
