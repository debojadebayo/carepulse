"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { Appointment } from "@/types/appwrite.types"
import Image from "next/image"
import { Doctors } from "@/constants"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
        <p className="text-14-medium">
            {row.index + 1}. {row.original.appointment.patient.name}
        </p>
    )
  },
  {
    accessorKey: "schedule",
    header: "Date & Time",
    cell: ({ row }) => formatDateTime(row.original.appointment.schedule)
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
                width={24}
                height={24}
                className="rounded-full" 
            />
            <p>{doctor?.name}</p>
        </div>
    )}
  },
  {
    accessorKey: "actions",
    header: "Actions",
  }
]
function formatDateTime(schedule: Date): any {
    throw new Error("Function not implemented.")
}

