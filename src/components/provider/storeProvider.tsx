// context/PageContext.tsx
'use client';

import { CreateBooking } from '@/actions/bookingActions';
import { useToast } from '@/hooks';
import { bookingSchema } from '@/lib/schema/roomSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInDays } from 'date-fns';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, Dispatch, SetStateAction, useMemo, useEffect } from 'react';
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
  disabledDates: Date[],
  setDisabledDates: any,
  announce:string, 
  setAnnounce:any
};

const StoreContext = createContext<StoreContextType>(null as any);

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showNav, setShowNav] = useState(false)
  const [height, setHeight] = useState<number>(0);
  const [disabledDates, setDisabledDates] = useState<Date[]>([])
  const [announce, setAnnounce] = useState("")
  const toast = useToast()
  const router = useRouter()
  const path = usePathname()
  const { data } = useSession();
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

  console.log(Object.entries(form.formState.errors))


  const createBooking = async () => {
    console.log("second call")
    const valid = await form.trigger();
    console.log(valid)
    if (!valid) {
      if (!data?.user?.email) {
        const url = encodeURIComponent(path)
        router.push(`/login?callbackUrl=${url}`)
        router.refresh()
        return;
      }

      Object.values(form.formState.errors).map(err => {
        return toast({
          status: 'error',
          text: err.message,
          duration: 50000
        })
      })
      return;
    }

    const results = bookingSchema.safeParse(form.getValues())
    console.log(form.formState.errors)
    if (results.success) {
      const response = await CreateBooking(results.data)
      // error handling
      if (response.success === false) {
        console.log(response?.error)
        toast({
          status: 'error',
          text: response?.error,
          clickText: response?.error === " Unauthorized to reserve a room" ? "Login" : "",
          click() {
            const url = encodeURIComponent(path)
            router.push(`/login?callbackUrl=${url}`)
            router.refresh()
          },
          duration: 10000
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
        return { bookingId: response.data?.id as string }
      }
    } else {
      console.log(results.error)
    }
  }

  useEffect(() => {
    // setAnnounce("")
    setHeight(0)
  }, [])


  return (
    <StoreContext.Provider
      value={{
        currentPage, setCurrentPage, showNav, setShowNav, changeFormValue,
        dateRange, setDateRange, changeDate, days, height, setHeight,
        createBooking, disabledDates, setDisabledDates,announce, setAnnounce
      }}>
      {children}
    </StoreContext.Provider>
  );
};




export const useStoreContext = () => useContext(StoreContext);