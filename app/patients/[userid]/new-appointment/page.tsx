import React from 'react'
import Image from 'next/image'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { getPatient } from '@/lib/actions/patient.actions'
import * as Sentry from '@sentry/nextjs'

const AppointmentPage = async ({params}:SearchParamProps) => {

    const { userid } = params
    const patient = await getPatient(userid)

    Sentry.metrics.set("user_view_register", patient.name);

    
  return (
    <div className="flex h-screen max-h-screen">
        <section className="container my-auto remove-scrollbar">
            <div className="subcontainer max-w-[860px] flex-1 justify-between">
          
                <Image 
                src="/assets/icons/logo-full.svg" 
                alt="CarePulse Logo" 
                width={1000} 
                height={1000}
                className= "mb-12 h-12 w-fit"
                />

                <AppointmentForm
                type="create"
                userId={userid} //userID from the search parameters
                patientId={patient?.$id}//ID from the patient in the database 
                />
        
                <p className="copyright mt-10 py-12">© CarePulse 2024 - all rights reserved</p>
            </div>

      </section>

            <Image
            src="/assets/images/appointment-img.png"
            alt="Appointment Image"
            width={1500}
            height={1500}
            className="side-img max-w-[390px] bg-bottom"
            />
    </div>
  )
}

export default AppointmentPage
