"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormSubmitButton } from '@/components/form'
import { RoomInput } from '@/components/form/formInputs'
import { ImageCarousel, Modal, UploadImageComp } from '@/components/reusable'
import { Button as Buton } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { roomSchema } from '@/lib/schema/roomSchema'
import { X } from 'lucide-react'

type Props = {
    mutate: any;
    data?: any;
    editing?: boolean
}

export default function RoomForm({ editing, mutate, data }: Props) {
    const [features, setFeatures] = useState<string[]>([""])
    const [available, setAvailable] = useState(false)
    const form = useForm<z.infer<typeof roomSchema>>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    useEffect(() => {
        if (data) {
            const { categoryId, description, features, github, name, Stacks, status, url, application } = data
            const filteredStacks = Stacks.map((s: any) => s.id)
            form.setValue('name', name)
            form.setValue('description', description)
            form.setValue('features', features)
            setFeatures(features)
        }
    }, [data])

    const addFeature = () => {
        setFeatures((prev: any) => {
            return [...prev, ""]
        })
    }
    const deleteInput = (i: number) => {
        const newFeatures = features.filter((feat, index) => index !== i)

        // set features value on the form
        form.setValue("features", newFeatures)

        setFeatures(newFeatures)
    }
    const onchangeText = (e: any, index: number) => {
        // console.log(e.target.value, index)
        const newFeatures = [...features];
        newFeatures[index] = e.target.value;

        // set features value on the form
        form.setValue("features", newFeatures)

        // console.log(newFeatures, newFeatures[index])

        setFeatures(newFeatures)
    }
    const getImageData = async (imageData: any) => {
        console.log(imageData)
        form.setValue("images", imageData)

    }
    const onChange = (bool: boolean) => {
        setAvailable(bool)
        // console.log(bool)
        // if (bool) {
        //     form.setValue("status", "APP")
        // } else {
        //     form.setValue("status", "NOAPP")
        // }

    }

    const labelClass = "font-semibold text-[2rem] text-slate-700 block mb-2 dark:text-white"
    const inputClass = "!py-8 px-4 rounded-[5px] text-gray-700 p-4 py-2 text-[1.8rem] focus-visible:!outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"

    // console.log(form.getValues(), editing)
    return (
        <Form {...form} >
            <div className="mt-5 p-4 z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
                <form
                    // onSubmit={form.handleSubmit(mutateSize)}
                    className="space-y-8">
                    <div className='gap-y-12 md:gap-8 grid  md:grid-cols-2 items-start '>
                        <div className='grid gap-4'>
                            {
                                RoomInput.map(size => {
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
                             <div className="flex items-center space-x-2">
                                <Switch checked={available} onCheckedChange={onChange} id="airplane-mode" />
                                <FormLabel className={`${labelClass} cursor-pointer`} htmlFor="airplane-mode">Room Available</FormLabel>
                            </div>
                        </div>
                        <div className='h-full grid gap-4'>
                            <div>
                                <Modal trigger='Add Features' btnExtra='Add more feature' extraClick={addFeature}>
                                    <div>
                                        <p className={labelClass}>Add Project features</p>
                                        <div className='grid gap-8'>
                                            {features.map((feat, index) => {
                                                return (
                                                    <div key={index} className='flex gap-8 items-center'>
                                                        <FormControl className='flex-5'>
                                                            <Input className={inputClass} type={"text"} value={feat} onChange={(e) => onchangeText(e, index)} placeholder={"add a feature..."} />
                                                        </FormControl>
                                                        <Buton type='button' onClick={() => deleteInput(index)} className='flex-1 p-4 py-6' variant={'ghost'}><X className='!size-8 ' color='black' /></Buton>
                                                    </div>)
                                            })}
                                            {/* <Button type='submit' click={} clx='sm:w-[50%] text-[1.8rem] font-bold text-slate-700 p-6' variant="outline" text='Add more feature' /> */}
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                            <div className='h-[200px]'>
                                <UploadImageComp fileUpload={getImageData} rootFolder='rooms' />
                            </div>
                            <div className='h-[350px]'>
                                <ImageCarousel files={""} showTexts={false} />
                            </div>
                        </div>
                    </div>

                    <FormSubmitButton
                        // loading={false}
                        className='w-full'
                        loading={form.formState.isSubmitting}
                        text={editing ? "Update Size" : "Submit"} />
                </form>
            </div>
        </Form>
    )
}
