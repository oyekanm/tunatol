"use client"
import { TableComponent } from '@/components/reusable'
import { RoomColumn } from '@/components/tableColumns'
import React from 'react'

type Props = {
    data:Room[]
}

export default function DbRoomMainLayout({data}:Props) {
    return (
        <div>
            <section>
                {
                    data?.length > 0 && (
                        <TableComponent
                            column={RoomColumn} data={data}
                            hrefText='Add User'
                            href='/admin/rooms/add-new'
                            path='/admin/rooms/edit'
                            pathText='Edit'
                            headerText='Products'
                        />
                    )
                }
                {
                    data?.length === 0 && <div className='flex items-center justify-center mt-12'>
                        <p className='text-[3rem] font-bold capitalize '>No product</p>
                    </div>
                }
            </section>
        </div>
    )
}
