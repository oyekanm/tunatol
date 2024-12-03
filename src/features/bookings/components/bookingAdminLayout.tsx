import { TableComponent } from '@/components/reusable'
import { BookingColumn } from '@/components/tableColumns'
import React from 'react'

type Props = {
    data:Booking[],
    totalPages: number;
    currentPage: number;
}

export default function BookingAdminLayout({data,currentPage,totalPages}:Props) {
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
            column={BookingColumn} data={data} headerText='Reservations'
            path='/admin-dashboard/orders'
            pathText='View'
            hrefText='Create a Reservation'
            href='/admin/bookings/add-new'
            currentPage={currentPage} totalPages={totalPages}
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
