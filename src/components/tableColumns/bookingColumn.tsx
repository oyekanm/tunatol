"use client"

import { format } from "date-fns"
import { NairaSign } from "../reusable"

// import { DeleteSingleProduct } from "@/actions/ProductActions"



const BookingColumn: column[] = [
    {
        key: "totalCost",
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
        key: "startDate",
        label: "Start Date",
        render(value: any) {
            const date = format(value, 'MMM dd, yyyy')
            return (
                <span className="block text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200"
                > {date}
                </span>
            )
        },
    },
    {
        key: "endDate",
        label: "End Date",
        render(value: any) {
            const date = format(value, 'MMM dd, yyyy')
            return (
                <span className="block text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200"
                > {date}
                </span>
            )
        },
    },
    {
        key: "status",
        label: "Status",
        render(value) {
            return <span className={`text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200 inline lowercase status ${value.toLowerCase()}`}>{value}</span>
          },
    },
    {
        key: "type",
        label: "Type",
    }
]

export default BookingColumn