"use client"

import React, { useState } from 'react'
import ProfileBookingComponent from './profileBookingComponent'
import ProfileReviewComponent from './profileReviewComponent'

export default function ProfileTabMenu() {
    const [tab, setTab] = useState("review")

    const changeTab = (name: string) => {
        setTab(name)
    }

    const clx = "shrink-0 rounded-t-lg border border-transparent p-3 px-4 sm:px-8 text-[1.6rem] font-medium text-gray-500 hover:text-gray-700"
    return (
        <div>
            <div className="block overflow-auto">
                <div className="border-b border-gray-200 mt-8 cursor-pointer">
                    <nav className="mb-[] flex gap-6">
                        <span
                            onClick={() => changeTab("review")}
                            className={`${clx} ${tab === "review" && "!border-gray-300 !border-b-white"}`}
                        >
                            Review
                        </span>

                        <span
                            onClick={() => changeTab("bookings")}
                            className={`${clx} ${tab === "bookings" && "!border-gray-300 !border-b-white"}`}
                        >
                            Bookings
                        </span>
                    </nav>
                </div>
            </div>
            <div className='Container py-8'>
                {tab === "review" &&
                    <ProfileReviewComponent />
                }
                {tab === "bookings" &&
                    <ProfileBookingComponent />
                }
            </div>
        </div>
    )
}

