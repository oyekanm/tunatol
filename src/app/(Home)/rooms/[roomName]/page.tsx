import { ImageCarousel, Modal, Notfound, ReviewCard } from '@/components/reusable'
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

  if (!data) return <Notfound />;

  return (
    <div>
      <div className='h-[45rem] sm:h-[80vh]'>
        <ImageCarousel files={data?.images} moveBtn={false} />
      </div>
      <SingleRoomContentLayout room={data} />
      <section className='bg-gray-100 '>
        <div className='overflow-auto flex  gap-4 p-8'>
          <ReviewCard noBg={false} />
          <ReviewCard noBg={false} />
          <ReviewCard noBg={false} />
          <ReviewCard noBg={false} />
          <ReviewCard noBg={false} />
          <ReviewCard noBg={false} />
          <ReviewCard noBg={false} />
          <ReviewCard noBg={false} />
        </div>
        <div className='p-4 '>
          <Modal trigger={`show all 130 reviews`} triggerclx='bg-transparent border-[2px] w-full md:w-[30rem] border-gray-800 text-gray-800  shadow-sm hover:bg-transparent' >
            <div className='overflow-auto h-[70vh] grid gap-4'>
              <ReviewCard flip={false} noBg={true} />
              <ReviewCard flip={false} noBg={true} />
              <ReviewCard flip={false} noBg={true} />
              <ReviewCard flip={false} noBg={true} />
              <ReviewCard flip={false} noBg={true} />
              <ReviewCard flip={false} noBg={true} />
              <ReviewCard flip={false} noBg={true} />
            </div>

          </Modal>
        </div>
      </section>
    </div>
  )
}
