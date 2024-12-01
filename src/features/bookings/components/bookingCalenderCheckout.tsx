"use client"

import { DateRangeComponent, RichTextRenderer } from '@/components'
import React from 'react'
import ReservationCard from './reservationCard'
import { Dot } from 'lucide-react'
import { useStoreContext } from '@/components/provider/storeProvider'

type Props = {
    room: Room
}
// &#8358;

export default function BookingCalenderCheckout({ room }: Props) {
    const { days } = useStoreContext()
    const { description, features, isAvailable, name, price, available_announcement, discount_percent } = room
    return (
        <div className='grid gap-8 mt-8'>
            <div className='grid gap-4'>
                <p className='text-[1.8rem] font-semibold'>{name}</p>
                <div className='p-4 '>
                    <p className='hidden md:block text-[2rem] font-semibold'>About this space</p>
                    <RichTextRenderer content={description} />
                </div>
            </div>
            <div>
                <p className='text-[2rem] font-bold'>What this space offers</p>
                <div>
                    <ul className='grid sm:grid-cols-2 items-center g-4'>

                        {
                            features.map((feat, idx) => {
                                return (
                                    <li key={idx} className='text-[1.4rem] font-medium flex items-center'>
                                        <span><Dot className='size-12' /></span>
                                        <span>{feat}</span>
                                    </li>)
                            })
                        }
                    </ul>
                </div>
            </div>
            {days > 0 && <div>
                <p className='text-[2rem] font-semibold ' >{days} nights in {name}</p>
            </div>}
            <DateRangeComponent />

        </div>
    )
}
