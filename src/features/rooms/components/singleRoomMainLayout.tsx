"use client"

import { useStoreContext } from '@/components/provider/storeProvider'
import { ImageCarousel, Modal, ReviewCard, ShareButton } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { calculateDiscountedPrice } from '@/utils'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SingleRoomContentLayout from './singleRoomContentLayout'

type Props = {
    room: Room,
    session: {
        name: string;
        userId: string;
        email: string;
        user_type: UserType;
    }
}

export default function SingleRoomMainLayout({ room,session }: Props) {
    const router = useRouter()
    const {finalPrice} = calculateDiscountedPrice(room.price,room.discount_percent)
    const { setShowNav,changeFormValue,values } = useStoreContext()
    setShowNav(true)
  
    const goBack = () =>{
        router.back()
        router.refresh()
    }
    const events = [
        {
            name:"userId",
            value:session.userId,
        },
        {
            name:"roomId",
            value:room.id
        },
        {
            name:"totalCost",
            value:finalPrice 
        }
    ]


    useEffect(()=>{
        for(let i=0; i < events.length; i++){
            changeFormValue(events[i])
        }
    },[])
 
    // console.log(values) 

    return (
        <div>
            <div className='flex md:hidden items-center justify-between p-4 absolute top-4 z-[2000] w-full  '>
                <Button type="button"
                    onClick={goBack}
                    className="size-12 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-white text-gray-800 hover:bg-white focus:outline-none focus:bg-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                >
                    <ChevronLeft className='!size-8' />
                </Button>
              
                <ShareButton
                    title="Check this out!"
                    text="Interesting content"
                    url={window.location.href}
                />
            </div>
            <div className='h-[45rem] sm:h-[80vh]'>
                <ImageCarousel files={room?.images} moveBtn={false} />
            </div>
            <SingleRoomContentLayout room={room} />

            <section className='bg-gray-100 '>
                <div className='overflow-auto flex  gap-4 p-8'>
                    <ReviewCard noBg={false} />
                    <ReviewCard noBg={false} />
                    <ReviewCard noBg={false} />
                    <ReviewCard noBg={false} />
                    <ReviewCard noBg={false} />
                    <ReviewCard noBg={false} />
                    <ReviewCard noBg={false} />
                    <ReviewCard noBg={false} />
                </div>
                <div className='p-4 '>
                    <Modal trigger={`show all 130 reviews`} triggerclx='bg-transparent border-[2px] w-full md:w-[30rem] border-gray-800 text-gray-800  shadow-sm hover:bg-transparent' >
                        <div className='overflow-auto h-[70vh] grid gap-4'>
                            {/* TODO:create infinite fetch */}
                            <ReviewCard flip={false} noBg={true} />
                            <ReviewCard flip={false} noBg={true} />
                            <ReviewCard flip={false} noBg={true} />
                            <ReviewCard flip={false} noBg={true} />
                            <ReviewCard flip={false} noBg={true} />
                            <ReviewCard flip={false} noBg={true} />
                            <ReviewCard flip={false} noBg={true} />
                        </div>

                    </Modal>
                </div>
            </section>
        </div>
    )
}
