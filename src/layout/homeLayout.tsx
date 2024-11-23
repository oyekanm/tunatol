"use client"

import React from 'react'
import Navbar from './navbar'
import { ImageCarousel } from '@/components/reusable'
import Footer from './footer'
import { ToastProvider } from '@/components/provider'

const files:Image[] = [
  {
    key:"/assets/Image/lux room.jpg",
    url:"/assets/Image/lux room.jpg"
  },
  {
    key:"/assets/Image/steven-ungermann.png",
    url:"/assets/Image/steven-ungermann.png"
  },
  {
    key:"/assets/Image/room.png",
    url:"/assets/Image/room.png"
  },
]

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative'>
      <ToastProvider>
        <Navbar />
        <div className='h-[80vh]'>
          <ImageCarousel files={files} showTexts />
        </div>
        {children}
        <Footer />
      </ToastProvider>
    </main>
  )
}
