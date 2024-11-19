"use client"

import React from 'react'
import Navbar from './navbar'
import { ImageCarousel } from '@/components/reusable'
import Footer from './footer'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative'>
      <Navbar />
      <div className='h-[80vh]'>
        <ImageCarousel files={""} showTexts />
      </div>
      {children}
      <Footer />
    </main>
  )
}
