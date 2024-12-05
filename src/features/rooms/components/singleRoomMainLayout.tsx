"use client"

import { useStoreContext } from '@/components/provider/storeProvider'
import { AddReview, ImageCarousel, ImageMasonry, Modal, ReviewCard, ShareButton } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { calculateDiscountedPrice } from '@/utils'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import SingleRoomContentLayout from './singleRoomContentLayout'
import { useSession } from 'next-auth/react'

type Props = {
    room: Room,
    session: {
        name: string;
        userId: string;
        email: string;
        user_type: UserType;
    }
}

export default function SingleRoomMainLayout({ room, session }: Props) {

    const router = useRouter()
    const { finalPrice } = calculateDiscountedPrice(room.price, room.discount_percent)
    const { setShowNav, changeFormValue, values } = useStoreContext()
    setShowNav(true)

    const goBack = () => {
        router.back()
        router.refresh()
    }
    const events = [
        {
            name: "userId",
            value: session.userId || "id",
        },
        {
            name: "roomId",
            value: room.id
        },
    ]

    useEffect(() => {
        for (let i = 0; i < events.length; i++) {
            changeFormValue(events[i])
        }
    }, [])


    return (
        <div>
            <div className='Container mx-auto flex  items-center justify-between p-4 absolute md:relative top-4 z-[2000] w-full  '>
                <Button type="button"
                    onClick={goBack}
                    className="size-12 md:hidden inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-white text-gray-800 hover:bg-white focus:outline-none focus:bg-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                >
                    <ChevronLeft className='!size-8' />
                </Button>
                <p className='hidden md:block text-[2.5rem] font-semibold'>{room.name}</p>
                <ShareButton
                    title="Check this out!"
                    text="Interesting content"
                    url={window.location.href}
                />
            </div>
            <div className='block md:hidden h-[45rem]'>
                <ImageCarousel files={room?.images} moveBtn={false} />
            </div>
            <div className={`hidden md:block  ${room.images.length < 5 ? "h-[80vh]" : "h-[600px] pb-8"} `}>
                {room.images.length < 5 ?
                    <ImageCarousel files={room?.images} moveBtn={false} /> :
                    <ImageMasonry files={room?.images.slice(0, 5)} />}
            </div>
            <SingleRoomContentLayout room={room} />

            <section className='bg-gray-100 '>
                <div className='overflow-auto flex  gap-4 p-8'>
                    {
                        room.Reviews?.slice(0, 19).map(review => {
                            return (
                                <ReviewCard
                                    key={review.id}
                                    noBg={false}
                                    name={review?.user?.name}
                                    text={review.comment}
                                    rating={review.rating}
                                    time={review.createdAt}
                                    img=''
                                    user={review.user?.createdAt}
                                />)
                        })
                    }
                </div>
                <div className='p-4 '>
                    <Modal chdclx='!p-4' trigger={`show all ${room.Reviews.length} reviews`} triggerclx='bg-transparent border-[2px] w-full md:w-[30rem] border-gray-800 text-gray-800  shadow-sm hover:bg-transparent' >
                        <div className='overflow-auto h-[100vh] grid gap-4'>
                            {/* TODO:create infinite fetch */}
                            {/* TODO:search reviews */}

                            {
                                room.Reviews?.map(review => {
                                    return (
                                        <ReviewCard
                                            key={review.id}
                                            noBg={false}
                                            name={review?.user?.name}
                                            text={review.comment}
                                            rating={review.rating}
                                            time={review.createdAt}
                                            img=''
                                            flip={false}
                                            fw
                                            user={review.user?.createdAt}
                                        />)
                                })
                            }
                        </div>

                    </Modal>
                </div>
            </section>
            <section className='Container grid gap-4 py-8'>
                <div className='border-2 rounded-[10px] p-4'>
                    <p className='text-[1.4rem] font-semibold '> Rules to abide by</p>
                    <div className='grid gap-2 mt-4 [&>p]:text-[1.3rem] ' >
                        <p>5 guests maximum</p>
                        <p>commercial photos not allowed</p>
                        <p>pet(s) not allowed</p>
                        <p>smoking not allowed</p>
                        <p>check-in time: 8:00 AM</p>
                        <p>check-out time: 5:00 AM</p>
                    </div>
                </div>
                <div className='border-2 rounded-[10px] p-4'>
                    <p className='text-[1.4rem] font-semibold '> Cancellation policy</p>
                    <div className='[&>p]:text-[1.3rem] mt-4  '>
                        <p>review host's privacy policy</p>
                    </div>
                </div>
            </section>
            {
                room.bookings.map(b => (b.userId)).includes(session.userId) &&
                <section className='Container grid gap-4 py-8'>
                    <AddReview id={room.id} />
                </section>
            }
        </div>
    )
}
