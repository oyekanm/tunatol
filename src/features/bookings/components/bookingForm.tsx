"use client"

import { getDisabledDates } from '@/actions/bookingActions'
import { DateRangeComponent } from '@/components'
import { useStoreContext } from '@/components/provider/storeProvider'
import { Modal } from '@/components/reusable'
import { eachDayOfInterval } from 'date-fns'
import { CheckCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReservationCard from './reservationCard'

type Props = {
  rooms: Room[],
  session: {
    name: string;
    userId: string;
    email: string;
    user_type: UserType;
}
}

export default function BookingForm({ rooms,session }: Props) {
  const [room, setRoom] = useState<Room>()
  const { days, setDisabledDates, changeDate, changeFormValue,height } = useStoreContext()
  const [selected, setSelected] = useState("")

  const events = [
    {
        name: "userId",
        value: session.userId || "id",
    },
    {
        name: "roomId",
        value: room?.id
    },
]


useEffect(() => {
    // setShowNav(true)
    for (let i = 0; i < events.length; i++) {
        changeFormValue(events[i])

    }
}, [room])

  useEffect(() => {
    async function fetchDisabledDates() {
        const roomId = room?.id as string
        const bookedRanges = await getDisabledDates(roomId)

        // Create array of all disabled dates
        const allDisabledDates = bookedRanges.flatMap(range =>
            eachDayOfInterval({ start: range.start, end: range.end })
        )


        setDisabledDates(allDisabledDates)
    }

    fetchDisabledDates()
}, [room?.id])

// console.log(room?.bookings)

  const roomSelect = (rm: Room) => {
    setRoom(rm)
    setSelected(rm?.id as string)
  }
  return (
    <section style={{marginBottom:`${height}px`}}>
      <div className='py-6'>
        <Modal trigger='select a room'>
          <div className='grid grid-cols-2 items-center gap-4 pt-8'>
            {
              rooms.map(room => {
                return (
                  <span onClick={()=>roomSelect(room)} key={room.id} className='cursor-pointer border-2 p-4 px-8 rounded-md text-[1.4rem] font-medium flex items-center justify-between '>
                    {room.name} {selected === room.id && <CheckCircleIcon color='green' className='size-6' />}
                  </span>
                )
              })
            }
          </div>
        </Modal>
      </div>
      <div className='grid sm:grid-cols-[55%,40%] md:grid-cols-[65%,30%] gap-8 items-center'>
        <div>
          {days > 0 && <div>
            <p className='text-[2rem] font-semibold pb-4 ' >{days} nights in {room?.name}</p>
          </div>}
          <DateRangeComponent />
        </div>
        <div className='h-full'>
          <ReservationCard
            price={room?.price as number}
            discount={room?.discount_percent}
            disableBtn={room?.isAvailable as boolean}
          />
        </div>
      </div>
    </section>
  )
}
