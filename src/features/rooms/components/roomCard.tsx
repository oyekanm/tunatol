import { Button } from '@/components/reusable'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RoomCard() {
    return (
        <div>
            <Image
                src={"/assets/image/room.png"}
                alt={"room"}
                width={300}
                height={300}
                style={{ objectFit: "cover", height: "200px", width: "100%" }}
            />
            <div className='block uppercase bg-slate-700 text-white p-4 text-[1.8rem] '>
                executive room
            </div>
            <div className='grid grid-cols-2 items-center py-8 border-[2px] border-t-0 '>
                <span className='flex items-center justify-center'>
                    <Link href={`/rooms/222`} className='text-[1.3rem] font-semibold uppercase underline' >
                        view room details
                    </Link>
                </span>
                <span className='flex items-center justify-center '>
                    <span className='cursor-pointer text-[1.3rem] primary-bg font-semibold text-white p-6 py-4'>
                        155 Avg/night
                    </span>
                </span>
            </div>
        </div>
    )
}
