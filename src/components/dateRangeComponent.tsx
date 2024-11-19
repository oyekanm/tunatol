"use client"

import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Button } from './reusable';

export default function DateRangeComponent() {
    const [dateRange, setDateRange] = useState<any>([
        {
            startDate: "",
            endDate: "",
            key: 'selection'
        }
    ]);
    const changeDate = (item: any) => {
        // setDateRange
        setDateRange([item.selection])
        // console.log(item)

    }
    const reset =()=>{
        setDateRange([
            {
                startDate: "",
                endDate: "",
                key: 'selection'
            }
        ])
    }

    return (
        <div>
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
                />
            </div>
            <div className='text-right'>
                <Button click={reset} variant={'link'} text='clear dates' clx='!bg-transparent hover:!bg-transparent underline font-semibold text-[1.3rem]' />
            </div>
        </div>
    )
}




