import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { SessionProvider, StoreProvider, ToastProvider } from '@/components/provider'
import { CurrentUser } from '@/hooks'
import { Announcement } from '@/components'



export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const current:any = await CurrentUser()
  console.log(current, "session")
  return (
    <SessionProvider session={current}>
      <ToastProvider>
        <StoreProvider>
          <main className='relative'>
            <Announcement />
            <Navbar session={current} />
            {children}
            <Footer />
          </main>
        </StoreProvider>
      </ToastProvider>
    </SessionProvider>
  )
}
