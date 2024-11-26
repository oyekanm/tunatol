import { ReviewCard } from '@/components/reusable';
import { BookingCalenderCheckout, ReservationCard } from '@/features/bookings/components'

type Props = {
    room: Room
}

export default function SingleRoomContentLayout({ room }: Props) {
    if (!room) return;
    const {  price } = room
    return (
        <section className='Container grid my-12  md:grid-cols-[65%,30%] gap-8 items-start'>
            <BookingCalenderCheckout room={room} />
            <div className='h-full'>
                <ReservationCard price={price} />
            </div>
        </section>
    )
}
