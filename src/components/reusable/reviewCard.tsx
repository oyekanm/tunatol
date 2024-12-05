"use client"

import React from 'react'
import Rating from "@mui/material/Rating";
import { format } from 'date-fns';

type Props = {
    name?: string;
    img: string;
    text: string;
    time?: any;
    rating: number,
    flip?:boolean,
    noBg?:boolean,
    fw?:boolean,
    user?:any
}

export default function ReviewCard({ img, name, rating, text, time,flip=true,noBg,fw=false, user }: Props) {
    const date = format(user, 'MMM dd, yyyy')
    // console.log(date)
    return (
        <div className={`${noBg?"bg-transparent":"bg-white"}  flex flex-col rounded-[5px] ${noBg && "!w-full"} w-full ${!fw && "sm:w-[30rem] min-w-[30rem]" } ${noBg && "shadow-[0px_0px_20px_rgba(0,0,0,.2)]"}  p-4`}>
            <span className={`flex gap-4 items-center ${flip&& "order-3"}`}>
                <span className='rounded-[100px] w-[30px] h-[30px] overflow-hidden'>
                    <img src="https://cdn.skims.com/images/hfqi0zm0/production/a9e758d3d4dfad734f35471cecc7d85f30d62f6c-706x894.jpg?q=95&auto=format"
                        alt="user profile img" className='w-full h-full ' />
                </span>
                <span>
                <p className='text-[1.4rem] font-medium capitalize'>{name}</p>
                <p className='text-[1.2rem] font-medium'>joined {date}</p>
                </span>
            </span>
            <span className={`py-4 block ${flip && "order-2"}`}>
                <p className='text-[1.2rem] font-normal'>{text}</p>
            </span>
            <span className={`flex justify-between items-center ${flip && "order-1"}`} >
                <Rating onChange={(event, newValue) => {
                    console.log(event, newValue)
                }} size='large' name="half-rating" defaultValue={rating} precision={0.5} />
                <p>{format(time, 'MMM dd, yyyy')}</p>
            </span>
        </div>
    )
}
