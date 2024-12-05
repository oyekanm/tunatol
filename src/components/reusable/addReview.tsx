"use client"

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Rating from "@mui/material/Rating";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks';
import { reviewSchema } from '@/lib/schema/roomSchema';
import { createReview } from '@/actions/reviewAction';
import { FormSubmitButton } from '../form';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  id?: string;

}

export default function AddReview({ id }: Props) {
  const { data } = useSession();
  const path = usePathname();
  const router = useRouter();
  const [starValue, setStarValue] = useState(0)
  const toast = useToast()



  // form initialization
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
      roomId: id,
      userId: ""
    },
  })

  useEffect(() => {
    // console.log(data)
    form.setValue("userId", data?.userId as any)
  }, [])

  // console.log(form.getValues())

  const handleSubmit = async (values: z.infer<typeof reviewSchema>) => {
    if (!data?.user?.email) {
      const url = encodeURIComponent(path)
      router.push(`/login?callbackUrl=${url}`)
      router.refresh()
      return;
    }


    const result = reviewSchema.safeParse(values)

    console.log(result)

    if (result.success) {
      // console.log("first")
      const response = await createReview(result.data, path)


      // error handling
      if (response?.error) {
        toast({ status: "error", text: `${response.error}` })
        return;
      }

      // data successfully recieved
      if (response?.success) {
        // console.log("success")
        form.reset()
        toast({ status: "success", text: `Your review has been recieved` })
        router.refresh()

      }
    }
    else {
      console.log(result.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-4 md:w-[50%] pt-8' action="">
        <textarea onChange={e => form.setValue('comment', e.target.value)} name="comment" id="comment" className='resize-none p-4 text-[1.4rem] font-medium border placeholder:text-[1.4rem]' placeholder='write a review' cols={30} rows={10}></textarea>
        <span className='flex gap-2 items-center text-[1.6rem] font-medium'>
          Rate:
          <Rating onChange={(event, newValue) => {
            // console.log(event, newValue)
            form.setValue("rating", newValue!)
            setStarValue(newValue!)
          }} size='large' name="half-rating" defaultValue={starValue ? starValue : 0} precision={0.5} />
        </span>
        <FormSubmitButton className='bg-transparent text-gray-700 border-2 ' loading={form.formState.isSubmitting} text='Submit Review' />
      </form>
    </Form>
  )
}
