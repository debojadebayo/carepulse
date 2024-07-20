import React from 'react'
import Image from 'next/image'
import { Doctors } from '@/constants'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { format } from 'date-fns'

const SuccessPage = async ({searchParams, params: {userID} }:SearchParamProps) => {

    const appointmentId = searchParams?.appointmentId as string 


    let appointment: CreateAppointmentParams

    appointment = await getAppointment(appointmentId)

    //checks for doctor which matches the doctor selected as appointment
        
    const doctor = Doctors.find(doctor => doctor.name === appointment.primaryPhysician)
      
        

  return (
    <div className='flex-center flex-col h-screen max-h-screen'>
        <div className='max-w-[650px]'>

            <div className='flex-center p-[5%]'>
                <Image 
                src="/assets/icons/logo-full.svg" 
                alt="carepulse-logo"
                height={1000}
                width={1000}
                className='h-12 w-full mb-20'
                />
            </div>

            <div className='flex justify-center'>
                <Image
                src="/assets/icons/check-circle.svg"
                alt="check-circle-icon"
                height={100}
                width={100}
                className='text-green-500'
                />
            </div>

            <h1 className='header text-center'>Your <span className='text-green-500'>appointment request</span> has been successfully submitted</h1>
            <p className='text-xl text-center mt-5 text-gray-200'>We'll be in touch shortly to confirm</p>

            <hr className="border-t-1 border-gray-500 my-6" />
            <div className='flex flex-row flex-center gap-6'>
                <h3 className='text-xl'>Requested appointment details: </h3>

                <div className='flex flex-row gap-2 border border-gray-500 p-2 rounded-md'>
                    {doctor && (
                        <Image 
                            src={doctor.image} 
                            alt="doctor"
                            width={24} 
                            height={24} 
                            className='rounded-full border border-dark-500'
                        />
                    )}

                    <p className='text-lg'>{doctor && doctor.name}</p>
                </div>
            
                    <div className='flex flex-row items-center gap-1'>
                        <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar-icon"
                        height={24}
                        width={24}
                        className='text-white' 
                        />

                        <p>{format(appointment.schedule, "PPP")}</p>
                    </div>
                


            </div>

            <hr className="border-t-1 border-gray-500 my-6" />
        </div>
    </div>
  )
}

export default SuccessPage
