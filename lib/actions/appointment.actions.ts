"use server"

import { ID, Query } from 'node-appwrite'
import { 
    DATABASE_ID, 
    databases,
    APPOINTMENTS_COLLECTION_ID, 
    } from '../appwrite.config'
import { parseStringify } from '../utils'


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
        console.log("Ahh shit there's a problem", error)
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
        console.log("Problem with getting appointment")
        throw error 
        
    }
}
