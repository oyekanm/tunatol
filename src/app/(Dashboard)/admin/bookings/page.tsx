import { BookingAdminLayout } from '@/features/bookings/components';
import { prisma } from '@/lib';




const ITEMS_PER_PAGE = 10;

async function getBookings(page: number) {
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [booking, total] = await Promise.all([
    prisma.booking.findMany({
      take: ITEMS_PER_PAGE,
      skip,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.booking.count()
  ]);

  return {
    booking,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    currentPage: page
  };
}


export default async function page({ 
    searchParams 
  }: { 
    searchParams: { page?: string } 
  }) {
 const data = await prisma.booking.findMany()
 const page = Number(searchParams.page) || 1;
 const { booking, totalPages, currentPage } = await getBookings(page);
  return (
   <BookingAdminLayout data={booking} currentPage={currentPage} totalPages={totalPages} />
  )
}

