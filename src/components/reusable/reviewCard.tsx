"use client"

import React from 'react'
import Rating from "@mui/material/Rating";

type Props = {
    name: string;
    img: string;
    text: string;
    time: string;
    rating: number,
    flip?:boolean
}

export default function ReviewCard({ img, name, rating, text, time,flip=true }: Props) {
    return (
        <div className='bg-white flex flex-col rounded-[5px] w-full sm:w-[30rem] min-w-[30rem] shadow-[0px_0px_20px_rgba(0,0,0,.2)] p-4'>
            <span className={`flex gap-4 items-center ${flip&& "order-3"}`}>
                <span className='rounded-[100px] w-[30px] h-[30px] overflow-hidden'>
                    <img src="https://cdn.skims.com/images/hfqi0zm0/production/a9e758d3d4dfad734f35471cecc7d85f30d62f6c-706x894.jpg?q=95&auto=format"
                        alt="user profile img" className='w-full h-full ' />
                </span>
                <span>
                <p className='text-[14px] font-medium capitalize'>hello me</p>
                <p className='text-[14px] font-medium capitalize'>2 months</p>
                </span>
            </span>
            <span className={`py-4 block ${flip && "order-2"}`}>
                <p className='text-[1.2rem] font-normal '>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, beatae dignissimos iusto possimus exercitationem velit ut perferendis illo quae odio atque reprehenderit minima maxime? Illum libero quos perspiciatis suscipit maxime.</p>
            </span>
            <span className={`flex justify-between items-center ${flip && "order-1"}`} >
                <Rating onChange={(event, newValue) => {
                    console.log(event, newValue)
                }} size='large' name="half-rating" defaultValue={4.2} precision={0.5} />
                <p>2:30 pm</p>
            </span>
        </div>
    )
}
