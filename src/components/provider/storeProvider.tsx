// context/PageContext.tsx
'use client';

import { bookingSchema } from '@/lib/schema/roomSchema';
import { zodResolver } from '@hookform/resolvers/zod';
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
  showNav:boolean; 
  setShowNav:React.Dispatch<React.SetStateAction<boolean>>,
  dateRange:any; 
  setDateRange:React.Dispatch<React.SetStateAction<any>>,
  changeFormValue: (e: any) => void,
  values?: FormValues,
  changeDate: (item: any) => void
};

const StoreContext = createContext<StoreContextType>({
  currentPage: 1,
  setCurrentPage: () => {},
  showNav:false,
  setShowNav: () => {},
  changeFormValue: () => {},
  values: undefined,
  dateRange:"",
  setDateRange:()=>{},
  changeDate:()=>{},

});

export default function StoreProvider  ({ children }:{children: React.ReactNode})  {
  const [currentPage, setCurrentPage] = useState(1);
  const [showNav, setShowNav] = useState(false)
  const [dateRange, setDateRange] = useState<any>([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
  ]);
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
})


const changeDate = (item: any) => {
  const events = [
      {
          name:"startDate",
          value:item.selection.startDate,
      },
      {
          name:"endDate",
          value:item.selection.endDate,
      },
  ]

  for(let i=0; i < events.length; i++){
      changeFormValue(events[i])
  }

  setDateRange([item.selection])
  // console.log(item,events)

}

const changeFormValue = (e:any) =>{
  // console.log(e)
  form.setValue(e.name,e.value)
  // console.log(form.getValues())
}

  return (
    <StoreContext.Provider value={{ currentPage, setCurrentPage, showNav, setShowNav,changeFormValue,dateRange, setDateRange,changeDate }}>
      {children}
    </StoreContext.Provider>
  );
};




export const useStoreContext = () => useContext(StoreContext);