import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

type User = {
  id: string
  name: string
  email: string
  user_type: 'USER'
  createdAt: Date
  password:string
}

type Transaction = {
  id: string
  amount: number
  paymentMethod: 'cash' | 'card' | 'bank'
  customerEmail: string | null
  reference: string | null
  createdAt: Date
  bookingId: string
}

const getRandomDate = () => {
  const start = new Date('2023-08-01')
  const end = new Date('2023-11-30')
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const getRandomPaymentMethod = () => {
  const methods = ['cash', 'card', 'bank'] as const
  return methods[Math.floor(Math.random() * methods.length)]
}
const getRandomRoom = () => {
  const methods = ['cm3ui9lvk000h13orzorworkv', 'cm3ueirbb000113or5crsk503', 'cm3umf9g2001113orgf4t8e0q'] as const
  return methods[Math.floor(Math.random() * methods.length)]
}

const users: User[] = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  user_type: 'USER',
  createdAt: getRandomDate(),
  password:"khkshdkshds"
}))

const transactions: Transaction[] = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  amount: faker.number.int({ min: 1000, max: 100000 }),
  paymentMethod: getRandomPaymentMethod(),
  customerEmail: faker.helpers.arrayElement([faker.internet.email(), null]),
  reference: faker.helpers.arrayElement([`PS_REF_${faker.string.alphanumeric(10)}`, null]),
  createdAt: getRandomDate(),
  bookingId: "cm47l4u7b0000upg6i1fw1css"
}))
const bookings = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  totalCost: faker.number.int(45000),
 endDate: getRandomDate(),
  startDate: getRandomDate(),
  roomId:"cm3ui9lvk000h13orzorworkv",
  userId:"cm3qp0iea00001bpilmd6iru2"
}))
const reviews = Array.from({ length: 150 }, () => ({
  id: faker.string.uuid(),
  rating: faker.number.int({ min: 1, max: 4 }),
  comment:faker.word.words(20),
  roomId:getRandomRoom(),
  userId:"cm3qp0iea00001bpilmd6iru2",
  createdAt: getRandomDate() as any
}))

async function main() {
  // await prisma.transaction.deleteMany()
  // await prisma.transaction.deleteMany()
  // await prisma.transaction.deleteMany()
//   await prisma.user.deleteMany()

  // await prisma.user.createMany({ data: users })
  await prisma.transaction.createMany({ data: transactions })
  await prisma.booking.createMany({ data: bookings })
  await prisma.reviews.createMany({ data: reviews })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })