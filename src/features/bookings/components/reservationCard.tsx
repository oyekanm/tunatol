"use client"

import { PaystackPayment } from '@/components';
import { useStoreContext } from '@/components/provider/storeProvider';
import { NairaSign } from '@/components/reusable';
import { calculateDiscountedPrice } from '@/utils';
import { format, } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  price: number,
  discount: number
}

export default function ReservationCard({ price, discount }: Props) {
  const { finalPrice } = calculateDiscountedPrice(price, discount)
  const [guests, setGuests] = useState<Guest[]>([
    { count: 1, type: 'Adults' }
  ])
  const [expand, setExpand] = useState(true)
  const { dateRange, changeFormValue, days, setHeight, height } = useStoreContext()
  const cardRef: any = useRef(null)


  useEffect(() => {
    setHeight(cardRef.current?.clientHeight || 0);
  }, [expand]);

  const toggleExpand = () => {
    setExpand(!expand)
  }
  const startDate = format(dateRange[0].startDate, 'MMM dd, yyyy');
  const endDate = format(dateRange[0].endDate, 'MMM dd, yyyy');

  const total = useMemo(() => {
    const totals = finalPrice * days;
    const events = {
      name: "totalCost",
      value: totals
    }
    changeFormValue(events)
    return totals
  }, [finalPrice, startDate, endDate])
  return (
    <div ref={cardRef} className={`${!expand && "!p-4 !gap-2 md:!gap-6 md:!p-8"} text-start w-full fixed bottom-0 z-[999] left-0 rounded-lg right-0 md:rounded-tr-[20px] md:rounded-tl-[20px] bg-white md:relative flex flex-col gap-6 shadow-[0_0_10px_rgba(0,0,0,.3)] border border-gray-200 rounded-xl p-8 dark:border-neutral-800`}>
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
              <p className='text-[1.3rem]'>{startDate}  </p>
            </div>
            <div className='p-2 px-4 border-l-2 '>
              <span className='uppercase font-semibold'>check-out</span>
              <p className='text-[1.3rem]'>{endDate}  </p>
            </div>
          </div>
          {/* <div className='py-2 p-4'>
          <label className='uppercase font-semibold'>Guests</label>
        </div> */}
        </div>
        <ul className='py-2'>
          {days > 0 ? <li className='flex items-center justify-between'>
            <span className='text-[1.4rem] font-medium underline'><NairaSign />{finalPrice} x {days} nights</span>
            <span className='text-[1.2rem] font-semibold'><NairaSign />{total}</span>
          </li> :
            <p className='text-[1.4rem] font-medium'>Add dates for price</p>
          }
        </ul>
      </div>
      <PaystackPayment />
      <div></div>
    </div>
  )
}
