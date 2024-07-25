import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
import { count } from 'console'

interface StatCardProps {
    type: "scheduled" | "cancelled" | "pending",
    count: number,
    label: string,
    icon: string   
}
const StatCard = ({type, count = 0, label, icon }: StatCardProps) => {
  return (
    <div className={clsx("stat-card", {
        "bg-appointments": type === "scheduled",
        "bg-cancelled": type === "cancelled",
        "bg-pending": type === "pending"
    })}>
        <div className='flex items-center gap-4'>
            <Image
            src={icon}
            alt="appointments"
            width={24}
            height={24}
            />

            <h2 className="text-32-bold text-white">{count}</h2>
        </div>
        <p className='text-16-bold'>{`Total number of ${label} appointments`}</p>

      
    </div>
  )
}

export default StatCard
