import { FacilityForm } from '@/components/form'
import { prisma } from '@/lib'
import React from 'react'

export default async function page() {
const data = await prisma.facility.findMany({
  include:{
    image:true
  }
})
  return (
    <FacilityForm data={data} />
  )
}
