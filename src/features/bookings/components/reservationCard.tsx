"use client"

import { PaystackPayment } from '@/components'
import { Button } from '@/components/reusable'
import React, { useState } from 'react'

type Props = {
  price:number,
}

export default function ReservationCard({price}:Props) {
  const [guests, setGuests] = useState<Guest[]>([
    { count: 1, type: 'Adults' }
  ])
  return (
    <div className="text-start  flex flex-col gap-6 shadow-[0_0_10px_rgba(0,0,0,.3)] border border-gray-200 rounded-xl p-8 dark:border-neutral-800">
      <p className="font-semibold text-start text-[2rem]  dark:text-neutral-200">$60 <span className='font-normal text-[1.6rem]'>night</span></p>

      <div className='border-[2px] rounded-[8px] cursor-pointer'>
        <div className='grid grid-cols-2 items-center'>
          <div className='p-2 px-4'>
            <span className='uppercase font-semibold'> check-in</span>
            <p className='text-[1.3rem]'>Dec 2, 2024</p>
          </div>
          <div className='p-2 px-4 border-l-2 '>
            <span className='uppercase font-semibold'>check-out</span>
            <p className='text-[1.3rem]'>Dec 4, 2024</p>
          </div>
        </div>
        {/* <div className='py-2 p-4'>
          <label className='uppercase font-semibold'>Guests</label>
        </div> */}
      </div>



      <Button text='Reserve' clx='text-[1.8rem] py-8' />
      <PaystackPayment />
      <ul>
        <li className='flex items-center justify-between'>
          <span className='text-[1.4rem] font-medium underline'>${price} x  nights</span>
          <span className='text-[1.2rem] font-semibold'>$120</span>
        </li>
      </ul>
    </div>
  )
}
