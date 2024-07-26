


// you will need to fetch all the recents appointments from the database (create getrecentappointment function in appointment actions )

import DataTable from '@/components/table/DataTable'
import StatCard from '@/components/StatCard'
import { getRecentAppointments } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { columns } from '@/components/table/columns'

const Admin = async () => {

    const appointments = await getRecentAppointments()
    console.log("Here are the appointments from the database", appointments.document)
  return (
    <div className='max-w-7xl flex flex-col mx-auto gap-14'>
        <header className='admin-header'>
            <Link href='/'>
                <Image
                src="/assets/icons/logo-full.svg"
                alt="Carepulse Logo"
                height={32}
                width={162}
                className='h-8 w-fit'
                />
            </Link>
            <p className='text-16-semibold'>
                Admin Dashboard
            </p>
        </header>

        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome, Admin</h1>
                <p className='text-dark-700'>Start your day with managing new appointments</p>
            </section>

            <section className='admin-stat'>
                <StatCard 
                type="scheduled"
                label="appointments"
                count={appointments.scheduled}
                icon={"/assets/icons/appointments.svg"}
                />
                <StatCard 
                type="pending"
                label="appointments"
                count={appointments.pending}
                icon={"/assets/icons/pending.svg"}
                />
                <StatCard 
                type="cancelled"
                label="appointments"
                count={appointments.cancelled}
                icon={"/assets/icons/cancelled.svg"}
                />

            </section>
            <section>
                <DataTable columns={columns} data={appointments.document}  />
            </section>
        </main>
    </div>
  )
}

export default Admin
