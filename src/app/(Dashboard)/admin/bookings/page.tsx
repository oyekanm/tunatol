"use client"


import { Loader2 } from 'lucide-react';
import { OrderColumn } from "./OrderColumn"
import { TableComponent } from '@/components/reusable';
import { prisma } from '@/lib';


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

// const ITEMS_PER_PAGE = 10;

// async function getPosts(page: number) {
//   const skip = (page - 1) * ITEMS_PER_PAGE;

//   const [posts, total] = await Promise.all([
//     prisma.booking.findMany({
//       take: ITEMS_PER_PAGE,
//       skip,
//       orderBy: { createdAt: 'desc' }
//     }),
//     prisma.booking.count()
//   ]);

//   return {
//     posts,
//     totalPages: Math.ceil(total / ITEMS_PER_PAGE),
//     currentPage: page
//   };
// }

// export default async function PostsPage({ 
//   searchParams 
// }: { 
//   searchParams: { page?: string } 
// }) {
//   const page = Number(searchParams.page) || 1;
//   const { posts, totalPages, currentPage } = await getPosts(page);

export default function page() {
  // const { data, error, isLoading } = FetchData({url:'/api/products'}) 
  // console.log(OrderColumn)
  return (
    <div>
      <section>
        {/* {isLoading && <div className='flex items-center justify-center'>
                    <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
                </div>} */}
        {
          data?.length > 0 && (
            <TableComponent
              check={false}
              column={OrderColumn} data={data} headerText='Orders'
              path='/admin-dashboard/orders'
              pathText='View'
              hrefText='Create a Reservation'
              href='/admin/bookings/add-new'
            />
          )
        }
        {
          data?.length === 0 && <div className='flex items-center justify-center mt-12'>
            <p className='text-[3rem] font-bold capitalize '>No product</p>
          </div>
        }
      </section>
    </div>
  )
}

