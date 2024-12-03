import { TableComponent } from "@/components/reusable";
import { TransactionColumn } from "@/components/tableColumns";

// const data = [
//     {
//       total_price: 1000,
//       id: "ORD001",
//       status: "Pending",
//       createdAt: new Date(),
//       payment_method: "Credit Card"
//     },
//     {
//       total_price: 1000,
//       id: "ORD002",
//       status: "Processing",
//       createdAt: new Date(),
//       payment_method: "PayPal"
//     },
//     {
//       total_price: 1000,
//       id: "ORD003",
//       status: "Completed",
//       createdAt: new Date(),
//       payment_method: "Stripe"
//     },
//     {
//       total_price: 1000,
//       id: "ORD004",
//       status: "Pending",
//       createdAt: new Date(),
//       payment_method: "Venmo"
//     },
//     {
//       total_price: 1000,
//       id: "ORD005",
//       status: "Completed",
//       createdAt: new Date(),
//       payment_method: "Bank Transfer"
//     },
//     {
//       total_price: 1000,
//       id: "ORD006",
//       status: "Processing",
//       createdAt: new Date(),
//       payment_method: "Apple Pay"
//     },
//     {
//       total_price: 1000,
//       id: "ORD007",
//       status: "Completed",
//       createdAt: new Date(),
//       payment_method: "Google Pay"
//     },
//     {
//       total_price: 1000,
//       id: "ORD008",
//       status: "Pending",
//       createdAt: new Date(),
//       payment_method: "Cryptocurrency"
//     },
//     {
//       total_price: 1000,
//       id: "ORD009",
//       status: "Processing",
//       createdAt: new Date(),
//       payment_method: "Alipay"
//     }
//   ];

  type Props = {
    data:Transaction[]
  }
  
  export default function RefundTransactions({data}:Props) {
    // const { data, error, isLoading } = FetchData({url:'/api/products'}) 
    // console.log(OrderColumn)
    console.log(data?.length)
    return (
      <div>
        <section className="mt-16">
          <p className="text-center font-bold text-[2rem]">We dont have any Redunds at the moment</p>
          {/* {isLoading && <div className='flex items-center justify-center'>
                      <Loader2 className='h-12 w-12 animate-spin text-zinc-800' />
                  </div>} */}
          {/* {
            data?.length > 0 && (
              <TableComponent
                check={false}
                column={TransactionColumn} data={data} headerText='Refunds'
              />
            )
          } */}
          {/* {
            data?.length === 0 && <div className='flex items-center justify-center mt-12'>
              <p className='text-[3rem] font-bold capitalize '>No product</p>
            </div>
          } */}
        </section>
      </div>
    )
  }