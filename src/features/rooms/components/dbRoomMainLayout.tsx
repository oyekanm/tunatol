"use client"
import { TableComponent } from '@/components/reusable'
import { RoomColumn } from '@/components/tableColumns'
import { useToast } from '@/hooks'
import { prisma } from '@/lib'
import React from 'react'

type Props = {
    data: Room[]
}

export default function DbRoomMainLayout({ data }: Props) {
    const toast = useToast()
    const deleteIds = async (ids: any) => {
        await prisma.room.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        toast({
            status: 'success',
            text: 'room deleted'
        });
    }
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
                            check={true}
                            deleteChecked={deleteIds}
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
