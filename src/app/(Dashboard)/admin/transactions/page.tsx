import { TransactionLayout } from "@/features/transactions/components"
import { prisma } from "@/lib"

const ITEMS_PER_PAGE = 10;

async function getTransactions(page: number) {
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [payments, total] = await Promise.all([
    prisma.transaction.findMany({
      where:{
        type:"PAYMENT"
      },
      take: ITEMS_PER_PAGE,
      skip,
      // orderBy: { createdAt: 'desc' }
    }),
    prisma.transaction.count()
  ]);
console.log(total)
  return {
    payments,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    currentPage: page
  };
}

 async function page({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  const page = Number(searchParams.page) || 1;
  const { payments, totalPages, currentPage }:any = await getTransactions(page);
// console.log(payments.length, totalPages, currentPage)
  return (
    <TransactionLayout currentPage={currentPage} totalPages={totalPages} payment={payments}/>
  )
}

export default page

