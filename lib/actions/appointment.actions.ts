
// create an appointment object for the three different states that the appointment can be in 
// use a reduce function to update the state of the appointment object according to the array of appointments that you've fetched from the database
"use server"

import { ID, Query } from 'node-appwrite'
import { 
    DATABASE_ID, 
    databases,
    APPOINTMENTS_COLLECTION_ID, 
    } from '../appwrite.config'
import { parseStringify } from '../utils'
import { Appointment } from '@/types/appwrite.types'
import { revalidatePath } from 'next/cache'


//create appointment 

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            ID.unique(),
            appointment

        )
        
        return parseStringify(newAppointment)
        
        
    } catch (error) {
        console.log("Problem creating Appointment", error)
        throw error 
        
    }
}

// fetch appointment details from the database 


export const getAppointment = async (appointmentID: string) => {

    try {
        const returnedAppointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            appointmentID
        )

        return parseStringify(returnedAppointment)
        
    } catch (error) {
        console.log("Problem with getting appointment", error)
        throw error 
        
    }
}

// get recent appointments function - fetch appointment using the appwrite docs 

export const getRecentAppointments = async () => {
    try {
        const returnedAppointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            [
                Query.orderAsc("$createdAt"), 
                Query.limit(100)
            ]
            
        )

        const initialAppointmentCount = {
            scheduled: 0,
            pending: 0,
            cancelled: 0 

        }
            
        const appointments = returnedAppointments.documents as Appointment []
            
        const counts =  appointments.reduce((acc, appointment) => {
                if(appointment.status === "scheduled") {
                    acc.scheduled += 1
                } else if(appointment.status === "pending") {
                    acc.pending += 1
                } else if(appointment.status === "cancelled") {
                    acc.cancelled += 1
                }

            return acc
        }, initialAppointmentCount)

        const data = {
            totalAppointments: returnedAppointments.total,
            ...counts, 
            documents: appointments 

        }

        return data
        
    } catch (error) {
        console.log("Problem with getting the list of appointments", error)
        throw error
        
    }
}

export const updateAppointment = async ({appointmentId, userID, appointment, type}: UpdateAppointmentParams) => {
    try {
        const updatedDocument = await databases.updateDocument(
            DATABASE_ID!, 
            APPOINTMENTS_COLLECTION_ID!, 
            appointmentId,
            appointment
        )

        if (!updatedDocument) {
            throw new Error("Appointment not found")
        }

        //SMS notification 

        revalidatePath("/admin")
        return parseStringify(updatedDocument)
        
    } catch (error) {
        console.log("Error with your appointment", error)
        throw error
    }

}