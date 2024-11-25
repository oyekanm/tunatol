import React from 'react'
import Navbar from './navbar'
import { ImageCarousel } from '@/components/reusable'
import Footer from './footer'
import { ToastProvider } from '@/components/provider'
import { CurrentUser } from '@/hooks'



export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const current = await CurrentUser()
  console.log(current, "session")
  return (
    <main className='relative'>
      <ToastProvider>
        <Navbar session={current} />
        {children}
        <Footer />
      </ToastProvider>
    </main>
  )
}
