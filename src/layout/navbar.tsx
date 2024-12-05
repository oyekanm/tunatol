"use client"

import { useStoreContext } from '@/components/provider/storeProvider'
import { useSignOut } from '@/hooks'
import { cn } from '@/lib'
import { ChartColumnIncreasing, LogOut } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    session: Partial<User>
}



export default function Navbar({ session }: Props) {
    const path = usePathname()
    const { logout } = useSignOut()
    const { showNav } = useStoreContext()
    // const { data } = useSession();
    const user: any = "ADMIN"

    // console.log(showNav)

    return (
        <header className={`${showNav && "hidden md:block"} flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700`}>
            <nav className="relative  w-full mx-auto flex items-center justify-between gap-6 sm:gap-8 py-4 px-4 sm:px-6 lg:px-8">

                <Link className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white" href="/" aria-label="Brand">Brand</Link>

                <div className="md:order-3 flex justify-end items-center gap-x-1">
                    <button type="button" className="md:hidden relative p-2 px-4 flex items-center font-medium text-[1.4rem] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-header-base-collapse" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-header-base" aria-label="Toggle navigation" data-hs-overlay="#hs-header-base"  >
                        Menu
                        <svg className="shrink-0 size-6 ms-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                    </button>

                    <div className="hidden md:inline-block md:me-8">
                        <div className="w-1 h-8 bg-gray-300 dark:bg-neutral-700"></div>
                    </div>

                    {session.email ? (
                        <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                            <button id="hs-dropdown-account" type="button" className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                                <img className="shrink-0 size-[38px] rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                            </button>

                            <div className="z-[2500] hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[20rem] bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
                                <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
                                    <p className="text-[1.2rem] text-gray-500 dark:text-neutral-500">Signed in as</p>
                                    <p className="text-[1.2rem] font-medium text-gray-800 dark:text-neutral-200">{session.email}</p>
                                </div>
                                <div className="p-1.5 space-y-0.5 grid gap-4">
                                    {/* <Links url={``} text='Bookings' cls={`font-normal`}>
                                        <LogOut className='' />
                                    </Links> */}
                                    <Links url={`/profile`} text='Profile' cls={`font-normal ${path.includes("profile") && "bg-gray-100"} `}>
                                        <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    </Links>
                                    {/* <Links url={``} text='Notification' cls={`font-normal `}>
                                        <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                                    </Links> */}
                                    {session.user_type === user && (
                                        <Links url={`/admin`} text='Dashboard' cls={`font-normal  ${path === "/admin" && "bg-gray-100"}`} >
                                            <ChartColumnIncreasing className="shrink-0 size-6" />
                                        </Links>
                                    )}
                                    <span onClick={logout} className='block' >
                                        <Links url={``} text='Log out' cls={`font-normal `}>
                                            <LogOut className='size-6' />
                                        </Links>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : <Links url={`/login`} text='Login' cls={`rounded-md bg-gray-100 px-8 py-3 text-[1.4rem] font-medium text-teal-600 transition hover:text-teal-600/75 sm:block`}>
                    </Links>}
                </div>

                <div id="hs-header-base" className="hs-overlay [--auto-close:md] hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-[30rem] w-full z-[60] bg-white border-e basis-full grow md:order-2 md:static md:block md:h-auto md:max-w-none md:w-auto md:border-e-transparent md:transition-none md:translate-x-0 md:z-40 md:basis-auto dark:bg-neutral-800 dark:border-e-gray-700 md:dark:border-e-transparent hidden " role="dialog" aria-label="Sidebar" data-hs-overlay-close-on-resize  >
                    <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <div className="py-2 md:py-0 px-2 md:px-0 flex flex-col md:flex-row md:items-center gap-8 md:gap-1">
                            <div className="md:hidden p-2 flex justify-between items-center">
                                <h3 id="hs-header-base-label" className="font-bold text-gray-800 dark:text-white">
                                    Brand
                                </h3>
                                <button type="button" className="size-10 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-header-base">
                                    <span className="sr-only">Close</span>
                                    <svg className="shrink-0 size-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                            <div className="grow">
                                <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-2 md:gap-1">
                                    <span className='md:hidden' aria-label="Close" data-hs-overlay="#hs-header-base" >
                                        <Links url={`/rooms`} text='Rooms' cls={`${path.includes("rooms") && "underline  font-semibold"}  hover:bg-transparent hover:underline`} >
                                        </Links>
                                    </span>
                                    <span className='hidden md:block' >
                                        <Links url={`/rooms`} text='Rooms' cls={`${path.includes("rooms") && "underline  font-semibold"}  hover:bg-transparent hover:underline`} >
                                        </Links>
                                    </span>
                                    <span className='md:hidden' aria-label="Close" data-hs-overlay="#hs-header-base">
                                        <Links url={`/facility`} text='Facility' cls={`${path.includes("facility") && "underline  font-semibold"} hover:bg-transparent hover:underline`} >
                                        </Links>
                                    </span>
                                    <span className='hidden md:block'>
                                        <Links url={`/facility`} text='Facility' cls={`${path.includes("facility") && "underline  font-semibold"} hover:bg-transparent hover:underline`} >
                                        </Links>
                                    </span>
                                    <span className='md:hidden' aria-label="Close" data-hs-overlay="#hs-header-base">
                                        <Links url={`/contact`} text='Contact' cls={`${path.includes("contact") && "underline  font-semibold"} hover:bg-transparent hover:underline`} >
                                        </Links>
                                    </span>
                                    <span className='hidden md:block'>
                                        <Links url={`/contact`} text='Contact' cls={`${path.includes("contact") && "underline  font-semibold"} hover:bg-transparent hover:underline`} >
                                        </Links>
                                    </span>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Links = ({ text, url, cls, children }: { url: string, text: string, cls?: string, children?: React.ReactNode }) => {
    return (
        <Link
            className={cn(
                "flex items-center gap-x-3.5 py-3 px-4  text-[1.4rem] font-semibold text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white",
                cls
            )}
            href={`${url}`}>
            {children}
            {text}
        </Link>
    )
}
