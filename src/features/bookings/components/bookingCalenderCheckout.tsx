import { DateRangeComponent, RichTextRenderer } from '@/components'
import React from 'react'
import ReservationCard from './reservationCard'

type Props = {
    room: Room
}

export default function BookingCalenderCheckout({ room }: Props) {
    const { description, features, isAvailable, name, price, available_announcement, discount_percent } = room
    return (
        <div className='grid gap-8'>
            <div>
                <p>{name}</p>
                <div className='p-4 shadow-[0_0_10px_rgba(0,0,0,.3)] mt-4 rounded-[1rem]'>
                <RichTextRenderer content={description} />
                </div>
            </div>
            <div>
                <p>What this space offers</p>
                <div>
                    <ul>

                    {
                        features.map((feat, idx)=>{
                            return <li key={idx}>{feat}</li>
                        })
                    }
                    </ul>
                </div>
            </div>

            <div>
                <DateRangeComponent />
            </div>

        </div>
    )
}
