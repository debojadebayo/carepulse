// conditional render classNames based on status
// conditionally render image based on status: alt status, width 24 height 24 classname h-3 w-fit 
// conditionall render p element with text based on status <p>{status}</p>

import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { StatusIcon } from '@/constants'

const StatusBadge = ( {status }: {status:Status}) => {
  return (
    <div className={clsx( "status-badge", {
      "bg-green-600": status === "scheduled",
      "bg-blue-600": status === "pending",
      "bg-red-600": status === "cancelled"
    }
    )}>
        <Image 
        src={StatusIcon[status]} 
        alt="doctor"
        height={24}
        width={24}
        className='h-3 w-fit' />
        <p
        className={clsx("text-12-semibold capitalize",{

          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        }
        )}>{status}</p>
    </div>
  )
}

export default StatusBadge
