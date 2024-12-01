// context/PageContext.tsx
'use client';

import { CreateBooking } from '@/actions/bookingActions';
import { useToast } from '@/hooks';
import { bookingSchema } from '@/lib/schema/roomSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInDays } from 'date-fns';
import React, { createContext, useState, useContext, Dispatch, SetStateAction, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormValues = {
  roomId: string;
  UserId: string;
  totalCost: number;
  startDate: Date;
  endDate: Date;
  id?: string | undefined;
}

type StoreContextType = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>,
  dateRange: any;
  setDateRange: React.Dispatch<React.SetStateAction<any>>,
  changeFormValue: (e: any) => void,
  values?: FormValues,
  changeDate: (item: any) => void,
  setHeight: React.Dispatch<React.SetStateAction<number>>,
  height: number,
  days: number,
  createBooking: () => Promise<{
    bookingId: string;
} | undefined>
};

const StoreContext = createContext<StoreContextType>(null as any);

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showNav, setShowNav] = useState(false)
  const [height, setHeight] = useState<number>(0);
  const toast = useToast()
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  ]);
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    // defaultValues: {
    //   UserId: "jdsdjsdjsh"
    // }
  })
  // BFCMTLD24
  //  NEWCOM649
  const days = differenceInDays(
    dateRange[0].endDate,
    dateRange[0].startDate
  )

  const changeDate = (item: any) => {
    const events = [
      {
        name: "startDate",
        value: item.selection.startDate,
      },
      {
        name: "endDate",
        value: item.selection.endDate,
      },
    ]

    for (let i = 0; i < events.length; i++) {
      changeFormValue(events[i])
    }

    setDateRange([item.selection])
    // console.log(item,events)

  }

  const changeFormValue = (e: any) => {
    // console.log(e)
    form.setValue(e.name, e.value)
    console.log(form.getValues())
  }

  const createBooking = async () => {
    // form.handleSubmit()
    const results = bookingSchema.safeParse(form.getValues())
    if(results.success){
      const response = await CreateBooking(results.data)
          // error handling
          if (response.success === false) {
            console.log(response?.error)
            toast({
                status: 'error',
                text: response?.error,
            });
            return;
        }
        // data successfully recieved
        if (response.success) {
            toast({
                status: 'normal',
                text: 'make payment to complete your reservation',
            });
            form.reset()
            return {bookingId:response.data?.id as string}
        }
    }else{
      console.log(results.error)
    }
  }
  return (
    <StoreContext.Provider value={{ currentPage, setCurrentPage, showNav, setShowNav, changeFormValue, dateRange, setDateRange, changeDate, days, height, setHeight, createBooking }}>
      {children}
    </StoreContext.Provider>
  );
};




export const useStoreContext = () => useContext(StoreContext);