"use client"

import { format, formatDistance, formatRelative, subDays, } from 'date-fns'
import { PaystackPayment } from '@/components'
import { useStoreContext } from '@/components/provider/storeProvider'
import { Button, NairaSign } from '@/components/reusable'
import { calculateDiscountedPrice } from '@/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useMemo, useState } from 'react'

type Props = {
  price: number,
  discount:number
}

export default function ReservationCard({ price,discount }: Props) {
  const {finalPrice,discountAmount,discountPercentage,originalPrice} = calculateDiscountedPrice(price,discount)
  const [guests, setGuests] = useState<Guest[]>([
    { count: 1, type: 'Adults' }
  ])
  const [expand, setExpand] = useState(true)
  const { dateRange } = useStoreContext()

  const toggleExpand = () => {
    setExpand(!expand)
  }
  const startDate = dateRange[0].startDate

  console.log(format(startDate, "'Today is a' eeee"))
  console.log(formatDistance(subDays(startDate, 3), startDate))
  console.log(formatRelative(subDays(startDate, 3), startDate))

  const total = useMemo(()=>{
    const totals = finalPrice * 2;
    return totals
  },[finalPrice])

  console.log(total)

  return (
    <div className={`${!expand && "!p-4 !gap-2 md:!gap-6 md:!p-8"} text-start w-full fixed bottom-0 z-[999] left-0 right-0 rounded-tr-[20px] rounded-tl-[20px] bg-white md:relative flex flex-col gap-6 shadow-[0_0_10px_rgba(0,0,0,.3)] border border-gray-200 rounded-xl p-8 dark:border-neutral-800`}>
      <div className='flex items-center justify-between'>
        <p className="font-semibold text-start text-[2rem]  dark:text-neutral-200">
          <NairaSign />{finalPrice}
          <span className='font-normal text-[1.6rem]'> night</span>
          {!expand && <span className='bg-gray-100 md:hidden rounded-[10px] text-gray-800 ml-2 text-[1.3rem] font-normal p-2'>Dec 12-13</span>}
        </p>
        <span className='cursor-pointer block md:hidden' onClick={toggleExpand}>
          {expand ? <ChevronDown className='!size-8' /> :
            <ChevronUp className='!size-8' />}
        </span>
      </div>
      <div className={`${!expand && "hidden md:!block"}`}>
        <div className='border-[2px] rounded-[8px] cursor-pointer'>
          <div className='grid grid-cols-2 items-center'>
            <div className='p-2 px-4'>
              <span className='uppercase font-semibold'> check-in</span>
              <p className='text-[1.3rem]'>{JSON.stringify(startDate)}  </p>
            </div>
            <div className='p-2 px-4 border-l-2 '>
              <span className='uppercase font-semibold'>check-out</span>
              {/* <p className='text-[1.3rem]'>{dateRange[0].endDate}  </p> */}
            </div>
          </div>
          {/* <div className='py-2 p-4'>
          <label className='uppercase font-semibold'>Guests</label>
        </div> */}
        </div>
        <ul className='py-2'>
          <li className='flex items-center justify-between'>
            <span className='text-[1.4rem] font-medium underline'><NairaSign /> {finalPrice} x  nights</span>
            <span className='text-[1.2rem] font-semibold'>$120</span>
          </li>
        </ul>
      </div>
      <Button text='Reserve' clx='text-[1.8rem] py-8' />
      {/* <PaystackPayment /> */}
      <div></div>
    </div>
  )
}
