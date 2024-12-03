"use client"

import { NairaSign } from "../reusable"

// import { DeleteSingleProduct } from "@/actions/ProductActions"



 const TransactionColumn: column[] = [
  {
    key: "amount",
    label: "Total",
    render(value: any) {
        return (
          <span className="block text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200"
          > <NairaSign />{value}
          </span>
        )
      },
  },
  {
    key: "customerEmail",
    label: "Email"
  },
  {
    key: "paymentMethod",
    label: "Payment Method",
  },
  {
    key: "status",
    label: "Status",
    render(value) {
      return <span className={`text-[1.2rem] font-semibold text-gray-800 dark:text-neutral-200 inline lowercase status ${value.toLowerCase()}`}>{value}</span>
    },
  },
  {
    key: "type",
    label: "Type",
  }
]

export default TransactionColumn