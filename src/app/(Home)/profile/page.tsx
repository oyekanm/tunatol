import { ProfileTabMenu } from '@/features/profile/components'
import { useCurrentUser } from '@/hooks'
import Link from 'next/link'
import React from 'react'

export default async function page() {
    const session = await useCurrentUser()
    if (!session.email) {
        return (
            <div className='flex gap-8 items-center flex-col justify-center w-full px-4  h-[50rem] mx-auto max-w-[50rem]'>
                <p className='text-[2rem] font-semibold'>This page can only be accessed by registered users</p>
                <Link href={`/register`}  className={`rounded-md self-start bg-gray-100 px-8 py-3 text-[1.4rem] font-medium text-gray-800 transition hover:text-gray-800/75 sm:block`}>
                    Click here to access this page
                </Link>
            </div>
        )
    }
    return (
        <div className='Container my-12 min-h-[50rem]'>
            <div className="flex items-center gap-x-3">
                <div className="shrink-0">
                    <img className="shrink-0 size-16 rounded-full" src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" />
                </div>

                <div className="grow">
                    <p className="text-[2rem] font-medium text-gray-800 dark:text-neutral-200">
                        {session.name}
                    </p>
                    <p className="text-[1.8rem] text-gray-600 dark:text-neutral-400">
                        {session.email}
                    </p>
                </div>
            </div>
            <ProfileTabMenu/>
        </div>
    )
}
