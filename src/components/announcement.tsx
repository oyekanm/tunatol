"use client"

import React from 'react'
import { useStoreContext } from './provider/storeProvider'

type Props = {
    text: string
}

export default function Announcement() {
    const { announce } = useStoreContext()
    return (
        <>
            {announce && <div className="bg-indigo-600 px-4 py-3 text-white">
                <p className="text-center text-[2rem] font-medium">
                    {announce}
                </p>
            </div>}
        </>
    )
}
