import { DateRangeComponent } from '@/components'
import React from 'react'
import ReservationCard from './reservationCard'

export default function BookingForm() {
  return (
    <div className='grid sm:grid-cols-[55%,40%] md:grid-cols-[65%,30%] gap-8 items-center'>
      <div>
        <DateRangeComponent />
      </div>
      <div className='h-full'>
        <ReservationCard />
      </div>
    </div>
  )
}
