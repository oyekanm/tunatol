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
import { CreateRoom, UpdateRoom } from '@/actions/roomActions'
import { RichTextEditor } from '@/components'
import { useToast } from '@/hooks'
import { useRouter } from 'next/navigation'

type Props = {
    mutate: any;
    data?: any;
    editing?: boolean
}

export default function RoomForm({ editing, data }: Props) {
    const [features, setFeatures] = useState<string[]>([""])
    const [images, setImages] = useState<Image[]>([])
    const [description, setDescription] = useState("")
    const [available, setAvailable] = useState(true)
    const form = useForm<z.infer<typeof roomSchema>>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            name: "",
            description: "",
            isAvailable: true,
            price: "" as any,
            images: [],
            available_announcement: "",
            discount_percent: "" as any,
            features: []
        },
    })
    const toast = useToast()

    const lsroom = JSON.parse(localStorage.getItem("room") || "{}")
    console.log(lsroom)
    useEffect(() => {
        if (data) {
            const { available_announcement, description, discount_percent, features, id, images, isAvailable, name, price, } = data

            form.setValue('name', name)
            form.setValue('description', description)
            form.setValue('features', features)
            form.setValue('available_announcement', available_announcement)
            form.setValue('discount_percent', discount_percent)
            form.setValue('isAvailable', isAvailable)
            form.setValue('price', price)
            form.setValue('images', images)
            setFeatures(features)
            setAvailable(isAvailable)
            setImages(images)
            setDescription(description)
            localStorage.setItem("room",JSON.stringify(form.getValues()))
        }
    }, [data])

    useEffect(()=>{
        
        if (lsroom) {
            const { available_announcement, description, discount_percent, features, id, images, isAvailable, name, price, } = lsroom

            form.setValue('name', name)
            form.setValue('description', description)
            form.setValue('features', features)
            form.setValue('available_announcement', available_announcement)
            form.setValue('discount_percent', discount_percent)
            form.setValue('isAvailable', isAvailable)
            form.setValue('price', price)
            form.setValue('images', images)
            setFeatures(features)
            setAvailable(isAvailable)
            setImages(images)
            setDescription(description)
            return;
        }
        form.setValue('isAvailable', true)
    },[])


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
        localStorage.setItem("room",JSON.stringify(form.getValues()))
    }
    const onchangeText = (e: any, index: number) => {
        // console.log(e.target.value, index)
        const newFeatures = [...features];
        newFeatures[index] = e.target.value;

        // set features value on the form
        form.setValue("features", newFeatures)

        // console.log(newFeatures, newFeatures[index])

        setFeatures(newFeatures)
        localStorage.setItem("room",JSON.stringify(form.getValues()))
    }
    const getImageData = async (imageData: any) => {
        const newImages = [...images, ...imageData]
        
        console.log(newImages)

        form.setValue("images", newImages)
        setImages(newImages)
        localStorage.setItem("room",JSON.stringify(form.getValues()))
    }
    const onChange = (bool: boolean) => {
        setAvailable(bool)
        form.setValue("isAvailable", bool)
        localStorage.setItem("room",JSON.stringify(form.getValues()))
    }
    const changeDesc = (desc: string) => {
        setDescription(desc)
        form.setValue('description', desc)
        localStorage.setItem("room",JSON.stringify(form.getValues()))
    }

    // console.log(JSON.parse(localStorage.getItem("room")))
    // console.log(form.formState.errors.features)
    console.log(images)
    // console.log(JSON.stringify(form.getValues()))

    const router = useRouter()
    const addRoom = async (formdata: z.infer<typeof roomSchema>) => {
        const result = roomSchema.safeParse(formdata)
        const id: any = data?.id


        // console.log(result)

        if (result.success) {
            if (editing) {
                const response = await UpdateRoom(result.data, id)

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
                        status: 'success',
                        text: 'Action completed successfully!',
                    });
                    form.reset()
                    setImages([])
                    setFeatures([])
                    setDescription("")
                }
            } else {
                const response = await CreateRoom(result.data)

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
                        status: 'success',
                        text: 'Action completed successfully!',
                    });
                    form.reset()
                    setImages([])
                    setFeatures([])
                    setDescription("")
                }
            }
            localStorage.removeItem("room")
            router.push("/admin/rooms/");
            router.refresh()
        } else {
            console.log(result.error)
        }
    }

    const labelClass = "font-semibold text-[2rem] text-slate-700 block mb-2 dark:text-white"
    const inputClass = "!py-8 px-4 rounded-[5px] text-gray-700 p-4 py-2 text-[1.8rem] focus-visible:!outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"

    // console.log(form.getValues(), editing)
    return (
        <Form {...form} >
            <div className="mt-5 p-4 z-10  bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
                <form
                    onSubmit={form.handleSubmit(addRoom)}
                    className="space-y-8">
                    <div className='gap-y-12 md:gap-8 grid  md:grid-cols-2 items-start '>
                        <div className='grid gap-4'>
                            {
                                RoomInput.map(size => {
                                    if (size.name === "description") {
                                        return (<FormField
                                            key={size.id}
                                            // control={form.control}
                                            name={size.name}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={labelClass} >{size.label}</FormLabel>
                                                    <FormControl>
                                                        <RichTextEditor content={description} onChange={changeDesc} clx={`text-[1.8rem] w-full ${description && "h-[200px]"} overflow-auto  font-medium placeholder:text-[1.5rem]`} />
                                                        {/* <Input type={size.type} placeholder={size.placeholder} {...field} className={inputClass} /> */}
                                                    </FormControl>
                                                    <FormMessage className='text-[1.4rem]' />
                                                </FormItem>
                                            )}
                                        />)
                                    } else {
                                        return (<FormField
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
                                    }

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
                                            {features?.map((feat, index) => {
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
                                <FormMessage className='text-[1.4rem]' >{form.formState.errors?.features?.message} </FormMessage>
                            </div>
                            <div className='h-[200px]'>
                                <UploadImageComp fileUpload={getImageData} rootFolder='rooms' />
                                <FormMessage className='text-[1.4rem]' >{form.formState.errors.images?.message} </FormMessage>
                            </div>

                            <div className='h-[350px]'>
                                <ImageCarousel files={images} showTexts={false} />
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
