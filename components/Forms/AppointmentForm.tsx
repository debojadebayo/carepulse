"use client"

import React, { useState } from 'react'
import { Form } from '../ui/form'
import { CustomFormField, FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getAppointmentSchema } from '@/lib/validation'
import { z } from 'zod'
import { Doctors } from '@/constants'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import { Appointment } from '@/types/appwrite.types'
import { createAppointment, updateAppointment } from '@/lib/actions/appointment.actions'


const AppointmentForm = ({
    userId,
    type,
    appointment,
    patientId,
    setOpen
}:{
    userId:string,
    type:"create" | "schedule" |"cancel",
    appointment?: Appointment,
    patientId?: string
    setOpen?:(open:boolean)=>void 
}) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const AppointmentFormValidation = getAppointmentSchema(type);
    
    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
      resolver: zodResolver(AppointmentFormValidation),
      defaultValues: {
        primaryPhysician: appointment ? appointment.primaryPhysician : "",
        schedule: appointment
        ? new Date(appointment.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || ""
      },
    })

    let buttonLabel
    switch (type) {
        case "create":
            buttonLabel = "Request Appointment"
            break;
        case "cancel":
            buttonLabel = "Cancel Appointment"
            break;
        default:
            buttonLabel = "Request Appointment"
            break;
    }
  
  
    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
      setIsLoading(true)
    
      let status  
      switch (type) {
        case "schedule":
            status = "scheduled"
            break
        case "cancel":
            status = "cancelled"
            break 
        default:
            status= "pending" 
      }

        try {
            console.log("trying to submit")
            if(type === "create" && patientId){
                const appointmentData = {
                    userID: userId, 
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason,
                    note: values.note,
                    status: status as Status
                }

                const appointment = await createAppointment(appointmentData)

                if(appointment){
                    form.reset()
                    router.push(`patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
                }

            } else {
                const appointmentToUpdate = {
                    userID: userId, 
                    appointmentId: appointment?.$id ?? "",
                    appointment: {
                        primaryPhysician: values?.primaryPhysician,
                        schedule: new Date(values?.schedule),
                        reason: values?.reason,
                        status: status as Status,
                        cancellationReason: values?.cancellationReason
                    },
                    type,
                }

                const updatedAppointment = await updateAppointment(appointmentToUpdate)

                if(updatedAppointment){
                    setOpen && setOpen(false)
                    form.reset()
                }
            }
            
        } catch (error) {
            console.error("An error occurred when booking the appointment", error)
            throw error
            
        }

      setIsLoading(false)
  
    }
     
        return (
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
         {type === "create" && 
         <section className="mb-12 space-y-4">
            <div>
                <h1 className="text-5xl font-bold">New Appointment</h1>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-dark-700">Request a new appointment in 10 seconds</h3>
              </div>
            </section>
        }

            {type !== "cancel" && (
                <>
                <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="primaryPhysician"
                label="Doctor"
                placeholder="Select a physician"
                >
                    
                    <>
                        {Doctors.map((doctor, i) => (
                            <SelectItem key={doctor.name + i} value={doctor.name}>
                            <div className='flex cursor-pointer items-center gap-2 border border-dark-600 p-2 rounded-md bg-[#D7EDED] bg-opacity-15'>
                                <Image 
                                    src={doctor.image} 
                                    alt="doctor"
                                    width={24} 
                                    height={24} 
                                    className='rounded-full border border-dark-500'
                                />
                            
                                <p>{doctor.name}</p>
                                
                            </div>
                            </SelectItem>))}
                        </>
                    </CustomFormField>
            
                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField 
                            control = {form.control}
                            fieldType= {FormFieldType.TEXTAREA}
                            name="reason"
                            label="Reason for appointment"
                            placeholder="ex. Annual Monthly Checkup"
                        />
                                
                        <CustomFormField 
                            control = {form.control}
                            fieldType= {FormFieldType.TEXTAREA}
                            name="note"
                            label="Additional Comments/Notes"
                            placeholder="ex. I would prefer an afternoon appointment"
                        />
                    </div>

                    <CustomFormField 
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                        name="schedule"
                        label="Preferred Appointment Date"
                        showTimeSelect
                        dateFormat='MMMM dd, yyyy h:mm aa'
                    />
                    

                </>
            )}

            {type === "cancel" && (
                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="cancellationReason"
                    label="Reason for cancellation"
                    placeholder="Urgent meeting came up"
                />
                )}

            
            <SubmitButton isLoading={isLoading} className={`${type=== 'cancel' ? "shad-danger-btn":"shad-primary-btn"} w-full`}>{buttonLabel}</SubmitButton>
          </form>
        </Form>
        )
      }

export default AppointmentForm
