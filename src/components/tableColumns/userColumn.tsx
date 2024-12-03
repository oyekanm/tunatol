import { format } from "date-fns"

const UserColumn: column[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "bookings",
      label: "Reservations",
      render(value: any) {
        return (
          <span className="block text-[1.1rem] font-semibold text-gray-800 dark:text-neutral-200"
          >{value.length} reservations
          </span>
        )
      },
    },
    {
      key: "user_type",
      label: "User Type",
    },
    {
      key: "createdAt",
      label: "Joined",
      render(value: any) {
          const date = format(value, 'MMM dd, yyyy')
          return (
              <span className="block text-[1.2rem] font-semibold text-gray-800 dark:text-neutral-200"
              > {date}
              </span>
          )
      },
  },
  ]
export default UserColumn
 