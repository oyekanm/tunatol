import { prisma } from '@/lib';
import UserAdminLayout from './userAdminLayout';


const ITEMS_PER_PAGE = 10;

async function getUsers(page: number) {
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      take: ITEMS_PER_PAGE,
      skip,
      orderBy: { createdAt: 'desc' },
      include:{
        bookings:true
      }
    }),
    prisma.user.count()
  ]);
console.log(total)
  return {
    users,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    currentPage: page
  };
}

export default async function page({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  const page = Number(searchParams.page) || 1;
  const { users, totalPages, currentPage }:any = await getUsers(page);
  console.log(users, totalPages, currentPage)
// const data:any = await prisma.user.findMany({
//   include:{
//     bookings:true
//   }
// })
  return (
    <UserAdminLayout data={users} currentPage={currentPage} totalPages={totalPages} />
  )
}

