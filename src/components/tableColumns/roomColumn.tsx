"use client"

// import { DeleteSingleProduct } from "@/actions/ProductActions"



 const RoomColumn: column[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "isAvailable",
    label: "Available",
    render(value) {
      return <span className={`text-[1.2rem] font-semibold text-gray-800 dark:text-neutral-200 inline lowercase status ${value? "text-green-400":"text-red-400"}`}>{value? "true":"false"}</span>
    },
  },
  {
    key: "price",
    label: "Price",
    render(value: any) {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(value)

      return (
        <span className="block text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200"
        >{formatted}
        </span>
      )
    },
  },
]

export default RoomColumn