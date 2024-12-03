"use client"

import { TableComponent } from '@/components/reusable'
import { UserColumn } from '@/components/tableColumns'
import React from 'react'

type Props = {
    data:User[],
    totalPages: number;
    currentPage: number;
}

export default function UserAdminLayout({data,currentPage,totalPages}:Props) {
  return (
    <div>
    <section>
        {/* {isLoading && <div className='flex items-center justify-center'>
            <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
        </div>} */}
        {
            data?.length > 0 && (
                    <TableComponent 
                    check={false}
                    column={UserColumn} data={data} headerText='Users'
                    currentPage={currentPage} totalPages={totalPages} 
                     />
            )
        }
        {
            data?.length === 0  && <div className='flex items-center justify-center mt-12'>
                <p className='text-[3rem] font-bold capitalize '>No product</p>
            </div>
        }
    </section>
</div>
  )
}
