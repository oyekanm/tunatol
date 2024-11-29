"use client"

import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Button } from './reusable';
import { useStoreContext } from './provider/storeProvider';

export default function DateRangeComponent() {

    const { changeFormValue,changeDate,dateRange,setDateRange } = useStoreContext()
  
    const reset =()=>{
        const events = [
            {
                name:"startDate",
                value:"",
            },
            {
                name:"endDate",
                value:"",
            },
        ]
        setDateRange([
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }
        ])
        for(let i=0; i < events.length; i++){
            changeFormValue(events[i])
        }
    }

    return (
        <div className='rangewidth'>
            <div className='hidden md:block'>
                <DateRange
                    ranges={dateRange}
                    onChange={item => changeDate(item)}
                    months={2}
                    direction={'horizontal'}
                    startDatePlaceholder='Check-in'
                    endDatePlaceholder='Check-out'
                    className='w-full'
                    // showMonthAndYearPickers
                />
            </div>
            <div className='block md:hidden'>
                <DateRange
                    ranges={dateRange}
                    onChange={item => changeDate(item)}
                    months={1}
                    direction={'horizontal'}
                    startDatePlaceholder='Check-in'
                    endDatePlaceholder='Check-out'
                    className='w-full'
                    minDate={new Date()}
                    classNames={{dayActive:"text-[1.4rem]"}}
                />
            </div>
            <div className='text-right'>
                <Button click={reset} variant={'link'} text='clear dates' clx='!bg-transparent hover:!bg-transparent underline font-semibold text-[1.3rem]' />
            </div>
        </div>
    )
}




