import { BookingForm } from '@/features/bookings/components'
import { CurrentUser } from '@/hooks'
import { prisma } from '@/lib'

export default async function page() {
  const session = await CurrentUser()
  const rooms:any = await prisma.room.findMany({
    include:{
      bookings:true
    }
  }) 
  return (
    <BookingForm rooms={rooms} session={session} />
  )
}
