"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { Appointment } from "@/types/appwrite.types"
import Image from "next/image"
import { Doctors } from "@/constants"
import { formatDateTime } from "@/lib/utils"
import AppointmentModal from "../AppointmentModal"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
        <p className="text-14-medium">
            {row.index + 1}. {row.original.patient.name}
        </p>
    )
  },
  {
    accessorKey: "schedule",
    header: "Date & Time",
    cell: ({ row }) => {
      const formattedDate = formatDateTime(row.original.schedule)
      return formattedDate.dateTime
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row })=> (
        <div className="min-w-[115px]">
            <StatusBadge status={row.original.status} />
        </div>
    )
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row })=> {
        
        const doctor = Doctors.find((doc)=> doc.name === row.original.primaryPhysician)

    return (
        <div className="flex items-center gap-2">
            <Image
                src={doctor?.image || "/assets/images/dr-cameron.png"}
                alt={row.original.primaryPhysician}
                width={100}
                height={100}
                className="rounded-full size-8" 
            />
            <p className="whitespace-nowrap">{doctor?.name}</p>
        </div>
    )}
  },
  {
    accessorKey: "actions",
    header: () => <div className="flex items-center justify-start mx-4">Actions</div>,
    cell: ({ row }) => {
      return (
        
        <div className="flex gap-1">
          <AppointmentModal 
          type="schedule"
          patientId={row.original.patient.$id} 
          userId= {row.original.userID}
          appointment={row.original}/>
       

          <AppointmentModal 
          type="cancel"
          patientId={row.original.patient.$id} 
          userId= {row.original.userID}
          appointment={row.original}/>
        </div>
      
      )
    }
  }
]