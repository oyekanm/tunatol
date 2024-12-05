"use client"

import { Modal, TableComponent, UploadImageComp } from '@/components/reusable';
import React, { useState } from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { FormSubmitButton } from '@/components/form'
import { facilitySchema } from '@/lib/schema/roomSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { facilityInput } from '@/components/form/formInputs';
import { z } from 'zod';
import { FacilityColumn } from '../tableColumns';
import { prisma } from '@/lib';
import { useToast } from '@/hooks';

const data = [
    {
        total_price: 1000,
        id: "ORD001",
        status: "Pending",
        createdAt: new Date(),
        payment_method: "Credit Card"
    },
    {
        total_price: 1000,
        id: "ORD002",
        status: "Processing",
        createdAt: new Date(),
        payment_method: "PayPal"
    },
    {
        total_price: 1000,
        id: "ORD003",
        status: "Completed",
        createdAt: new Date(),
        payment_method: "Stripe"
    },
    {
        total_price: 1000,
        id: "ORD004",
        status: "Pending",
        createdAt: new Date(),
        payment_method: "Venmo"
    },
    {
        total_price: 1000,
        id: "ORD005",
        status: "Completed",
        createdAt: new Date(),
        payment_method: "Bank Transfer"
    },
    {
        total_price: 1000,
        id: "ORD006",
        status: "Processing",
        createdAt: new Date(),
        payment_method: "Apple Pay"
    },
    {
        total_price: 1000,
        id: "ORD007",
        status: "Completed",
        createdAt: new Date(),
        payment_method: "Google Pay"
    },
    {
        total_price: 1000,
        id: "ORD008",
        status: "Pending",
        createdAt: new Date(),
        payment_method: "Cryptocurrency"
    },
    {
        total_price: 1000,
        id: "ORD009",
        status: "Processing",
        createdAt: new Date(),
        payment_method: "Alipay"
    }
];
type Props ={
    data:Facility[]
}


export default function FacilityForm({data}:Props) {
    const toast = useToast()
    const [image,setImage] = useState()
    const form = useForm<z.infer<typeof facilitySchema>>({
        resolver: zodResolver(facilitySchema),
        defaultValues: {
            name: "",
        },
    })
    const getImageData = async (imageData: any) => {
        
        console.log(imageData)

        form.setValue("image", imageData)
        setImage(imageData)
        // localStorage.setItem("room",JSON.stringify(form.getValues()))
    }
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
            text: 'Facility deleted'
        });
    }

    const labelClass = "font-semibold text-[2rem] text-slate-700 block mb-2 dark:text-white"
    const inputClass = "!py-8 px-4 rounded-[5px] text-gray-700 p-4 py-2 text-[1.8rem] focus-visible:!outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
    return (
        <div>
            <TableComponent
                column={FacilityColumn} data={data} headerText='Facilities'
                check={true}
                deleteChecked={deleteIds}
                

            >
                <Modal trigger='Add a Facility'>
                    <Form {...form} >
                        <div className="mt-5 p-4 z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
                            <form
                                // onSubmit={form.handleSubmit(mutateSize)}
                                className="space-y-8">
                                <div className='gap-y-12 md:gap-8 grid  items-start '>
                                    <div className='grid gap-4'>
                                        {
                                            facilityInput.map(size => {
                                                return (
                                                    <FormField
                                                        key={size.id}
                                                        // control={form.control}
                                                        name={size.name}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className={labelClass} >{size.label}</FormLabel>
                                                                <FormControl>
                                                                    <Input type={size.type} placeholder={size.placeholder} {...field} className={inputClass} />
                                                                </FormControl>
                                                                <FormMessage className='text-[1.4rem]' />
                                                            </FormItem>
                                                        )}
                                                    />)

                                            })
                                        }

                                    </div>
                                    <div className='h-full grid gap-4'>

                                        <div className='h-[200px]'>
                                            <UploadImageComp fileUpload={getImageData} rootFolder='facilities' />
                                        </div>
                                        {/* <div className='h-[350px]'>
                                <ImageCarousel files={""} showTexts={false} />
                            </div> */}
                                    </div>
                                </div>

                                <FormSubmitButton
                                    // loading={false}
                                    className='w-full'
                                    loading={form.formState.isSubmitting}
                                    text={"Submit"} />
                            </form>
                        </div>
                    </Form>
                </Modal>
            </TableComponent>
        </div>
    )
}
